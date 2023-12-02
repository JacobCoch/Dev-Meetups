import React from "react";

import { render } from "@testing-library/react";

import App from "../App";

describe("App Component", () => {
    it("renders list of events", () => {
        const AppDOM = render(<App />).container.firstChild;
        expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
    });
});
