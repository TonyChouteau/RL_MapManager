function Header(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		let headerStyle = {
			width: '100%',
			height: css.headerHeight,
			justifyContent: 'space-between',
		};
		Object.assign(headerStyle, css.flexRow, css.flexSpace);

		const cornerStyle = {
			width: '30%',
		};
		Object.assign(cornerStyle, css.flexRow, css.flexLeft);

		const styleButtonContainer = {
		};
		Object.assign(styleButtonContainer, css.flexRow);

		const buttonStyle = {
			height: css.headerHeight,
		}

		return { headerStyle, cornerStyle, styleButtonContainer, buttonStyle };
	}
	// Make css
	const { headerStyle, cornerStyle, styleButtonContainer, buttonStyle } = makeStyles(config.css);

	// Make Title
	function MakeTitle() {
		return (
			<div>
				<Title>{config.statesName[props.state]}</Title>
			</div>
		);
	}

	// Make Left Corner
	function MakeCorner() {
		if (props.state === config.states.LIST) {
			return (
				<div style={styleButtonContainer}>
					<Button
						style={buttonStyle}
						onClick={() => {
							props.handleStateChange(config.states.SETTINGS);
						}}
					>
						<Icon icon={config.icons.SETTINGS} color={config.css.colors.icon} size={config.css.iconSize}/>
					</Button>
					<Button
						style={buttonStyle}
						type={config.icons.ADD}
						onClick={() => {
							props.handleStateChange(config.states.IMPORT);
						}}
					>
						<Icon icon={config.icons.ADD} color={config.css.colors.icon} size={config.css.iconSize}/>
					</Button>
				</div>
			);
		} else {
			return (
				<div>
					<Button
						style={buttonStyle}
						onClick={() => {
							props.handleStateChange(config.states.LIST);
						}}
					>
						<Return>MAPS</Return>
					</Button>
				</div>
			);
		}
	}

	// Renderer
	return (
		<div style={headerStyle}>
			<div style={cornerStyle}>
				<MakeCorner />
			</div>
			<MakeTitle />
			<div style={cornerStyle}></div>
		</div>
	);
}
