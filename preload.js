// Vendors Modules
const fs = require('fs');
// const { webFrame } = require('electron');

// Own Modules
const { config } = require('./config');

// When window is loaded
window.addEventListener('DOMContentLoaded', () => {
	let append = (str) => {
		let scripts_container = document.getElementById('scripts');
		scripts_container.innerText += "\n"+str;
	};

	fs.readdir(config.script_folder, (err, files) => {
		if (err) {
			return;
		}
		append(files.join(", "));
		// files.forEach((file) => {
		// 	fs.readFile(config.script_folder + file, 'utf8', (err, data) => {
		// 		if (err) {
		// 			return;
		// 		}
		// 		webFrame.executeJavaScript(data);
		// 	});
		// });
	});
});
