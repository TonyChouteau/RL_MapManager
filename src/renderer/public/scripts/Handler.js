var Handler = function Handler() {
	this.appPath = null;
	this.gamePath = null;

	window.api.receive('ready', function (appName) {
		document.title = appName;
		handler.addIpcListener();
	});
};

Handler.prototype = {
	addIpcListener: function addIpcListener() {
		var _this = this;

		window.api.receive('app-path', function (path) {
			_this.appPath = path;
			if (_this.appPathHandler) {
				_this.appPathHandler(path);
			}
		});
		window.api.receive('game-path', function (path) {
			_this.gamePath = path;
			if (_this.gamePathHandler) {
				_this.gamePathHandler(path);
			}
		});
		window.api.receive('to-open', function (path) {
			_this.importPath = path;
			if (_this.importPathHandler) {
				_this.importPathHandler(path);
			}
		});
		window.api.send('get-path');
	},

	// Asynchronous Getters
	getAppPath: function getAppPath(handler) {
		this.appPathHandler = handler;

		if (this.appPath) {
			return handler(this.appPath);
		}
	},
	getGamePath: function getGamePath(handler) {
		this.gamePathHandler = handler;

		if (this.gamePath) {
			return handler(this.gamePath);
		}
	},
	getImportPath: function getImportPath(handler) {
		this.importPathHandler = handler;
		if (this.importPath) {
			return handler(this.importPath);
		}
	},

	// Edit Path Handler
	editAppFolder: function editAppFolder() {
		window.api.send('edit-folder', {
			type: 'app',
			title: 'Choose the folder to save custom maps'
		});
	},
	editGameFolder: function editGameFolder() {
		window.api.send('edit-folder', {
			type: 'game',
			title: 'Select the game folder'
		});
	},

	importMap: function importMap(path) {
		window.api.send('import', {
			title: 'Select the new map to import (.zip, .udk, .upk)',
			defaultPath: path
		});
	}
};