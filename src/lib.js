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

require('winston-daily-rotate-file');

/**
* @member {string} pathToLog path to log file
*/
var pathToLog = 'log';

/**
 * Returns logger for module
 * @param {cjsmodule|string} input  if module object then used to localize error file
 * if string, then it changes pathToLog
 * @return {object} Winston instance
 */

function getLogger(input) {
	if (typeof input === 'string'){
		pathToLog = input;
		return arguments.callee;
	}else{
		let transports = [],
			pathLabel = input.filename.split('/').slice(-2).join('/');

		transports.push(new winston.transports.Console({
			colorize: true
		}));

		transports.push(new winston.transports.DailyRotateFile({
			name: 'file',
			datePattern: '.yyyy-MM-dd',
			filename: pathToLog,
			level: ENV === 'production' ? 'error' : 'debug',
			json: true,
			label: pathLabel
		}));

		return new winston.Logger({
			transports: transports
		});
	}
}
module.exports = getLogger;
