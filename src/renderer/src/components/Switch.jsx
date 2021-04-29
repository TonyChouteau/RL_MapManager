function Switch(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		let contentStyle = {
			width: '100%',
		};
		Object.assign(contentStyle, css.flexRow, css.flexCenter);

		let switchStyle = {
			width: props.size * 2 + 'px',
			height: props.size + 'px',
			borderRadius: props.size / 2 + 'px ',
			background: props.state === Switch.ON ? css.colors.switchOn : css.colors.switchOff,
			cursor: 'pointer',
		};

		let circleStyle = {
			width: props.size + 'px',
			height: props.size + 'px',
			borderRadius: props.size / 2 + 'px ',
			background: props.disabled ? 'grey' : 'white',
			pointerEvent: 'none',
		};
		if (props.state === Switch.ON) {
			Object.assign(circleStyle, {
				transform: 'translateX(' + props.size + 'px)',
			});
		}

		return { contentStyle, switchStyle, circleStyle };
	}
	// Make css
	let { contentStyle, switchStyle, circleStyle } = makeStyles(config.css);

	// Renderer
	return (
		<div style={contentStyle}>
			<div
				style={switchStyle}
				onClick={() => {
					if (!props.disabled) {
						props.onClick();
					}
				}}
			>
				<div style={circleStyle}></div>
			</div>
		</div>
	);
}

Switch.ON = 'on';
Switch.OFF = 'off';
