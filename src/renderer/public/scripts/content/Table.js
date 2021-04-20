function Table(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		var contentStyle = {
			height: '100%',
			background: css.colors.background2
		};

		var rowContent = css.rowContent;

		var row1 = {
			font: css.font.subTitle
		};

		var row2 = {
			font: css.font.content,
			color: css.colors.text2
		};

		return { contentStyle: contentStyle, rowContent: rowContent, row1: row1, row2: row2 };
	}
	// Make css

	var _makeStyles = makeStyles(config.css),
	    contentStyle = _makeStyles.contentStyle,
	    rowContent = _makeStyles.rowContent,
	    row1 = _makeStyles.row1,
	    row2 = _makeStyles.row2;

	// Renderer


	return React.createElement(
		'div',
		{ style: contentStyle },
		React.createElement(
			Row,
			{ even: true, style: row1 },
			React.createElement(
				'div',
				{ style: rowContent },
				'Current : '
			)
		),
		React.createElement(
			Row,
			{ style: row2 },
			React.createElement(
				'div',
				{ style: rowContent },
				props.gameFolder || config.gamePathDefault
			),
			React.createElement(
				Button,
				{ onClick: handler.editGameFolder, style: rowContent },
				React.createElement(Icon, { icon: config.icons.EDIT, color: config.css.colors.icon, size: config.css.iconSize })
			)
		)
	);
}