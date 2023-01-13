const Logger = require("./logger");
const logger = new Logger();

//register a listener
logger.on("messageLogged", (arg) => {
  console.log("lisened called", arg);
});

logger.log("message");
