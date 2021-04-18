function Title(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		const titleStyles = {
			width: 'unset',
			font: css.font.title,
			margin: '0',
		};
		Object.assign(titleStyles, css.flexColumn, css.flexCenter);

		return {
			titleStyles: titleStyles,
		};
	}
	// Make css
	const { titleStyles } = makeStyles(config.css);

	// Renderer
	return <h1 style={titleStyles}>{props.children}</h1>;
}
