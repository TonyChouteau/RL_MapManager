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
					if (callback) callback(value);
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

	addDataToList: function(key, value, callback) {
		fs.access(this.savePath, (err) => {
			if (err) {
				let data = {};
				data[key] = [value];
				fs.writeFile(this.savePath, JSON.stringify(data), () => {});
				if (callback) callback();
			} else {
				fs.readFile(this.savePath, 'utf8', (err, data) => {
					if (err) return;
					let dataJson = JSON.parse(data || '{}');
					let list = dataJson[key] || [];
					list.push(value)
					dataJson[key] = list;
					fs.writeFile(this.savePath, JSON.stringify(dataJson), () => {});
					if (callback) callback();
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