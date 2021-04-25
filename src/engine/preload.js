// Vendors Modules
const { contextBridge, ipcRenderer } = require('electron');

const { config } = require('./Config');

contextBridge.exposeInMainWorld('api', {
	send: (channel, data) => {
		let validChannels = config.send_channels;
		if (validChannels.includes(channel)) {
			ipcRenderer.send(channel, data);
		}
	},
	receive: (channel, func) => {
		let validChannels = config.receive_channels;
		if (validChannels.includes(channel)) {
			ipcRenderer.on(channel, (event, ...args) => func(...args));
		}
	},
});
