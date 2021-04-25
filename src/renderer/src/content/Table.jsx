function Table(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		let contentStyle = {
			height: '100%',
			background: css.colors.background2,
		};

		let rowContent = {};
		Object.assign(rowContent, css.rowContent, css.flexRow);

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
				<div style={rowContent}>Current : {props.list[props.selected]}</div>
				<div style={rowContent}>
					<Button
						onClick={() => {
							handler.deleteMap(props.selected);
						}}
					>
						<Icon icon={config.icons.TRASH} color={config.css.colors.icon} size={config.css.iconSize} />
					</Button>
					<Switch>
						O/X
					</Switch>
				</div>
			</Row>
			{props.list.map((map, id) => {
				if (id === props.selected) return;
				return (
					<Row key={id} style={row2}>
						<div style={rowContent}>{map}</div>
						<div style={rowContent}>
							<Button
								onClick={() => {
									handler.deleteMap(id);
								}}
							>
								<Icon
									icon={config.icons.TRASH}
									color={config.css.colors.icon}
									size={config.css.iconSize}
								/>
							</Button>
							<Button onClick={() => {}}>
								<Icon
									icon={config.icons.EDIT}
									color={config.css.colors.icon}
									size={config.css.iconSize}
								/>
							</Button>
							<Button
								onClick={() => {
									handler.setSelected(id);
								}}
							>
								<Icon
									icon={config.icons.ARROW}
									color={config.css.colors.icon}
									size={config.css.iconSize}
									rotate={180}
								/>
							</Button>
						</div>
					</Row>
				);
			})}
		</div>
	);
}
