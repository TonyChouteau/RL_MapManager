function Icon(props) {
	// Define the makeStyles function
	function makeStyles() {
		var imgStyle = {
			verticalAlign: 'middle',
			width: props.size + 'px',
			height: +props.size + 5 + 'px',
			backgroundColor: props.color,
			mask: 'url(' + config.svg_path + props.icon + ') no-repeat center',
			WebkitMask: 'url(' + config.svg_path + props.icon + ') no-repeat center'
		};
		Object.assign(imgStyle, props.style);

		return { imgStyle: imgStyle };
	}

	var _makeStyles = makeStyles(),
	    imgStyle = _makeStyles.imgStyle;

	// Renderer


	return React.createElement('div', { style: imgStyle });
}