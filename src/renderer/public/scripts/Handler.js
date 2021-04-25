var Handler = function Handler() {
	var _this = this;

	this.appPath = null;
	this.gamePath = null;

	window.api.receive('ready', function (appName) {
		document.title = appName;
		_this.addIpcListener();
	});
};

Handler.prototype = {

	message: function message(channel, data) {
		window.api.send(channel, data);
	},

	addIpcListener: function addIpcListener() {
		var _this2 = this;

		window.api.receive('app-path', function (path) {
			_this2.appPath = path;
			if (_this2.appPathHandler) {
				_this2.appPathHandler(path);
			}
		});
		window.api.receive('game-path', function (path) {
			_this2.gamePath = path;
			if (_this2.gamePathHandler) {
				_this2.gamePathHandler(path);
			}
		});
		window.api.receive('to-open', function (path) {
			_this2.importPath = path;
			if (_this2.importPathHandler) {
				_this2.importPathHandler(path);
			}
		});
		window.api.receive('list', function (list) {
			_this2.list = list;
			if (_this2.listHandler) {
				_this2.listHandler(list);
			}
		});
		window.api.receive('selected', function (selected) {
			_this2.selected = selected;
			if (_this2.selectedHandler) {
				_this2.selectedHandler(selected);
			}
		});
		window.api.send('get-path');
		window.api.send('get-list');
		window.api.send('handle-selected');
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
	getList: function getList(handler) {
		this.listHandler = handler;
		if (this.list) {
			return handler(this.list);
		}
	},
	getSelected: function getSelected(handler) {
		this.selectedHandler = handler;
		if (this.selected) {
			return handler(this.selected);
		}
	},

	// Edit Path Handler
	editAppFolder: function editAppFolder() {
		this.message('edit-folder', {
			type: 'app',
			title: 'Choose the folder to save custom maps'
		});
	},
	editGameFolder: function editGameFolder() {
		this.message('edit-folder', {
			type: 'game',
			title: 'Select the game folder'
		});
	},

	editImportFile: function editImportFile(path) {
		this.message('edit-import', {
			title: 'Select the new map to import (.zip, .udk, .upk)',
			defaultPath: path
		});
	},
	importMap: function importMap(data) {
		this.message('add-map', {
			path: data.path,
			name: data.name
		});
	},
	setSelected: function setSelected(data) {
		this.message("handle-selected", data);
	}
};