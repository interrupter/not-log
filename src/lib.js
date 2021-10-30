const path = require('path');
const DEV_ENV = 'development';
const DEF_ENV = 'production';
const ENV_TYPE = process.env.NODE_ENV ? process.env.NODE_ENV : DEF_ENV;
const NOOP = () => {};

let muted = false;

function pad(n) {
	return n < 10 ? '0' + n : n;
}

function localIsoDate(date) {
	date = date || new Date;
	let localIsoString = date.getFullYear() + '-' +
		pad(date.getMonth() + 1) + '-' +
		pad(date.getDate()) + 'T' +
		pad(date.getHours()) + ':' +
		pad(date.getMinutes()) + ':' +
		pad(date.getSeconds());
	return localIsoString;
}

//Генерация метода вывода сообщений в консоль с указанием префикса.
function genLogMsg(prefix) {
	return function(){
		if(muted) return;
		let now = localIsoDate();
		// eslint-disable-next-line no-console
		console.log(`[${now}]: ${prefix}::`, ...arguments);
	};
}

function isDev() {
	return ENV_TYPE === DEV_ENV;
}

function genLogDebug(prefix) {
	if (isDev()) {
		return genLogMsg(prefix);
	} else {
		return NOOP;
	}
}

function genLogError(prefix) {
	return function(){
		if(muted) return;
		let now = localIsoDate();
		// eslint-disable-next-line no-console
		console.error(`[${now}]: ${prefix}::`, ...arguments);
	};
}

function simpleLogger(mod, label = ''){
	if(arguments.length === 1 && typeof mod === 'boolean'){
		mute = !mod;
		return;
	}
	let parts = path.parse(mod.filename);
	let breadcrumbs = [parts.base];
	if(label && label.length){
		breadcrumbs.unshift(label);
	}
	breadcrumbs = breadcrumbs.join(' : ');
	return {
		log: genLogMsg(breadcrumbs),
		info: genLogMsg(breadcrumbs),
		debug: genLogDebug(breadcrumbs),
		error: genLogError(breadcrumbs),
	};
}

module.exports = simpleLogger;
