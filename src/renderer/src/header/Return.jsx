function Return(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		let returnStyle = {
			font: css.font.title,
		};
		Object.assign(returnStyle, css.flexRow);

		let iconStyle = {
			marginRight: '10px',
		};

		return { returnStyle, iconStyle };
	}
	// Make css
	const { returnStyle, iconStyle } = makeStyles(config.css);

	return (
		<div style={returnStyle}>
			<div style={iconStyle}>
				<Icon icon={config.icons.ARROW} size={config.css.iconSize} color={config.css.colors.icon}></Icon>
			</div>
			<div>{props.children}</div>
		</div>
	);
}
