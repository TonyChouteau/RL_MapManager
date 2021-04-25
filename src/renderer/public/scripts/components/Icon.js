function Icon(props) {
	// Define the makeStyles function
	function makeStyles() {
		var imgStyle = {
			verticalAlign: 'middle',
			width: props.size + 'px',
			height: +props.size + 5 + 'px',
			backgroundColor: props.color,
			mask: 'url(' + config.svg_path + props.icon + ') no-repeat center',
			WebkitMask: 'url(' + config.svg_path + props.icon + ') no-repeat center',
			transform: 'rotate(' + (props.rotate || 0) + 'deg)'
		};
		Object.assign(imgStyle, props.style);

		return { imgStyle: imgStyle };
	}

	// Make css

	var _makeStyles = makeStyles(),
	    imgStyle = _makeStyles.imgStyle;

	// Renderer


	return React.createElement('div', { style: imgStyle });
}