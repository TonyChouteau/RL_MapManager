function Header(props) {

	// Define the makeStyles function
	this.makeStyles = function(css) {
		const headerStyle = {
			width: "100%",
		};

		return headerStyle;
	};
	// Make css
	const {headerStyle} = makeStyles(config.css);

	this.getTitle = function(state) {
		return state;
	}

	// Renderer
	return (
		<div style={headerStyle}>
			{this.getTitle(props.state)}
		</div>
	);
}