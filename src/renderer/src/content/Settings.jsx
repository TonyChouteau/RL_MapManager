function Settings(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		let contentStyle = {
			background: css.colors.background2,
			width: '100%',
		};

		let rowContent = {
			margin: '10px',
		};

		let row1 = {
			font: css.font.subTitle,
		};

		let row2 = {
			font: css.font.content,
		};

		return { contentStyle, rowContent, row1, row2 };
	}
	// Make css
	let { contentStyle, rowContent, row1, row2 } = makeStyles(config.css);

	// Renderer
	return (
		<div style={contentStyle}>
			<Row even style={row1}>
				<div style={rowContent}>Rocket League Folder :</div>
				<div>

				</div>
			</Row>
			<Row style={row2}>
				<div style={rowContent}>{props.gameFolder}</div>
			</Row>
			<Row even style={row1}>
				<div style={rowContent}>Custom Map Folder :</div>
			</Row>
			<Row style={row2}>
				<div style={rowContent}>Rocket League Folder :</div>
			</Row>
		</div>
	);
}
