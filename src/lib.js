/**
* Simple wrapper for logging
* @module not-log
*/

/**
* @const {module} winston Winston logger module
*/
const winston = require('winston');
/**
* @const {string} ENV value of process.env.NODE_ENV
*/
const ENV = process.env.NODE_ENV;
/**
 * Returns logger for module
 * @param {cjsmodule|string} input  if module object then used to localize error file
 * if string, then it changes pathToLog
 * @return {object} Winston instance
 */
function getLogger() {
	return winston.createLogger({
		transports: [
			new (winston.transports.Console)({
				colorize: true
			})
		]
	});
}

module.exports = getLogger;
