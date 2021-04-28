let Handler = function () {
	this.appPath = null;
	this.gamePath = null;

	window.api.receive('ready', (appName) => {
		document.title = appName;
		this.addIpcListener();
	});
};

Handler.prototype = {
	message: function (channel, data) {
		window.api.send(channel, data);
	},

	addIpcListener: function () {
		window.api.receive('app-path', (path) => {
			this.appPath = path;
			if (this.appPathHandler) {
				this.appPathHandler(path);
			}
		});
		window.api.receive('game-path', (path) => {
			this.gamePath = path;
			if (this.gamePathHandler) {
				this.gamePathHandler(path);
			}
		});
		window.api.receive('to-open', (path) => {
			this.importPath = path;
			if (this.importPathHandler) {
				this.importPathHandler(path);
			}
		});
		window.api.receive('list', (list) => {
			this.list = list;
			if (this.listHandler) {
				this.listHandler(list);
			}
		});
		window.api.receive('selected', (selected) => {
			this.selected = selected;
			if (this.selectedHandler) {
				this.selectedHandler(selected);
			}
		});
		window.api.receive('active', (active) => {
			this.active = active;
			if (this.activeHandler) {
				this.activeHandler(active);
			}
		})
		this.message('get-path');
		this.message('get-list');
		this.message('handle-selected');
		this.message('switch-active');
	},

	// Asynchronous Getters
	getAppPath: function (handler) {
		this.appPathHandler = handler;

		if (this.appPath) {
			return handler(this.appPath);
		}
	},
	getGamePath: function (handler) {
		this.gamePathHandler = handler;

		if (this.gamePath) {
			return handler(this.gamePath);
		}
	},
	getImportPath: function (handler) {
		this.importPathHandler = handler;
		if (this.importPath) {
			return handler(this.importPath);
		}
	},
	getList: function (handler) {
		this.listHandler = handler;
		if (this.list) {
			return handler(this.list);
		}
	},
	getSelected: function (handler) {
		this.selectedHandler = handler;
		if (this.selected) {
			return handler(this.selected);
		}
	},
	getActive: function (handler) {
		this.activeHandler = handler;
		if (this.active) {
			return handler(this.active);
		}
	},

	// Edit Path Handler
	editAppFolder: function () {
		this.message('edit-folder', {
			type: 'app',
			title: 'Choose the folder to save custom maps',
		});
	},
	editGameFolder: function () {
		this.message('edit-folder', {
			type: 'game',
			title: 'Select the game folder',
		});
	},

	editImportFile: function (path) {
		this.message('edit-import', {
			title: 'Select the new map to import (.zip, .udk, .upk)',
			defaultPath: path,
		});
	},
	importMap: function (data) {
		this.message('add-map', {
			path: data.path,
			name: data.name,
		});
	},
	setSelected: function (id) {
		this.switchActive(false);
		this.message('handle-selected', id);
	},
	deleteMap: function (id) {
		if (this.selected === id) {
			this.setSelected(null);
		} else if (this.selected > id) {
			this.selected--;
			this.setSelected(this.selected);
		}
		this.message('remove', id);
	},
	switchActive: function(state) {
		let newState = true;
		if (state !== undefined) {
			newState = (state !== this.active);
		}
		this.message('switch-active', newState);
	}
};
