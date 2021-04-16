function Title(props) {
	// Define the makeStyles function
	this.makeStyles = function (css) {
		var titleStyles = {
			width: "unset",
			font: "bold 25px Consolas"
		};
		Object.assign(titleStyles, config.css.flexColumn);

		return {
			titleStyles: titleStyles
		};
	};
	// Make css

	var _makeStyles = makeStyles(config.css),
	    titleStyles = _makeStyles.titleStyles;

	// Renderer


	return React.createElement(
		"h1",
		{ style: titleStyles },
		props.children
	);
}