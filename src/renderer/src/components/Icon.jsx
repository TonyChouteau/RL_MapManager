function Icon(props) {
	// Define the makeStyles function
	function makeStyles() {
		let imgStyle = {
			verticalAlign: 'middle',
			width: props.size + 'px',
			height: +props.size + 5 + 'px',
			backgroundColor: props.color,
			mask: 'url(' + config.svg_path + props.icon + ') no-repeat center',
			WebkitMask: 'url(' + config.svg_path + props.icon + ') no-repeat center',
		};
		Object.assign(imgStyle, props.style);

		return { imgStyle };
	}
	// Make css
	let { imgStyle } = makeStyles();

	// Renderer
	return <div style={imgStyle}></div>;
}
