import { describe, it, expect, beforeAll, vi } from 'vitest';
import request from 'supertest';
import { createServer } from '../index.js';

// --- Helpers ---

const getAuthCode = async (app, url, params = {}) => {

    const searchParams = new URLSearchParams({
        client_id: 'test-client',
        response_type: 'code',
        redirect_uri: 'http://localhost/callback',
        ...params
    });

    const res = await request(app).get(`${url}?${searchParams.toString()}`);

    if (res.status === 302) {
        const location = res.header.location;
        return new URL(location).searchParams.get('code');
    }

    return null;
};

const getAccessToken = async (app, url, code, extraBody = {}) => {
    const payload = {
        client_id: 'test-client',
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost/callback',
        ...extraBody
    };

    const bodyString = new URLSearchParams(payload).toString();

    const res = await request(app)
        .post(url)
        .send(bodyString);

    return res.body;
};


const getUserInfo = async (app, url, token, params = {}) => {
    const query = new URLSearchParams(params).toString();
    const fullUrl = query ? `${url}?${query}` : url;

    return request(app)
        .get(fullUrl)
        .set('Authorization', `Bearer ${token}`);
};


const runFullFlow = async (app, { authUrl, tokenUrl, userUrl, authParams = {}, clientId }) => {
    const params = clientId ? { client_id: clientId, ...authParams } : authParams;
    const bodyParams = clientId ? { client_id: clientId } : {};

    const code = await getAuthCode(app, authUrl, params);
    const tokenData = await getAccessToken(app, tokenUrl, code, bodyParams);
    const userRes = await getUserInfo(app, userUrl, tokenData.access_token);

    return userRes;
};


