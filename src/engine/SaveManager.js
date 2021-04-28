// Vendor Modules
const fs = require('fs');
const path = require('path');

// Own Modules
const { config } = require('./Config');

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

	saveData: function (key, value, callback) {
		fs.access(this.savePath, (err) => {
			if (err) {
				let data = {};
				data[key] = value;
				fs.writeFileSync(this.savePath, JSON.stringify(data), 'utf8');
				if (callback) {
					callback();
				}
			} else {
				fs.readFile(this.savePath, 'utf8', (err, data) => {
					if (err) return;
					let dataJson = JSON.parse(data || '{}');
					dataJson[key] = value;
					fs.writeFileSync(this.savePath, JSON.stringify(dataJson));
					if (callback) {
						callback();
					}
				});
			}
		});
	},

	addDataToList: function (key, value, callback) {
		fs.access(this.savePath, (err) => {
			if (err) {
				let data = {};
				data[key] = [value];
				fs.writeFileSync(this.savePath, JSON.stringify(data), 'utf8');
				if (callback) callback();
			} else {
				fs.readFile(this.savePath, 'utf8', (err, data) => {
					if (err) return;
					let dataJson = JSON.parse(data || '{}');
					let list = dataJson[key] || [];
					list.push(value);
					dataJson[key] = list;
					fs.writeFileSync(this.savePath, JSON.stringify(dataJson));
					if (callback) callback();
				});
			}
		});
	},

	removeFromList: function (key, toRemove, removeById, callback) {
		fs.access(this.savePath, (err) => {
			if (err) {
				let data = {};
				data[key] = [];
				fs.writeFileSync(this.savePath, JSON.stringify(data), 'utf8');
				if (callback) callback();
			} else {
				fs.readFile(this.savePath, 'utf8', (err, data) => {
					if (err) return;
					let dataJson = JSON.parse(data || '{}');
					let list = dataJson[key] || [];
					let removed;
					dataJson[key] = list.filter((value, index) => {
						if (removeById) {
							if (index === toRemove) removed = value;
							return index !== toRemove;
						} else {
							if (value === toRemove) removed = value;
							return value !== toRemove;
						}
						
					});
					fs.writeFileSync(this.savePath, JSON.stringify(dataJson), 'utf8');
					if (callback) callback(removed);
				});
			}
		});
	},

	removeDataFromList: function (key, value, callback) {
		this.removeFromList(key, value, false, callback);
	},

	removeIndexFromList: function(key, index, callback) {
		this.removeFromList(key, index, true, callback);
	},
};

module.exports = {
	SaveManager: SaveManager,
	getSaveManager: function () {
		return new SaveManager();
	},
};
