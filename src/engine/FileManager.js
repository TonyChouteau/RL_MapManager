// Vendor Modules
const { dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');

// Own Modules
const { config } = require('../config');

let FileManager = function (win, app) {
	this.saveData = function (type, newPath) {
		let savePath = path.join(config.save_path, 'save.json');
		fs.access(savePath, (err) => {
			if (err) {
				let data = {};
				data[type] = newPath;
				fs.writeFile(savePath, JSON.stringify(data), () => {});
			} else {
				fs.readFile(savePath, 'utf8', (err, data) => {
					if (err) return;
					let dataJson = JSON.parse(data || '{}');
					dataJson[type] = newPath;
					fs.writeFile(savePath, JSON.stringify(dataJson), () => {});
				});
			}
		});
	};

	// Main event listener
	this.addIpcListener = function () {
		ipcMain.on('get-path', () => {
			let savePath = path.join(config.save_path, 'save.json');
			let fileExist = false;
			fs.access(savePath, (err) => {
				if (!err) {
					fs.readFile(savePath, 'utf8', (err, data) => {
						if (err) return;
						let dataJson = JSON.parse(data || '{}');
						if (dataJson.game) {
							this.currentGamePath = dataJson.game;
							this.win.webContents.send('game-path', dataJson.game);
						}
						this.win.webContents.send('app-path', dataJson.app || this.app_path);
						this.currentAppPath = dataJson.app || this.app_path;
					});
				} else {
					this.win.webContents.send('app-path', this.app_path);
					this.currentAppPath = this.app_path;
				}
			});
		});
		ipcMain.on('edit-folder', (_, data) => {
			let defaultPath = this.currentAppPath;
			if (data.type === 'game' && this.currentGamePath) {
				defaultPath = this.currentGamePath;
			}
			dialog
				.showOpenDialog(this.win, {
					title: data.title,
					defaultPath: defaultPath,
					properties: ['openDirectory'],
				})
				.then((rep) => {
					if (!rep.canceled) {
						const newPath = rep.filePaths[0]; //.replaceAll("\\", "\\\\");
						this.saveData(data.type, newPath);
						if (data.type === 'app') {
							this.currentAppPath = newPath;
						} else {
							this.currentGamePath = newPath;
						}
						this.win.webContents.send(data.type + '-path', newPath);
					}
				});
		});
		ipcMain.on('import', (_, data) => {
			let defaultPath = this.currentAppPath;
			dialog
				.showOpenDialog(this.win, {
					title: data.title,
					defaultPath: data.defaultPath,
					properties: ['openFile'],
				})
				.then((rep) => {
					if (!rep.canceled) {
						const newPath = rep.filePaths[0];
						this.win.webContents.send("to-open", newPath);
					}
				});
		});
	};

	// Class Constructor
	this.init = function (win, app) {
		this.win = win;
		this.app = app;
		this.app_path = isDev ? this.app.getAppPath() : path.join(this.app.getAppPath(), '../../');
		this.currentAppPath = this.app_path;
		this.currentGamePath = null;
		this.win.webContents.send('ready', config.appName);
	};
	this.init(win, app);
};

module.exports = (win, app) => {
	return new FileManager(win, app);
};
