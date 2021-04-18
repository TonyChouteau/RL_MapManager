function Row(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		rowStyle = {
			width: '100%',
			height: css.lineHeight,
			background: props.even ? css.colors.line1 : css.colors.line2,
			font: props.font,
		};
		Object.assign(rowStyle, css.flexRow, css.flexSpace, props.style);

		return { rowStyle };
	}
	// Make css
	let { rowStyle } = makeStyles(config.css);

	// Renderer
	return <div style={rowStyle}>{props.children}</div>;
}
