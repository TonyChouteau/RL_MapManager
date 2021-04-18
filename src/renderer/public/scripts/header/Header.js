function Header(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		var headerStyle = {
			width: '100%',
			height: css.headerHeight,
			justifyContent: 'space-between'
		};
		Object.assign(headerStyle, css.flexRow, css.flexSpace);

		var cornerStyle = {
			width: '30%'
		};
		Object.assign(cornerStyle, css.flexRow, css.flexLeft);

		var styleButtonContainer = {};
		Object.assign(styleButtonContainer, css.flexRow);

		var buttonStyle = {
			height: css.headerHeight
		};

		return { headerStyle: headerStyle, cornerStyle: cornerStyle, styleButtonContainer: styleButtonContainer, buttonStyle: buttonStyle };
	}
	// Make css

	var _makeStyles = makeStyles(config.css),
	    headerStyle = _makeStyles.headerStyle,
	    cornerStyle = _makeStyles.cornerStyle,
	    styleButtonContainer = _makeStyles.styleButtonContainer,
	    buttonStyle = _makeStyles.buttonStyle;

	// Make Title


	function MakeTitle() {
		return React.createElement(
			'div',
			null,
			React.createElement(
				Title,
				null,
				config.statesName[props.state]
			)
		);
	}

	// Make Left Corner
	function MakeCorner() {
		if (props.state === config.states.LIST) {
			return React.createElement(
				'div',
				{ style: styleButtonContainer },
				React.createElement(
					Button,
					{
						style: buttonStyle,
						onClick: function onClick() {
							props.handleStateChange(config.states.SETTINGS);
						}
					},
					React.createElement(Icon, { icon: config.icons.SETTINGS, color: config.css.colors.icon, size: config.css.iconSize })
				),
				React.createElement(
					Button,
					{
						style: buttonStyle,
						type: config.icons.ADD,
						onClick: function onClick() {
							props.handleStateChange(config.states.IMPORT);
						}
					},
					React.createElement(Icon, { icon: config.icons.ADD, color: config.css.colors.icon, size: config.css.iconSize })
				)
			);
		} else {
			return React.createElement(
				'div',
				null,
				React.createElement(
					Button,
					{
						style: buttonStyle,
						onClick: function onClick() {
							props.handleStateChange(config.states.LIST);
						}
					},
					React.createElement(
						Return,
						null,
						'MAPS'
					)
				)
			);
		}
	}

	// Renderer
	return React.createElement(
		'div',
		{ style: headerStyle },
		React.createElement(
			'div',
			{ style: cornerStyle },
			React.createElement(MakeCorner, null)
		),
		React.createElement(MakeTitle, null),
		React.createElement('div', { style: cornerStyle })
	);
}