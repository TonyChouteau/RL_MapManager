// Vendors Modules
const { contextBridge, ipcRenderer } = require("electron");

// When window is loaded
contextBridge.exposeInMainWorld(
	"api",
	{
		send: (channel, data) => {
            let validChannels = ["toFileManager"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromFileManager"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
	}
);