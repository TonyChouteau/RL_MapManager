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
	const [state, setState] = React.useState(config.states.IMPORT);

	function handleStateChange(state) {
		console.log(state);
		setState(state);
	}

	// Renderer
	return (
		<div style={styleContainer}>
			<div style={styleContainer2}>
				<Header state={state} size={config.css.iconSize} handleStateChange={handleStateChange} />
				<Content />
			</div>
		</div>
	);
}

// Add ReactApp to DOM
let domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
