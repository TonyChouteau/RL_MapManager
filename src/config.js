exports.config = {
	appName: "Rocket League Map Manager",
	renderer_path: "./src/renderer", 
	public_path: "./src/renderer/public/",
	preload_path: "./",
	save_path: "./",
	send_channels: [
		'get-path', 
		'edit-folder', 
		'edit-import', 
		'get-list', 
		'add-map', 
		'handle-selected',
	],
	receive_channels: [
		'ready', 
		'app-path', 
		'game-path', 
		'to-open', 
		'list',
		'selected',
	],
}