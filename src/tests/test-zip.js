let fs = require('fs');
let Zip = require('adm-zip');

const path = './tmp/';

fs.readdir(path, function (err, files) {
	if (err) {
		return console.log('Unable to scan directory: ' + err);
	}
	files.filter(file => file.includes("zip")).forEach(function (file) {
		console.log(file);
		let zip = new Zip(path + file);
		zip.getEntries().forEach(function(entry) {
			let fileName = entry.entryName ;
			if (fileName .includes(".upk") || fileName.includes(".udk")) {
				zip.extractEntryTo(fileName, path, false, true);
			}
		});
	});
});
