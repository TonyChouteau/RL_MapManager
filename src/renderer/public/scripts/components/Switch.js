function Switch(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		var contentStyle = {};
		Object.assign(contentStyle, css.flexRow, css.flexCenter);

		return { contentStyle: contentStyle };
	}
	// Make css

	var _makeStyles = makeStyles(config.css),
	    contentStyle = _makeStyles.contentStyle;

	// Renderer


	return React.createElement(
		"div",
		{ style: contentStyle },
		props.children
	);
}