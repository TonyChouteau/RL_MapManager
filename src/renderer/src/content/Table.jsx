function Table(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		let contentStyle = {
			height: '100%',
			background: css.colors.background2,
		};
		
		let rowContent = css.rowContent;

		let row1 = {
			font: css.font.subTitle,
		};

		let row2 = {
			font: css.font.content,
			color: css.colors.text2,
		};

		return { contentStyle, rowContent, row1, row2 };
	}
	// Make css
	let { contentStyle, rowContent, row1, row2 } = makeStyles(config.css);

	// Renderer
	return (
		<div style={contentStyle}>
			<Row even style={row1}>
				<div style={rowContent}>Current : </div>
			</Row>
			<Row style={row2}>
				<div style={rowContent}>{props.gameFolder || config.gamePathDefault}</div>
				<Button onClick={handler.editGameFolder} style={rowContent}>
					<Icon icon={config.icons.EDIT} color={config.css.colors.icon} size={config.css.iconSize} />
				</Button>
			</Row>
		</div>
	);
}
