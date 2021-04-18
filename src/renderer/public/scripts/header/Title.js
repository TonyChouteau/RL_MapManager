function Title(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		var titleStyles = {
			width: 'unset',
			font: css.font.title,
			margin: '0'
		};
		Object.assign(titleStyles, css.flexColumn, css.flexCenter);

		return {
			titleStyles: titleStyles
		};
	}
	// Make css

	var _makeStyles = makeStyles(config.css),
	    titleStyles = _makeStyles.titleStyles;

	// Renderer


	return React.createElement(
		'h1',
		{ style: titleStyles },
		props.children
	);
}