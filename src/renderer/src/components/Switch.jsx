function Switch(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		let contentStyle = {};
		Object.assign(contentStyle, css.flexRow, css.flexCenter);

		return { contentStyle };
	}
	// Make css
	let { contentStyle } = makeStyles(config.css);

	// Renderer
	return <div style={contentStyle}>{props.children}</div>;
}
