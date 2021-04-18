function App(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		let colors = css.colors;

		const styleContainer = {
			width: '100%',
			height: '100%',
			background: colors.background,
		};
		Object.assign(styleContainer, css.flexColumn, css.flexCenter);

		const styleContainer2 = {
			width: 'calc(100% - 200px)',
			height: '100%',
		};
		Object.assign(styleContainer2, css.flexCenter);

		return {
			styleContainer: styleContainer,
			styleContainer2: styleContainer2,
		};
	}
	// Make css
	const { styleContainer, styleContainer2 } = makeStyles(config.css);

	// Define React state
	const [state, setState] = React.useState(config.states.LIST);
	function handleStateChange(state) {
		setState(state);
	}

	const [appFolder, setAppFolder] = React.useState("Not defined");
	const [gameFolder, setGameFolder] = React.useState(null);
	handler.getAppPath((path) => {
		if (path !== appFolder) {
			setAppFolder(path);
		}
	});
	handler.getGamePath((path) => {
		if (path !== gameFolder) {
			setGameFolder(path);
		}
	});

	// Renderer
	return (
		<div style={styleContainer}>
			<div style={styleContainer2}>
				<Header state={state} size={config.css.iconSize} handleStateChange={handleStateChange} />
				<Content state={state} appFolder={appFolder} gameFolder={gameFolder} onAppFolderEdit={handler.editAppFolder} onGameFolderEdit={handler.editGameFolder}/>
			</div>
		</div>
	);
}

// Add ReactApp to DOM
let domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
