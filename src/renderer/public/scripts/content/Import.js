var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function Import(props) {
	// Set states
	var _React$useState = React.useState(""),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    importPath = _React$useState2[0],
	    setImportPath = _React$useState2[1];

	handler.getImportPath(function (path) {
		if (path !== importPath) {
			setImportPath(path);
		}
	});

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
			color: config.allowedExtensions.includes(importPath.split('.').slice(-1)[0]) ? css.colors.textSuccess : css.colors.textError
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
				importPath || '-'
			),
			React.createElement(
				Button,
				{ onClick: function onClick() {
						props.onMapImport(importPath);
					}, style: rowContent },
				React.createElement(Icon, { icon: config.icons.EDIT, color: config.css.colors.icon, size: config.css.iconSize })
			)
		)
	);
}