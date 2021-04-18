var Handler = function Handler() {
	this.path = null;
};

Handler.prototype = {
	addIpcListener: function addIpcListener() {
		var _this = this;

		window.api.receive('app-path', function (path) {
			console.log(path);
			_this.path = path || "Not Defined";
		});
		window.api.send('get-app-path', "data");
	},

	getPath: function getPath() {
		return this.path || "Not Defined";
	}
};