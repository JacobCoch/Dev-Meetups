const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        require.ensure(["web-vitals"], (require) => {
            const {
                getCLS,
                getFID,
                getFCP,
                getLCP,
                getTTFB,
            } = require("web-vitals");

            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
};

export default reportWebVitals;
