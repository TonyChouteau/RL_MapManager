const { app, BrowserWindow } = require('electron');
const path = require('path');
const {config} = require('./config');

function createWindow() {

	const win = new BrowserWindow({
		src: "./src",
		icon:'./src/images/app_icon.png',
		width: 1000,
		height: 600,
		backgroundColor: "black",
		title: config.appName,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	win.loadFile('index.html');
	win.removeMenu();
	//win.webContents.openDevTools();
}

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