var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function Import(props) {
	// Set states
	var _React$useState = React.useState(true),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    disabled = _React$useState2[0],
	    setDisabled = _React$useState2[1];

	function isValid(path) {
		return config.allowedExtensions.includes(path.split('.').slice(-1)[0]);
	}

	var _React$useState3 = React.useState(''),
	    _React$useState4 = _slicedToArray(_React$useState3, 2),
	    importPath = _React$useState4[0],
	    setImportPath = _React$useState4[1];

	handler.getImportPath(function (path) {
		if (path !== importPath) {
			setDisabled(!isValid(path));
			setImportPath(path);
		}
	});

	var _React$useState5 = React.useState('NewMap' + props.count),
	    _React$useState6 = _slicedToArray(_React$useState5, 2),
	    name = _React$useState6[0],
	    setName = _React$useState6[1];

	function handleChange(event) {
		setName(event.target.value);
	}

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
			color: isValid(importPath) ? css.colors.textSuccess : css.colors.textError
		};
		var rowContent = css.rowContent;

		var inputStyle = {
			height: '94%',
			width: '100%',
			background: css.colors.line2,
			border: 'none',
			color: css.colors.text1,
			margin: '10px',
			outline: 'none'
		};

		var importButtonContainer = {
			width: '100%'
		};
		Object.assign(importButtonContainer, css.flexRow, css.flexCenter);

		var addButtonStyle = {
			marginTop: '20px'
		};
		Object.assign(addButtonStyle, css.flexRow, css.flexCenter);

		var iconStyle = {
			marginRight: '10px'
		};

		return { importStyle: importStyle, rowContent: rowContent, row1: row1, row2: row2, inputStyle: inputStyle, importButtonContainer: importButtonContainer, addButtonStyle: addButtonStyle, iconStyle: iconStyle };
	}
	// Make css

	var _makeStyles = makeStyles(config.css),
	    importStyle = _makeStyles.importStyle,
	    rowContent = _makeStyles.rowContent,
	    row1 = _makeStyles.row1,
	    row2 = _makeStyles.row2,
	    inputStyle = _makeStyles.inputStyle,
	    importButtonContainer = _makeStyles.importButtonContainer,
	    addButtonStyle = _makeStyles.addButtonStyle,
	    iconStyle = _makeStyles.iconStyle;

	//Renderer


	return React.createElement(
		'div',
		null,
		React.createElement(
			'div',
			{ style: importStyle },
			React.createElement(
				Row,
				{ even: true, style: row1 },
				React.createElement(
					'div',
					{ style: rowContent },
					'New Map File (.zip, .rar, .udk, .upk) :'
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
					{
						onClick: function onClick() {
							handler.editImportFile(importPath);
						},
						style: rowContent
					},
					React.createElement(Icon, { icon: config.icons.EDIT, color: config.css.colors.icon, size: config.css.iconSize })
				)
			),
			React.createElement(
				Row,
				{ even: true, style: row1 },
				React.createElement(
					'div',
					{ style: rowContent },
					'Map Name:'
				)
			),
			React.createElement(
				Row,
				{ id: 'import_map_name', style: row2 },
				React.createElement('input', { style: inputStyle, type: 'text', value: name, onChange: handleChange })
			)
		),
		React.createElement(
			'div',
			{ style: importButtonContainer },
			React.createElement(
				Button,
				{
					background: config.css.colors.button,
					style: addButtonStyle,
					disabled: disabled,
					onClick: function onClick() {
						isValid(importPath) && handler.importMap({ path: importPath, name: name });
					}
				},
				React.createElement(Icon, {
					style: iconStyle,
					icon: config.icons.ADD,
					color: config.css.colors.icon,
					size: config.css.iconSize
				}),
				React.createElement(
					'div',
					null,
					'ADD THE MAP'
				)
			)
		)
	);
}