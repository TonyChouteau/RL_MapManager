function Import(props) {
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
			color: css.colors.text2,
		};
		let rowContent = css.rowContent;

		return { importStyle, rowContent, row1, row2 };
	}
	// Make css
	let { importStyle, rowContent, row1, row2 } = makeStyles(config.css);

	//Renderer
	return (
		<div style={importStyle}>
			<Row even style={row1}>
				<div style={rowContent}>New Map File (.zip, .udk, .upk) :</div>
			</Row>
			<Row style={row2}>
				<div style={rowContent}>-</div>
				<Button onClick={props.onGameFolderEdit} style={rowContent}>
					<Icon icon={config.icons.EDIT} color={config.css.colors.icon} size={config.css.iconSize} />
				</Button>
			</Row>
		</div>
	);
}
