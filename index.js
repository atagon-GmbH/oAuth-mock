import { OAuth2Issuer, OAuth2Service } from 'oauth2-mock-server';
import express from "express";
import basicAuth from "basic-auth";
import { MOCK_USERS } from "./users.js";
import { LANDING_PAGE_HTML } from "./landing.js";

const PORT = process.env.PORT || 8080;
const flowData = new Map();

export async function createServer() {
    const issuer = new OAuth2Issuer();

    await issuer.keys.generate('RS256');

    const service = new OAuth2Service(issuer);
    const handlers = {
        openid: service.openidConfigurationHandler.bind(service),
        jwks: service.jwksHandler.bind(service),
        token: service.tokenHandler.bind(service),
        authorize: service.authorizeHandler.bind(service),
        userinfo: service.userInfoHandler.bind(service),
        revoke: service.revokeHandler.bind(service),
        endSession: service.endSessionHandler.bind(service),
        introspect: service.introspectHandler.bind(service)
    };

    const originalOpenid = handlers.openid;
    service.openidConfigurationHandler = (req, res) => {
        const json = res.json;
        res.json = (data) => json.call(res, { ...data, userInfoUrl: data.userinfo_endpoint });
        return originalOpenid(req, res);
    };

    service.on('beforeAuthorizeRedirect', (uri, req) => {
        const code = uri.url.searchParams.get('code');
        if (code && (req.query.name || req.query.email)) {
            flowData.set(code, { name: req.query.name, email: req.query.email });
            setTimeout(() => flowData.delete(code), 600000);
        }
    });

    service.on('beforeTokenSigning', (token, req) => {
        const creds = basicAuth(req);
        token.payload.client_id = creds?.name || req.body?.client_id || req.query?.client_id;
        token.payload.exp = Math.floor(Date.now() / 1000) + 3600;

        const data = flowData.get(req.body?.code || req.query?.code);
        if (data) {
            if (data.name) token.payload.name = token.payload.preferred_username = data.name;
            if (data.email) token.payload.email = data.email;
        }
    });

    service.on('beforeUserinfo', (res, req) => {
        const variant = req.oauthVariant || 'default';
        const user = { ...(MOCK_USERS[variant] || MOCK_USERS.default) };
        let payload = {};

        try { payload = JSON.parse(Buffer.from(req.headers.authorization?.split('.')[1] || '', 'base64').toString()); } catch {}

        const name = req.query.name || payload.name;
        const email = req.query.email || payload.email;

        if (email) {
            if (variant === 'slack' && user.user) user.user.email = email;
            else user.email = email;
        }

        if (name) {
            if (variant === 'slack' && user.user) user.user.name = name;
            else if (variant === 'microsoft') user.displayName = name;
            else if (variant === 'discord') user.global_name = name;
            else if (variant === 'github') { user.name = name; user.login = name.toLowerCase().replace(/\s+/g, '-'); }
            else user.name = name;
        }

        if (req.isGithubEmails) res.body = [{ email: user.email, primary: true, verified: true, visibility: 'public' }];
        else res.body = user;
        res.statusCode = 200;
    });

    const app = express();

    app.use((req, res, next) => {
        issuer.url = `${req.protocol}://${req.get('host')}`;
        next();
    });


    app.use(express.json());
    const urlEncoded = express.urlencoded({ extended: false });

    const providers = [
        { id: 'google', auth: '/o/oauth2/v2/auth', token: '/oauth2/v4/token', info: ['/oauth2/v3/userinfo', '/oauth2/v2/userinfo'] },
        { id: 'microsoft', auth: '/common/oauth2/v2.0/authorize', token: '/common/oauth2/v2.0/token', info: ['/oidc/userinfo', '/me'] },
        { id: 'github', auth: '/login/oauth/authorize', token: '/login/oauth/access_token', info: '/user' },
        { id: 'default', auth: '/auth/authorize', token: '/auth/token', info: '/auth/userinfo' },
        { id: 'facebook', auth: '/v12.0/dialog/oauth', token: '/v12.0/oauth/access_token', info: '/v12.0/me' },
        { id: 'discord', auth: '/api/oauth2/authorize', token: '/api/oauth2/token', info: '/api/users/@me' },
        { id: 'slack', auth: '/openid/connect/authorize', token: '/api/openid.connect.token', info: ['/api/openid.connect.userInfo', '/api/users.identity'] }
    ];

    const wrap = (handler, variant, isGhEmail) => (req, res, next) => {
        req.oauthVariant = variant;
        if (isGhEmail) req.isGithubEmails = true;

        if (req.method === 'GET' && req.path.includes('authorize') && !req.query.response_type) {
             req.url += (req.url.includes('?') ? '&' : '?') + 'response_type=code';
             req.query.response_type = 'code';
        }
        if (req.method === 'POST') req.body = { grant_type: 'password', ...req.body };
        return handler(req, res, next);
    };

    providers.forEach(p => {
        app.get(p.auth, wrap(handlers.authorize, p.id));
        app.post(p.token, urlEncoded, wrap(handlers.token, p.id));
        [].concat(p.info).forEach(u => app.get(u, wrap(handlers.userinfo, p.id)));
    });

    app.get('/user/emails', wrap(handlers.userinfo, 'github', true));

    app.get('/', (_, res) => res.send(LANDING_PAGE_HTML));
    app.get('/.well-known/openid-configuration', handlers.openid);
    app.get('/jwks', handlers.jwks);
    app.post('/token', urlEncoded, handlers.token);
    app.get('/authorize', handlers.authorize);
    app.get('/userinfo', handlers.userinfo);
    app.post('/revoke', urlEncoded, handlers.revoke);
    app.get(['/endsession', '/end_session'], handlers.endSession);
    app.post('/introspect', urlEncoded, handlers.introspect);

    return app;
}

createServer().then(app => {
    app.listen(PORT, () => console.log(`OAuth2 Server: http://localhost:${PORT}`));
});