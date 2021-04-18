
function Settings(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		var contentStyle = {
			background: css.colors.background2,
			width: '100%'
		};

		var rowContent = {
			margin: '10px'
		};

		var row1 = {
			font: css.font.subTitle
		};

		var row2 = {
			font: css.font.content
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
				'Rocket League Folder :'
			),
			React.createElement('div', null)
		),
		React.createElement(
			Row,
			{ style: row2 },
			React.createElement(
				'div',
				{ style: rowContent },
				props.gameFolder
			),
			React.createElement(
				Button,
				{ style: rowContent },
				React.createElement(Icon, { icon: config.icons.EDIT, color: config.css.colors.icon, size: config.css.iconSize })
			)
		),
		React.createElement(
			Row,
			{ even: true, style: row1 },
			React.createElement(
				'div',
				{ style: rowContent },
				'Custom Map Folder :'
			)
		),
		React.createElement(
			Row,
			{ style: row2 },
			React.createElement(
				'div',
				{ style: rowContent },
				props.appFolder
			),
			React.createElement(
				Button,
				{ style: rowContent },
				React.createElement(Icon, { icon: config.icons.EDIT, color: config.css.colors.icon, size: config.css.iconSize })
			)
		)
	);
}