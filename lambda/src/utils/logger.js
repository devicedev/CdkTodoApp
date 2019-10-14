const util = require("util");

global.logInfo = (operation, data) => {
    if (process.env.LOG === "NO_LOG") return;

    const logData = { operation, data };

    console.info(util.inspect(logData, { showHidden: true, depth: null }));
};

global.logError = (operation, err) => {
    if (process.env.LOG === "NO_LOG") return;

    const logData = { operation, err };

    console.error(util.inspect(logData, { showHidden: true, depth: null }));
};
