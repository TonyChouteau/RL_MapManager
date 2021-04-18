// Vendor Modules
const { dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');
let Zip = require('adm-zip');

// Own Modules
const { config } = require('../config');

let FileManager = function (win, app) {
	this.getPath = function () {
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
	};

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

	this.editFolder = function (data) {
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
					const newPath = rep.filePaths[0];
					this.saveData(data.type, newPath);
					if (data.type === 'app') {
						this.currentAppPath = newPath;
					} else {
						this.currentGamePath = newPath;
					}
					this.win.webContents.send(data.type + '-path', newPath);
				}
			});
	};

	this.editImport = function (data) {
		let defaultPath = this.currentAppPath;
		dialog
			.showOpenDialog(this.win, {
				title: data.title,
				defaultPath: data.defaultPath || defaultPath,
				properties: ['openFile'],
			})
			.then((rep) => {
				if (!rep.canceled) {
					const newPath = rep.filePaths[0];
					this.win.webContents.send('to-open', newPath);
				}
			});
	};

	this.handleCustomMapFolder = function () {
		let customFolder = path.join(this.currentAppPath, 'MAPS');
		fs.access(customFolder, (err) => {
			if (err) {
				fs.mkdirSync(customFolder);
			}
			fs.readdir(customFolder, (err, files) => {
				if (err) return;
				files = files.filter((file) => file.split('.').splice(-1)[0] === 'upk');
				this.win.webContents.send('list', files);
			});
		});
	};

	this.handleAddMap = function (data) {
		let customFolder = path.join(this.currentAppPath, 'MAPS');
		let newMapPath = data.path;
		let newMapCount = 0;
		if (['zip', 'rar'].includes(newMapPath.split('.').splice(-1)[0])) {
			let zip = new Zip(newMapPath);
			zip.getEntries().forEach(function (entry) {
				let fileName = entry.entryName;
				if (['upk', 'udk'].includes(fileName.split('.').splice(-1)[0])) {
					newMapCount++;
					var decompressedData = zip.readFile(entry);
					let newPath = path.join(customFolder, data.name + '.upk');
					console.log(newPath)
					fs.writeFileSync(newPath, decompressedData);
				}
			});
			if (newMapCount > 0) {
				dialog.showMessageBox(this.win, {
					title: 'Success',
					message: 'Map successfully added',
				});
			} else {
				dialog.showErrorBox('Error', 'Wrong file given, no map added');
			}
			this.handleCustomMapFolder();
		} else if (['upk', 'udk'].includes(newMapPath.split('.').splice(-1)[0])) {
			fs.readFile(newMapPath, (err, fileData) => {
				if (err) return;
				let newPath = path.join(customFolder, data.name + '.upk');
				fs.writeFileSync(newPath, fileData);
				dialog.showMessageBox(this.win, {
					title: 'Success',
					message: 'Map successfully added',
				});
				this.handleCustomMapFolder();
			})
		}
	};

	// Main event listener
	this.addIpcListener = function () {
		ipcMain.on('get-path', () => {
			this.getPath();
		});
		ipcMain.on('edit-folder', (_, data) => {
			this.editFolder(data);
		});
		ipcMain.on('edit-import', (_, data) => {
			this.editImport(data);
		});
		ipcMain.on('get-list', () => {
			this.handleCustomMapFolder();
		});
		ipcMain.on('add-map', (_, data) => {
			this.handleAddMap(data);
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
