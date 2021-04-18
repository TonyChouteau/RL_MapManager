function Button(props) {
	// Define button state
	let [hover, setHover] = React.useState(false);

	// Define the makeStyles function
	function makeStyles(css) {
		let buttonStyle = {
			padding: '10px',
			background: props.background || 'transparent',
			transition: 'all 0.2s 0s',
			cursor: 'pointer',
		};

		if (hover) {
			Object.assign(buttonStyle, props.hoverStyle || {
				filter: 'brightness(75%)',
			});
		}

		return { buttonStyle };
	}
	let { buttonStyle } = makeStyles(config.css);

	function handleHover(state) {
		setHover(state);
	}

	// Renderer
	return (
		<div
			style={buttonStyle}
			onClick={props.onClick}
			onMouseEnter={() => {
				handleHover(true);
			}}
			onMouseLeave={() => {
				handleHover(false);
			}}
			onMouseMove={() => {
				handleHover(true);
			}}
		>
			{props.children}
		</div>
	);
}
