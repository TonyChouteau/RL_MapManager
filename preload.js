const {config} = require('./config');

window.addEventListener('DOMContentLoaded', () => {
	
});

win.webContents.on("devtools-opened", () => { win.webContents.closeDevTools(); });