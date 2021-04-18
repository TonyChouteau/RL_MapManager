// Vendor Modules
const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');

// Own Modules
const { config } = require('../config');

let FileManager = function (win, app) {
	// Main event listener
	this.addIpcListener = function () {
		ipcMain.on('get-app-path', (event, arg) => {
			this.win.webContents.send('app-path', this.app.getAppPath());
		});
	};

	// Class Constructor
	this.init = function (win, app) {
		this.win = win;
		this.app = app;
		this.win.webContents.send('ready', config.appName);
	};
	this.init(win, app);
};

module.exports = (win, app) => {
	return new FileManager(win, app);
};
