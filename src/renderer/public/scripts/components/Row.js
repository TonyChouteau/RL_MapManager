function Row(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		rowStyle = {
			width: '100%',
			height: css.lineHeight,
			background: props.even ? css.colors.line1 : css.colors.line2,
			font: props.font
		};
		Object.assign(rowStyle, css.flexRow, css.flexSpace, props.style);

		return { rowStyle: rowStyle };
	}
	// Make css

	var _makeStyles = makeStyles(config.css),
	    rowStyle = _makeStyles.rowStyle;

	// Renderer


	return React.createElement(
		'div',
		{ style: rowStyle },
		props.children
	);
}