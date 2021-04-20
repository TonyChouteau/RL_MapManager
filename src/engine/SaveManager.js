// Vendor Modules
const fs = require('fs');
const path = require('path');

// Own Modules
const { config } = require('../config');

function SaveManager() {
	this.savePath = path.join(config.save_path, 'save.json');
}

SaveManager.prototype = {
	getData: function (key, callback) {
		fs.access(this.savePath, (err) => {
			if (!err) {
				fs.readFile(this.savePath, 'utf8', (err, data) => {
					if (err) return;
					let dataJson = JSON.parse(data || '{}');
					let value = dataJson[key];
					callback(value);
				});
			} else {
				callback();
			}
		});
	},

	saveData: function (key, value) {
		fs.access(this.savePath, (err) => {
			if (err) {
				let data = {};
				data[key] = value;
				fs.writeFile(this.savePath, JSON.stringify(data), () => {});
			} else {
				fs.readFile(this.savePath, 'utf8', (err, data) => {
					if (err) return;
					let dataJson = JSON.parse(data || '{}');
					dataJson[key] = value;
					fs.writeFile(this.savePath, JSON.stringify(dataJson), () => {});
				});
			}
		});
	},
};

module.exports = {
	SaveManager : SaveManager,
	getSaveManager : function() {
		return new SaveManager();
	}
}