function Header(props) {

	// Define the makeStyles function
	this.makeStyles = function (css) {
		var headerStyle = {
			width: "100%"
		};

		return headerStyle;
	};
	// Make css

	var _makeStyles = makeStyles(config.css),
	    headerStyle = _makeStyles.headerStyle;

	this.getTitle = function (state) {
		return state;
	};

	// Renderer
	return React.createElement(
		"div",
		{ style: headerStyle },
		this.getTitle(props.state)
	);
}