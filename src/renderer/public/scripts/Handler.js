var Handler = function Handler() {
	this.path = null;
};

Handler.prototype = {
	addIpcListener: function addIpcListener() {
		var _this = this;

		window.api.receive('app-path', function (path) {
			_this.path = path;
			if (_this.pathHandler) {
				_this.pathHandler(path);
				_this.pathHandler = null;
			}
		});
		window.api.send('get-app-path', "data");
	},

	getPath: function getPath(handler) {
		if (this.path) {
			return this.path;
		} else {
			this.pathHandler = handler;
		}
	}
};