const dotenv = require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs').promises;

module.exports = {
    listEvents: listEvents,
    insertEvent: insertEvent,
    listCalendars: listCalendars,
    getCalendarID, getCalendarID
}

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
})

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

async function listCalendars() {
    const {data: {items: result}} = await calendar.calendarList.list();
    return result;
}

async function insertEvent(date, title, calendarID) {
    const event = {
        summary: title,
        start: {
            'date': date
        },
        end: {
            'date': date
        },
    }
    const {data: result} = await calendar.events.insert({
        'auth': oauth2Client,
        'calendarId': calendarID,
        'resource': event
    });

    return result;
}

async function listEvents() {
    const result = await calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    })

    const { items: [events] } = result.data;

    return events;
}

async function getCalendarID(calName, path) {
    let output;
    try {
        const result = await fs.readFile(path);

        try {
            output = JSON.parse(result.toString('utf-8'));

            if (typeof output.assignCalID === 'undefined') {
                output = updateCalID();
            }
        } catch (err) {
            output = updateCalID();
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            update = updateCalID();
        } else {
            throw error;
        }
    }
    return output;

    async function updateCalID() {
        let lookup = "";
        const result = await calendar.listCalendars();
        result.forEach(element => {
            if (element.summary === calName) {
                lookup = element.id;
            }
        });

        const writeObject = {
            'assignCalID': lookup
        }
        fs.writeFile(path, JSON.stringify(writeObject));
        return lookup;
    }
}