describe('OAuth2 Mock Server', () => {
    let app;

    beforeAll(async () => {
        app = await createServer();
    });

    describe('Landing Page', () => {
        it('should return the HTML landing page', async () => {
            const res = await request(app).get('/');
            expect(res.status).toBe(200);
            expect(res.header['content-type']).toContain('text/html');
        });
    });

    describe('Full OAuth2 Flow', () => {
        it('should complete a full flow from authorize to userinfo', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/authorize',
                tokenUrl: '/token',
                userUrl: '/userinfo'
            });

            expect(userRes.status).toBe(200);
            expect(userRes.body.name).toBe('Generic User');
        });
    });

    describe('Provider Specific Flows', () => {
        // We can group these as they follow the exact same logic, just different URLs

        it('Google: should return google user info', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/o/oauth2/v2/auth',
                tokenUrl: '/oauth2/v4/token',
                userUrl: '/oauth2/v3/userinfo',
                clientId: 'google-client'
            });

            expect(userRes.status).toBe(200);
            expect(userRes.body.email).toBe('mock.user@gmail.com');
            expect(userRes.body.given_name).toBe('Google');
        });

        it('Microsoft: should return microsoft user info', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/common/oauth2/v2.0/authorize',
                tokenUrl: '/common/oauth2/v2.0/token',
                userUrl: '/me',
                clientId: 'ms-client'
            });

            expect(userRes.status).toBe(200);
            expect(userRes.body.displayName).toBe('Microsoft Mock User');
            expect(userRes.body.jobTitle).toBe('Software Engineer');
        });

        it('GitHub: should return github user info', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/login/oauth/authorize',
                tokenUrl: '/login/oauth/access_token',
                userUrl: '/user',
                clientId: 'github-client'
            });

            expect(userRes.status).toBe(200);
            expect(userRes.body.login).toBe('github-mock');
            expect(userRes.body.html_url).toContain('github.com');
        });
    });

    describe('Direct Provider Endpoint Checks', () => {
        // Tests that check specific endpoints directly without full flow

        it('Facebook: should return user info', async () => {
            const res = await getUserInfo(app, '/v12.0/me', 'some-token');
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Facebook Mock User');
            expect(res.body.id).toBe('1234567890');
        });

        it('Discord: should return user info', async () => {
            const res = await getUserInfo(app, '/api/users/@me', 'some-token');
            expect(res.status).toBe(200);
            expect(res.body.username).toBe('discord_mock');
        });

        it('Slack: should return user info', async () => {
            const res = await getUserInfo(app, '/api/openid.connect.userInfo', 'some-token');
            expect(res.status).toBe(200);
            expect(res.body.user.name).toBe('Slack Mock User');
        });

        it('Apple/Default: should return default user info', async () => {
            const res = await getUserInfo(app, '/auth/userinfo', 'some-token');
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Generic User');
        });
    });

    describe('Custom User Info Overrides', () => {

        it('should override name and email via query parameters directly on userinfo', async () => {
            const res = await getUserInfo(app, '/userinfo', 'some-token', {
                name: 'Custom Name',
                email: 'custom@example.com'
            });
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Custom Name');
            expect(res.body.email).toBe('custom@example.com');
        });

        it('should specifically verify that custom email input works', async () => {
            const customEmail = 'very.specific.email@kogiqa.com';
            const res = await getUserInfo(app, '/userinfo', 'some-token', { email: customEmail });

            expect(res.status).toBe(200);
            expect(res.body.email).toBe(customEmail);
        });

        // --- Flow Overrides (Passing params in Authorize, checking in UserInfo) ---

        it('should override name/email from authorize step to userinfo step', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/authorize',
                tokenUrl: '/token',
                userUrl: '/userinfo',
                authParams: { name: 'Flow User', email: 'flow@example.com' }
            });

            expect(userRes.status).toBe(200);
            expect(userRes.body.name).toBe('Flow User');
            expect(userRes.body.email).toBe('flow@example.com');
        });

        it('should verify QA Hero params work', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/authorize',
                tokenUrl: '/token',
                userUrl: '/userinfo',
                authParams: { name: 'QA Hero', email: 'hero@qa.com' }
            });

            expect(userRes.body.name).toBe('QA Hero');
            expect(userRes.body.email).toBe('hero@qa.com');
        });

        it('should verify QA Hero params work with GitHub (including secondary email call)', async () => {
            const authParams = { name: 'QA Hero', email: 'hero@qa.com' };
            const code = await getAuthCode(app, '/login/oauth/authorize', { client_id: 'github-client', ...authParams });

            // GitHub specific: Using JSON body for token exchange in this specific test case
            const tokenRes = await request(app)
                .post('/login/oauth/access_token')
                .send({
                    client_id: 'github-client',
                    client_secret: 'test-secret',
                    code: code,
                    redirect_uri: 'http://localhost/callback'
                });
            const accessToken = tokenRes.body.access_token;

            const userRes = await getUserInfo(app, '/user', accessToken);
            expect(userRes.body.name).toBe('QA Hero');

            // Check secondary email endpoint
            const emailsRes = await getUserInfo(app, '/user/emails', accessToken);
            expect(emailsRes.status).toBe(200);
            expect(Array.isArray(emailsRes.body)).toBe(true);
            expect(emailsRes.body.find(e => e.primary).email).toBe('hero@qa.com');
        });

        it('should verify QA Hero params work with Google provider', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/o/oauth2/v2/auth',
                tokenUrl: '/oauth2/v4/token',
                userUrl: '/oauth2/v3/userinfo',
                clientId: 'google-client',
                authParams: { name: 'QA Hero', email: 'hero@qa.com' }
            });

            expect(userRes.body.name).toBe('QA Hero');
            expect(userRes.body.email).toBe('hero@qa.com');
        });

        it('should verify params work when calling standard /userinfo after provider-specific token exchange', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/o/oauth2/v2/auth',
                tokenUrl: '/oauth2/v4/token',
                userUrl: '/userinfo', // Standard userinfo
                clientId: 'google-client',
                authParams: { name: 'QA Hero', email: 'hero@qa.com' }
            });

            expect(userRes.body.name).toBe('QA Hero');
        });

        it('should verify params work with ID token claims', async () => {
            const code = await getAuthCode(app, '/authorize', {
                scope: 'openid',
                name: 'QA Hero',
                email: 'hero@qa.com'
            });

            const tokenData = await getAccessToken(app, '/token', code);
            const idToken = tokenData.id_token;

            expect(idToken).toBeDefined();
            const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
            expect(payload.name).toBe('QA Hero');
            expect(payload.email).toBe('hero@qa.com');
        });

        it('should verify custom email override for Discord', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/api/oauth2/authorize',
                tokenUrl: '/api/oauth2/token',
                userUrl: '/api/users/@me',
                clientId: 'discord-client',
                authParams: { email: 'discord-custom@example.com' }
            });
            expect(userRes.body.email).toBe('discord-custom@example.com');
        });

        it('should verify custom name override for Slack (nested property)', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/openid/connect/authorize',
                tokenUrl: '/api/openid.connect.token',
                userUrl: '/api/openid.connect.userInfo',
                clientId: 'slack-client',
                authParams: { name: 'Slack Hero' }
            });
            expect(userRes.body.user.name).toBe('Slack Hero');
        });

        it('should verify custom name override for Microsoft (displayName)', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/common/oauth2/v2.0/authorize',
                tokenUrl: '/common/oauth2/v2.0/token',
                userUrl: '/me',
                clientId: 'ms-client',
                authParams: { name: 'MS Hero' }
            });
            expect(userRes.body.displayName).toBe('MS Hero');
        });

        it('should verify custom name override for Discord (global_name)', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/api/oauth2/authorize',
                tokenUrl: '/api/oauth2/token',
                userUrl: '/api/users/@me',
                clientId: 'discord-client',
                authParams: { name: 'Discord Hero' }
            });
            expect(userRes.body.global_name).toBe('Discord Hero');
        });

        it('should verify logic for GitHub when response_type is missing (implicit code)', async () => {
            // Mimic user's GitHub authorize call: no response_type=code
            const authRes = await request(app)
                .get('/login/oauth/authorize?client_id=github-client&redirect_uri=http://localhost/callback&name=QA+Hero&email=hero@qa.com');

            const code = new URL(authRes.header.location).searchParams.get('code');
            expect(code).toBeDefined();

            // Using JSON body for this specific test case
            const tokenRes = await request(app)
                .post('/login/oauth/access_token')
                .send({ client_id: 'github-client', code: code });

            const userRes = await getUserInfo(app, '/user', tokenRes.body.access_token);
            expect(userRes.body.name).toBe('QA Hero');
            expect(userRes.body.email).toBe('hero@qa.com');
        });

        it('should verify that login field is also overridden for GitHub', async () => {
            const userRes = await runFullFlow(app, {
                authUrl: '/login/oauth/authorize',
                tokenUrl: '/login/oauth/access_token',
                userUrl: '/user',
                clientId: 'github-client',
                authParams: { name: 'QA Hero' }
            });

            expect(userRes.body.name).toBe('QA Hero');
            expect(userRes.body.login).toBe('qa-hero');
        });
    });

    describe('Standard OIDC', () => {
        it('should return jwks', async () => {
            const res = await request(app).get('/jwks');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('keys');
        });
    });

    describe('Flow Data Expiration', () => {
        it('should expire flow data after 10 minutes', async () => {
            vi.useFakeTimers();

            // 1. Start Flow
            const code = await getAuthCode(app, '/authorize', { name: 'Expired' });

            // 2. Advance Time
            vi.advanceTimersByTime(600001); // 10 mins + 1 sec

            // 3. Exchange Token (should still work, but data associated with it might be gone from temp storage)
            const tokenData = await getAccessToken(app, '/token', code);
            expect(tokenData.access_token).toBeDefined();

            // 4. Check User Info - should fallback to generic because custom data expired
            const userRes = await getUserInfo(app, '/userinfo', tokenData.access_token);
            expect(userRes.body.name).toBe('Generic User');

            vi.useRealTimers();
        });
    });
});