let Handler = function () {
	this.path = null;
};

Handler.prototype = {
	addIpcListener: function() {
		window.api.receive('app-path', (path) => {
			console.log(path);
			this.path = path || "Not Defined";
		});
		window.api.send('get-app-path', "data");
	},

	getPath: function() {
		return this.path || "Not Defined";
	},
};
