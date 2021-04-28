function Switch(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		var contentStyle = {
			width: '100%'
		};
		Object.assign(contentStyle, css.flexRow, css.flexCenter);

		var switchStyle = {
			width: props.size * 2 + 'px',
			height: props.size + 'px',
			borderRadius: props.size / 2 + 'px ',
			background: props.state === Switch.ON ? css.colors.switchOn : css.colors.switchOff,
			cursor: 'pointer'
		};

		var circleStyle = {
			width: props.size + 'px',
			height: props.size + 'px',
			borderRadius: props.size / 2 + 'px ',
			background: 'white',
			pointerEvent: 'none'
		};
		if (props.state === Switch.ON) {
			Object.assign(circleStyle, {
				transform: 'translateX(' + props.size + 'px)'
			});
		}

		return { contentStyle: contentStyle, switchStyle: switchStyle, circleStyle: circleStyle };
	}
	// Make css

	var _makeStyles = makeStyles(config.css),
	    contentStyle = _makeStyles.contentStyle,
	    switchStyle = _makeStyles.switchStyle,
	    circleStyle = _makeStyles.circleStyle;

	// Renderer


	return React.createElement(
		'div',
		{ style: contentStyle },
		React.createElement(
			'div',
			{ style: switchStyle, onClick: props.onClick },
			React.createElement('div', { style: circleStyle })
		)
	);
}

Switch.ON = 'on';
Switch.OFF = 'off';