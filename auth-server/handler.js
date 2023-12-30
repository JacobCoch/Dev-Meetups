import { google } from "googleapis";

const calendar = google.calendar("v3");
const SCOPES = [
    "https://www.googleapis.com/auth/calendar.events.public.readonly",
];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID, REDIRECT_URL } = process.env;


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
);

export async function getAuthURL() {
    /**
     *
     * Scopes array is passed to the `scope` option.
     *
     */
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
        redirect_uri: "https://jacobcoch.github.io/Dev-Meetups/", 
    });

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
            authUrl,
        }),
    };
}

export async function getAccessToken(event) {
    const code = decodeURIComponent(`${event.pathParameters.code}`);
    return new Promise((resolve, reject) => {
        oAuth2Client.getToken(code, (error, response) => {
            if (error) {
                return reject(error);
            }
            return resolve(response);
        });
    })
        .then((results) => {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(results),
            };
        })
        .catch((error) => {
            return {
                statusCode: 500,
                body: JSON.stringify(error),
            };
        });
}

export async function getCalendarEvents(event) {
    const accessToken = decodeURIComponent(
        `${event.pathParameters.access_token}`
    );
    oAuth2Client.setCredentials({ access_token: accessToken });

    return new Promise((resolve, reject) => {
        calendar.events.list(
            {
                calendarId: CALENDAR_ID,
                auth: oAuth2Client,
                timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: "startTime",
            },
            (error, response) => {
                if (error) {
                    return reject(error);
                }
                return resolve(response);
            }
        );
    })
        .then((results) => {
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ events: results.data.items }),
            };
        })
        .catch((error) => {
            return {
                statusCode: 500,
                body: JSON.stringify(error),
            };
        });
}
