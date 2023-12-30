import NProgress from "nprogress";

import "./styles/nprogress.css";
import { mockData } from "./mock-data";

export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

export const checkToken = async (accessToken) => {
    const result = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    )
        .then((res) => res.json())
        .catch((error) => error.json());

    return result;
};

const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
        newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.pushState("", "", newurl);
    } else {
        newurl = `${window.location.protocol}//${window.location.host}`;
        window.history.pushState("", "", newurl);
    }
};

const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
        `https://mhwvof6pp4.execute-api.us-west-1.amazonaws.com/dev/api/token/` +
            `${encodeCode}`
    );
    const { access_token } = await response.json();
    if (access_token) {
        localStorage.setItem("access_token", access_token);
    }

    return access_token;
};

export const getEvents = async () => {
    NProgress.start();
    // If request is coming from localhost then mock data will be returned
    if (window.location.href.startsWith("http://localhost")) {
        NProgress.done();
        return mockData;
    }

    console.log("Network status:", navigator.onLine);

    // If user is not online events equals local storage data
    if (!navigator.onLine) {
        const events = localStorage.getItem("lastEvents");
        NProgress.done();

        return events ? JSON.parse(events) : [];
    }

    // Result of the getAccessToken function which should be the access token from local storage
    const token = await getAccessToken();

    // there is a token in local storage then function executed
    if (token) {
        // removeQuery should remove query parameters from url
        removeQuery();

        // getEvents Lambda function api endpoint with added token
        const url =
            `https://mhwvof6pp4.execute-api.us-west-1.amazonaws.com/dev/api/get-events/` +
            `${token}`;

        // Response should be the result of Lambda getCalendarEvents function
        const response = await fetch(url);
        const result = await response.json();

        // If getCalendarEvents Lambda function returns json response then return the events from it otherwise return null
        if (result) {
            localStorage.setItem("lastEvents", JSON.stringify(result.events));

            return result.events;
        }
    }
    return null;
};

export const getAccessToken = async () => {
    const accessToken = localStorage.getItem("access_token");
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
        localStorage.removeItem("access_token");
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        if (!code) {
            const results = await fetch(
                "https://mhwvof6pp4.execute-api.us-west-1.amazonaws.com/dev/api/get-auth-url"
            );
            const response = await results.json();
            const { authUrl } = response;
            window.location.href = authUrl;
            return window.location.href;
        }
        return code && getToken(code);
    }
    return accessToken;
};
