function Return(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		var returnStyle = {
			font: css.font.title
		};
		Object.assign(returnStyle, css.flexRow);

		var iconStyle = {
			marginRight: '10px'
		};

		return { returnStyle: returnStyle, iconStyle: iconStyle };
	}
	// Make css

	var _makeStyles = makeStyles(config.css),
	    returnStyle = _makeStyles.returnStyle,
	    iconStyle = _makeStyles.iconStyle;

	return React.createElement(
		'div',
		{ style: returnStyle },
		React.createElement(
			'div',
			{ style: iconStyle },
			React.createElement(Icon, { icon: config.icons.ARROW, size: config.css.iconSize, color: config.css.colors.icon })
		),
		React.createElement(
			'div',
			null,
			props.children
		)
	);
}