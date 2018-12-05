const expect = require("chai").expect,
	log = require('../index.js'),
	chai = require('chai'),
	chaiFiles = require('chai-files'),
	path = require('path'),
	file = chaiFiles.file,
	dir = chaiFiles.dir,
	fs = require('fs'),
	today = new Date(),
	strDate = 'Y-m-d'
		.replace('Y', today.getFullYear())
		.replace('m', today.getMonth()+1)
		.replace('d', today.getDate()),
	defaultLogName = strDate+'.log';

chai.use(chaiFiles);

before(()=>{
	try{
		fs.accessSync(defaultLogName);
		fs.unlinkSync(defaultLogName);
	}catch(e){}
});

describe("logger", function(done) {
	it("get logger with config", function() {
		let logger = log(module);
		expect(logger.debug('test')).to.not.throw;
	});
});
