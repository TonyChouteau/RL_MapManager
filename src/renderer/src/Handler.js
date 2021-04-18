let Handler = function () {
	this.path = null;
};

Handler.prototype = {
	addIpcListener: function() {
		window.api.receive('app-path', (path) => {
			this.path = path;
			if (this.pathHandler) {
				this.pathHandler(path);
				this.pathHandler = null;
			}
		});
		window.api.send('get-app-path', "data");
	},

	getPath: function(handler) {
		if (this.path) {
			return this.path;
		} else {
			this.pathHandler = handler;
		}
	},
};
