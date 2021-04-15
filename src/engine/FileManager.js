// Vendor Modules
const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');

// Own Modules
const { config } = require('../config');

let FileManager = function (win) {
	// Main event listener
	this.addIpcListener = function () {
		
	};

	// Class Constructor
	this.init = function (win) {
		this.win = win;
		this.win.webContents.send('ready', config.appName);
	};
	this.init(win);
};

module.exports = (win) => {
	return new FileManager(win);
};
