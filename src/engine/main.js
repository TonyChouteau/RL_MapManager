// Vendors Modules
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

// Own Modules
const { config } = require('../config');
const FileManager = require("./FileManager");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function defineAPI(win, app) {
	// Add Api Access to NodeJS
	let fileManager = FileManager(win, app).addIpcListener();
}

// Make the Window
function createWindow() {
	win = new BrowserWindow({
		src: "./",
		icon:'./build/app_icon.ico',
		width: 900,
		height: 600,
		resizable: false,
		backgroundColor: 'black',
		webPreferences: {
			contextIsolation: true, // protect against prototype pollution
			nodeIntegration: true, // is default value after Electron v5
			enableRemoteModule: true, // turn off remote
			preload: path.join(__dirname, config.preload_path, './preload.js'),
		},
		show: false,
	});

	win.loadFile(config.public_path + './index.html');
	win.removeMenu();
	win.once('ready-to-show', () => {
		win.show();
	});
	win.webContents.openDevTools();

	win.webContents.once('dom-ready', () => {
		defineAPI(win, app);
	});
}

// App Entry
app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});