const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

// Own Modules
const { config } = require('../config');

let FileManager = function (win) {

	this.init = function(win) {
		this.win = win;
		this.win.webContents.send('ready');
	}
	this.init(win);

	this.addIpcListener = function() {
		ipcMain.on('load', (channel, data) => {
			let folder = path.join(__dirname, config.script_folder);
			fs.readdir(folder, (err, files) => {
				if (err) return;
				this.win.webContents.send('load', files);
				files.forEach(file => {
					fs.readFile(path.join(folder, file), "utf8", (err, data) => {
						if (err) return;
						this.win.webContents.executeJavaScript(data);
					})
				})
			});
		});
	};
	
};

module.exports = (win) => {
	return new FileManager(win);
};
