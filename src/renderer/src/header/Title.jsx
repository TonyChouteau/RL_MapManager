function Title(props) {
	// Define the makeStyles function
	this.makeStyles = function (css) {
		const titleStyles = {
			width: "unset",
			font: "bold 25px Consolas",
		};
		Object.assign(titleStyles, config.css.flexColumn);

		return {
			titleStyles : titleStyles
		};
	};
	// Make css
	const { titleStyles } = makeStyles(config.css);

	// Renderer
	return (
		<h1 style={titleStyles}>
			{props.children}
		</h1>
	);
}