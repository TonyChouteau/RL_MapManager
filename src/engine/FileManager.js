const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

// Own Modules
const { config } = require('../config');

let FileManager = function (win) {

	this.init = function(win) {
		this.win = win;
	}
	this.init(win);

	this.addIpcListener = function() {
		ipcMain.on('toFileManager', () => {
			fs.readdir(config.script_folder, (err, files) => {
				if (err) return;
				this.win.webContents.send('fromFileManager', files);
			});
		});
		return FileManager;
	};
	
};

module.exports = (win) => {
	return new FileManager(win);
};
