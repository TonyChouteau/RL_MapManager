function App(props) {
	// Define the makeStyles function
	this.makeStyles = function (css) {
		let colors = css.colors;

		const styleContainer = {
			width: '100%',
			height: '100%',
			background: colors.background,
		};
		Object.assign(styleContainer, css.flexColumn);

		const styleContainer2 = {
			width: 'calc(100% - 200px)',
			height: '100%',
		};

		return {
			styleContainer: styleContainer,
			styleContainer2: styleContainer2,
		};
	};
	// Make css
	const { styleContainer, styleContainer2 } = this.makeStyles(config.css);

	// Define React state
	const [state, setState] = React.useState(config.states.LIST);

	setTimeout(() => {
		setState((state + 1) % config.TOTAL_STATES);
	}, 2000);

	// Renderer
	return (
		<div style={styleContainer}>
			<div style={styleContainer2}>
				<Header state={state}></Header>
				<Content></Content>
			</div>
		</div>
	);
}

// Add ReactApp to DOM
let domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
