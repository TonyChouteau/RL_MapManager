// Vendors Modules
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

// Own Modules
const { config } = require('./config');

// Make the Window
function createWindow() {
	const win = new BrowserWindow({
		src: "./",
		icon:'./build/app_icon.ico',
		width: 1000,
		height: 600,
		backgroundColor: 'black',
		title: config.appName,
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
		webPreferences: {
			nodeIntegration: false,
			webSecurity: true,
			allowEval: false,
			allowRunningInsecureContent: false,
			contextIsolation: true,
			enableRemoteModule: false,
			preload: path.join(__dirname, './preload.js'),
		},
		show: false,
	});

	win.loadFile(config.public_path + 'index.html');
	win.removeMenu();
	win.once('ready-to-show', () => {
		win.show();
	});
	win.webContents.openDevTools();
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
