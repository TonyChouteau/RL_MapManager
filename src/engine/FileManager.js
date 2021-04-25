// Vendor Modules
const { dialog, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const isDev = require('electron-is-dev');
let Zip = require('adm-zip');

// Own Modules
const { config } = require('./Config');
const { getSaveManager } = require('./SaveManager');

// Class Constructor
let FileManager = function (win, app) {
	this.win = win;
	this.app = app;

	this.saveManager = getSaveManager();

	this.app_path = isDev ? this.app.getAppPath() : path.join(this.app.getAppPath(), '../../');
	this.currentAppPath = this.app_path;
	this.currentGamePath = null;
	this.win.webContents.send('ready', config.appName);
};

FileManager.prototype = {
	message: function (channel, data) {
		this.win.webContents.send(channel, data);
	},

	getPath: function () {
		this.saveManager.getData('game', (gamePath) => {
			if (gamePath) {
				this.currentGamePath = gamePath;
				this.message('game-path', gamePath);
			}
		});
		this.saveManager.getData('app', (appPath) => {
			this.currentAppPath = appPath || this.app_path;
			this.message('app-path', appPath || this.app_path);
		});
	},

	editFolder: function (data) {
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
					this.saveManager.saveData(data.type, newPath);
					if (data.type === 'app') {
						this.currentAppPath = newPath;
					} else {
						this.currentGamePath = newPath;
					}
					this.message(data.type + '-path', newPath);
				}
			});
	},

	editImport: function (data) {
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
					this.message('to-open', newPath);
				}
			});
	},

	handleCustomMapFolder: function () {
		let customFolder = path.join(this.currentAppPath, 'MAPS');
		fs.access(customFolder, (err) => {
			if (err) {
				fs.mkdirSync(customFolder);
			}
			fs.readdir(customFolder, (err, files) => {
				if (err) return;
				this.saveManager.getData('list', (value) => {
					let list = value || [];
					files = files
						.filter((file) => {
							return file.split('.').splice(-1)[0] === 'upk';
						})
						.map((file) => {
							let splitedName = file.split('.');
							return splitedName.splice(0, splitedName.length - 1).join('.');
						});
					this.message(
						'list',
						list.filter((map) => files.includes(map))
					);
				});
			});
		});
	},

	handleAddMap: function (data) {
		let customFolder = path.join(this.currentAppPath, 'MAPS');
		let newMapPath = data.path;
		let newMapCount = 0;
		if (['zip', 'rar'].includes(newMapPath.split('.').splice(-1)[0])) {
			let zip = new Zip(newMapPath);
			zip.getEntries().forEach((entry) => {
				let fileName = entry.entryName;
				if (['upk', 'udk'].includes(fileName.split('.').splice(-1)[0])) {
					newMapCount++;
					var decompressedData = zip.readFile(entry);
					let newPath = path.join(customFolder, data.name + '.upk');
					fs.writeFileSync(newPath, decompressedData);
				}
			});
			if (newMapCount > 0) {
				dialog.showMessageBox(this.win, {
					title: 'Success',
					message: 'Map successfully added',
				});
				this.saveManager.addDataToList('list', data.name, () => {
					this.handleCustomMapFolder();
				});
			} else {
				dialog.showErrorBox('Error', 'Wrong file given, no map added');
				this.handleCustomMapFolder();
			}
		} else if (['upk', 'udk'].includes(newMapPath.split('.').splice(-1)[0])) {
			fs.readFile(newMapPath, (err, fileData) => {
				if (err) return;
				let newPath = path.join(customFolder, data.name + '.upk');
				fs.writeFileSync(newPath, fileData);
				dialog.showMessageBox(this.win, {
					title: 'Success',
					message: 'Map successfully added',
				});
				this.saveManager.addDataToList('list', data.name, () => {
					this.handleCustomMapFolder();
				});
			});
		}
	},

	handleSelected: function (data) {
		if (!isNaN(data)) {
			this.saveManager.saveData('selected', data);
			this.message('selected', data);
		} else {
			this.saveManager.getData('selected', (savedData) => {
				this.message('selected', savedData || 0);
			});
		}
	},

	removeMap: function (id) {
		this.saveManager.removeIndexFromList("list", id, (removed) => {
			let mapPath = path.join(this.currentAppPath, 'MAPS', (removed || "") + '.upk');
			console.log(mapPath);
			fs.unlink(mapPath, (err) => {
				this.handleCustomMapFolder();
			});
		})
	},

	// Main event listener
	addIpcListener: function () {
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
		ipcMain.on('handle-selected', (_, data) => {
			this.handleSelected(data);
		});
		ipcMain.on('remove', (_, data) => {
			this.removeMap(data);
		});
	},
};

module.exports = {
	FileManager: FileManager,
	getFileManager: function (win, app) {
		return new FileManager(win, app);
	},
};
