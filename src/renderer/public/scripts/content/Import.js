function Import(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		var importStyle = {
			background: css.colors.background2,
			width: '100%'
		};
		var row1 = {
			font: css.font.subTitle
		};

		var row2 = {
			font: css.font.content,
			color: css.colors.text2
		};
		var rowContent = css.rowContent;

		return { importStyle: importStyle, rowContent: rowContent, row1: row1, row2: row2 };
	}
	// Make css

	var _makeStyles = makeStyles(config.css),
	    importStyle = _makeStyles.importStyle,
	    rowContent = _makeStyles.rowContent,
	    row1 = _makeStyles.row1,
	    row2 = _makeStyles.row2;

	//Renderer


	return React.createElement(
		'div',
		{ style: importStyle },
		React.createElement(
			Row,
			{ even: true, style: row1 },
			React.createElement(
				'div',
				{ style: rowContent },
				'New Map File (.zip, .udk, .upk) :'
			)
		),
		React.createElement(
			Row,
			{ style: row2 },
			React.createElement(
				'div',
				{ style: rowContent },
				'-'
			),
			React.createElement(
				Button,
				{ onClick: props.onGameFolderEdit, style: rowContent },
				React.createElement(Icon, { icon: config.icons.EDIT, color: config.css.colors.icon, size: config.css.iconSize })
			)
		)
	);
}