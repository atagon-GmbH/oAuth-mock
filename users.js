export const MOCK_USERS = {
    google: {
        sub: "100000000000000000000",
        name: "Google Mock User",
        given_name: "Google",
        family_name: "Mock User",
        picture: "https://lh3.googleusercontent.com/a/default-user",
        email: "mock.user@gmail.com",
        email_verified: true,
        locale: "en"
    },
    microsoft: {
        id: "microsoft-123",
        displayName: "Microsoft Mock User",
        givenName: "Microsoft",
        surname: "Mock User",
        jobTitle: "Software Engineer",
        mail: "mock.user@outlook.com",
        mobilePhone: null,
        officeLocation: "Redmond",
        preferredLanguage: "en-US",
        userPrincipalName: "mock.user@outlook.com",
        businessPhones: []
    },
    github: {
        login: "github-mock",
        id: 123456,
        node_id: "MDQ6VXNlcjEyMzQ1Ng==",
        avatar_url: "https://avatars.githubusercontent.com/u/123456?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/github-mock",
        html_url: "https://github.com/github-mock",
        followers_url: "https://api.github.com/users/github-mock/followers",
        following_url: "https://api.github.com/users/github-mock/following{/other_user}",
        gists_url: "https://api.github.com/users/github-mock/gists{/gist_id}",
        starred_url: "https://api.github.com/users/github-mock/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/github-mock/subscriptions",
        organizations_url: "https://api.github.com/users/github-mock/orgs",
        repos_url: "https://api.github.com/users/github-mock/repos",
        events_url: "https://api.github.com/users/github-mock/events{/privacy}",
        received_events_url: "https://api.github.com/users/github-mock/received_events",
        type: "User",
        site_admin: false,
        name: "GitHub Mock User",
        company: "@github",
        blog: "https://github.com/blog",
        location: "San Francisco",
        email: "mock@github.com",
        hireable: null,
        bio: "Mocking around",
        twitter_username: null,
        public_repos: 2,
        public_gists: 1,
        followers: 20,
        following: 10,
        created_at: "2011-01-25T18:44:53Z",
        updated_at: "2023-01-25T18:44:53Z"
    },
    facebook: {
        id: "1234567890",
        name: "Facebook Mock User",
        last_name: "Mock User",
        first_name: "Facebook",
        email: "mock.user@facebook.com",
        picture: {
            data: {
                height: 50,
                is_silhouette: false,
                url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1234567890&height=50&width=50&ext=123&hash=abc",
                width: 50
            }
        }
    },
    discord: {
        id: "80351110224678912",
        username: "discord_mock",
        avatar: "83427290023412341234123412341234",
        discriminator: "1337",
        public_flags: 64,
        flags: 64,
        banner: null,
        accent_color: 16711680,
        global_name: "Discord Mock User",
        avatar_decoration_data: null,
        banner_color: "#ff0000",
        mfa_enabled: true,
        locale: "en-US",
        premium_type: 0,
        email: "mock.user@discord.com",
        verified: true
    },
    slack: {
        ok: true,
        user: {
            name: "Slack Mock User",
            id: "U12345678",
            email: "mock.user@slack.com",
            image_24: "https://secure.gravatar.com/avatar/123?s=24",
            image_32: "https://secure.gravatar.com/avatar/123?s=32",
            image_48: "https://secure.gravatar.com/avatar/123?s=48",
            image_72: "https://secure.gravatar.com/avatar/123?s=72",
            image_192: "https://secure.gravatar.com/avatar/123?s=192",
            image_512: "https://secure.gravatar.com/avatar/123?s=512"
        },
        team: {
            id: "T12345678"
        }
    },
    default: {
        sub: "generic-user",
        name: "Generic User",
        email: "generic@example.com"
    }
};
