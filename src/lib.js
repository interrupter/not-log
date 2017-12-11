/**
* @module not-log simple wrapper for logging
*/

const winston = require('winston'),
	config = require('not-config').reader,
	ENV = process.env.NODE_ENV;

require('winston-daily-rotate-file');

/**
 * Returns logger for module
 * @param {cjsmodule} module module object to know from where error comes
 * @return {object} Winston instance
 */

function getLogger(module) {
	let transports = [],
		pathLabel = module.filename.split('/').slice(-2).join('/'),
		logsPath = config.get('log:path');

	transports.push(new winston.transports.Console({
		colorize: true
	}));

	transports.push(new winston.transports.DailyRotateFile({
		name: 'file',
		datePattern: '.yyyy-MM-dd',
		filename: logsPath,
		level: ENV === 'production' ? 'error' : 'debug',
		json: true,
		label: pathLabel
	}));

	return new winston.Logger({
		transports: transports
	});

}
module.exports = getLogger;
