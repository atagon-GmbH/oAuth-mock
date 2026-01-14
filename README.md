# Universal OAuth2 Mock Server

**A zero-friction, drop-in replacement for OAuth2 providers during testing and development.**

Built on top of the robust [oauth2-mock-server](https://github.com/axa-group/oauth2-mock-server) and `express`, this project creates a centralized mock server that speaks the language of Google, Microsoft, GitHub, Facebook, Discord, and Slack.

Stop mocking endpoints manually in every project. Point your auth client here and get back to building.

---

## Quick Look

- ** Instant Usage:** Available publicly at `https://oauth.kogiqa.com`. No install required.
- ** Multi-Persona:** Automatically switches user profiles based on the provider (Google, GitHub, etc.).
- ** Dynamic Overrides:** Need a specific email for a test case? Just pass it in the query string.
- ** Full OIDC Compliance:** Supports `.well-known/openid-configuration`, `jwks`, and standard flows. Also includes `userInfoUrl` in OIDC config for compatibility with various client libraries.

##  Getting Started

### Option A: Use the Hosted Instance (Easiest + Free)
If you don't want to run infrastructure, simply replace your authorization and token URLs in your `.env` or config files with our public instance:

**Base URL:** `https://oauth.kogiqa.com`

### Option B: Run Locally
Prefer to keep things offline? No problem.

1.  **Install dependencies** (we use `pnpm`):
    ```bash
    pnpm install
    ```

2.  **Fire it up**:
    ```bash
    pnpm start
    ```
    The server will listen at `http://localhost:8080`.

3.  **Run Tests**:
    We use `vitest` and `supertest` to ensure rock-solid stability.
    ```bash
    pnpm test
    ```

## 🔌 Supported Providers & Aliases

We've pre-wired the most common routes so you don't have to change your client configuration logic. Just swap the domain.

| Provider | Auth URL | Token URL | User Info URL |
| :--- | :--- | :--- | :--- |
| **Google** | `/o/oauth2/v2/auth` | `/oauth2/v4/token` | `/oauth2/v3/userinfo` |
| **Microsoft** | `/common/oauth2/v2.0/authorize` | `/common/oauth2/v2.0/token` | `/me` or `/oidc/userinfo` |
| **GitHub** | `/login/oauth/authorize` | `/login/oauth/access_token` | `/user` |
| **Facebook** | `/v12.0/dialog/oauth` | `/v12.0/oauth/access_token` | `/v12.0/me` |
| **Discord** | `/api/oauth2/authorize` | `/api/oauth2/token` | `/api/users/@me` |
| **Slack** | `/openid/connect/authorize` | `/api/openid.connect.token` | `/api/openid.connect.userInfo` |
| **Apple/Generic**| `/auth/authorize` | `/auth/token` | `/auth/userinfo` |

>  **Note:** Standard OIDC endpoints (like `/.well-known/openid-configuration`) are also available at the root.

##  Mock Personas

Who logs in? That depends on where you knock.

- **Google Route** → `Google Mock User` (`mock.user@gmail.com`)
- **GitHub Route** → `GitHub Mock User` (`mock@github.com`)
- **Microsoft Route** → `Microsoft Mock User` (`mock.user@outlook.com`)
- ...and so on for Facebook, Discord, and Slack.

###  Dynamic User Injection

Need to test a specific scenario, like a user with a specific email domain? You don't need to change the server code.

**Method 1: Inject via Auth URL**
Pass `name` or `email` when you start the flow:
`https://oauth.kogiqa.com/authorize?client_id=xyz&...&name=QA+Hero&email=hero@qa.com`

The resulting access token and ID token will persist this data. When your app fetches the user profile, it receives:
```
json
{
  "sub": "generic-user",
  "name": "QA Hero",
  "email": "hero@qa.com"
}
```
**Method 2: Inject via UserInfo**
Override directly when fetching profile data:
```
bash
curl -H "Authorization: Bearer <token>" "https://oauth.kogiqa.com/userinfo?email=forced@test.com"
```
##  Usage Example (Google Flow)

Here is how a standard authorization code flow looks using this server:

1.  **Redirect User**:
    `https://oauth.kogiqa.com/o/oauth2/v2/auth?client_id=foo&response_type=code&redirect_uri=https://localhost/cb`

2.  **Exchange Code for Token**:
    ```bash
    curl -X POST https://oauth.kogiqa.com/oauth2/v4/token \
      -d "client_id=foo&grant_type=authorization_code&code=YOUR_CODE"
    ```

3.  **Fetch Profile**:
    ```bash
    curl -H "Authorization: Bearer <access_token>" https://oauth.kogiqa.com/oauth2/v3/userinfo
    ```


[![Sponsored by kogiQA.com](https://kogiqa.com/logo.png)](https://kogiQA.com)

```
