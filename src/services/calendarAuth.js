const { google } = require('googleapis');

function generate(oauth2Client) {
    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    );
    // generate a url that asks permissions for Google Calendar scopes
    const scopes = [
        'https://www.googleapis.com/auth/calendar'
    ];

    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: scopes
    });

    ; (async () => {
        const { tokens } = await oauth2Client.getToken(process.env.AUTH_CODE);
        oauth2Client.setCredentials(tokens)
    })();
}

