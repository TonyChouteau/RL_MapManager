// Vendors Modules
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
	send: (channel, data) => {
		let validChannels = ['get-path', 'edit-folder', 'import'];
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	receive: (channel, func) => {
		let validChannels = ['ready', 'app-path', 'game-path', 'to-open'];
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (event, ...args) => func(...args));
		}
	},
});
