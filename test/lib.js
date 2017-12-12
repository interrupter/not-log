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
	defaultLogName = 'log.'+strDate;

chai.use(chaiFiles);

before(()=>{
	try{
		fs.accessSync(defaultLogName);
		fs.unlinkSync(defaultLogName);
	}catch(e){}
});

describe("logger", function() {

	it("get logger without custom path to log "+defaultLogName, function() {
		let logger = log(module);
		logger.info('test');
		setTimeout(()=>{
			expect(file(defaultLogName)).to.exist;
		},200);
	});

	it("init with path to log", function() {
		let name = path.join(__dirname, 'logs/log');
		expect(log(name)).to.be.equal(name);
	});

	it("get logger with config", function() {
		let logger = log(module);
		expect(logger.debug('test')).to.not.throw;
	});
});
