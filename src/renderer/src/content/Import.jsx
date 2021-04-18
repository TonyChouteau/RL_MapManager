function Import(props) {
	// Set states
	let [disabled, setDisabled] = React.useState(true);
	function isValid(path) {
		return config.allowedExtensions.includes(path.split('.').slice(-1)[0]);
	}

	const [importPath, setImportPath] = React.useState('');
	handler.getImportPath((path) => {
		if (path !== importPath) {
			setDisabled(!isValid(path));
			setImportPath(path);
		}
	});

	// Define the makeStyles function
	function makeStyles(css) {
		let importStyle = {
			background: css.colors.background2,
			width: '100%',
		};
		let row1 = {
			font: css.font.subTitle,
		};

		let row2 = {
			font: css.font.content,
			color: isValid(importPath) ? css.colors.textSuccess : css.colors.textError,
		};
		let rowContent = css.rowContent;

		let inputStyle = {
			height: '94%',
			width: '100%',
			background: css.colors.line2,
			border: 'none',
			color: css.colors.text1,
			margin: '10px',
			outline: 'none',
		};

		let importButtonContainer = {
			width: '100%',
		};
		Object.assign(importButtonContainer, css.flexRow, css.flexCenter);

		let addButtonStyle = {
			marginTop: '20px',
		};
		Object.assign(addButtonStyle, css.flexRow, css.flexCenter);

		let iconStyle = {
			marginRight: '10px',
		};

		return { importStyle, rowContent, row1, row2, inputStyle, importButtonContainer, addButtonStyle, iconStyle };
	}
	// Make css
	let {
		importStyle,
		rowContent,
		row1,
		row2,
		inputStyle,
		importButtonContainer,
		addButtonStyle,
		iconStyle,
	} = makeStyles(config.css);

	//Renderer
	return (
		<div>
			<div style={importStyle}>
				<Row even style={row1}>
					<div style={rowContent}>New Map File (.zip, .udk, .upk) :</div>
				</Row>
				<Row style={row2}>
					<div style={rowContent}>{importPath || '-'}</div>
					<Button
						onClick={() => {
							handler.editImportFile(importPath);
						}}
						style={rowContent}
					>
						<Icon icon={config.icons.EDIT} color={config.css.colors.icon} size={config.css.iconSize} />
					</Button>
				</Row>
				<Row even style={row1}>
					<div style={rowContent}>Map Name:</div>
				</Row>
				<Row style={row2}>
					<input style={inputStyle} type="text" defaultValue={'NewMap' + props.count} />
				</Row>
			</div>
			<div style={importButtonContainer}>
				<Button
					background={config.css.colors.button}
					style={addButtonStyle}
					disabled={disabled}
					onClick={() => {
						isValid(importPath) && handler.importMap(importPath);
					}}
				>
					<Icon
						style={iconStyle}
						icon={config.icons.ADD}
						color={config.css.colors.icon}
						size={config.css.iconSize}
					/>
					<div>ADD THE MAP</div>
				</Button>
			</div>
		</div>
	);
}
