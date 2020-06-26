/**
 * Simple wrapper for logging
 * @module not-log
 */

/**
 * @const {module} winston Winston logger module
 */
const {
	createLogger,
	format,
	transports
} = require('winston');
const {
	combine,
	timestamp,
	prettyPrint,
	label
} = format;
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
function getLogger(module) {
	return createLogger({
		format: combine(
			label({
				filename: module.filename,
				ENV
			}),
			timestamp(),
			prettyPrint()
		),
		transports: [new transports.Console()]
	});
}

module.exports = getLogger;
