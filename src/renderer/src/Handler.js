let Handler = function () {
	this.appPath = null;
	this.gamePath = null;

	window.api.receive('ready', (appName) => {
		document.title = appName;
		handler.addIpcListener();
	});
};

Handler.prototype = {
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
		window.api.send('get-path');
	},

	// Asynchronous Getters
	getAppPath: function (handler) {
		this.appPathHandler = handler
		
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

	// Edit Path Handler
	editAppFolder: function () {
		window.api.send('edit-folder', {
			type: 'app',
			title: 'Choose the folder to save custom maps',
		});
	},
	editGameFolder: function () {
		window.api.send('edit-folder', {
			type: 'game',
			title: config.gamePathDefault,
		});
	},
};
