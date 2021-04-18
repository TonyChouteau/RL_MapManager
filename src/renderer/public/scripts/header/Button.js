var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function Button(props) {
	// Define button state
	var _React$useState = React.useState(false),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    hover = _React$useState2[0],
	    setHover = _React$useState2[1];

	// Define the makeStyles function


	function makeStyles(css) {
		var buttonStyle = {
			padding: '10px',
			background: props.background || 'transparent',
			transition: 'all 0.2s 0s',
			cursor: 'pointer'
		};

		if (hover) {
			Object.assign(buttonStyle, props.hoverStyle || {
				filter: 'brightness(75%)'
			});
		}

		return { buttonStyle: buttonStyle };
	}

	var _makeStyles = makeStyles(config.css),
	    buttonStyle = _makeStyles.buttonStyle;

	function handleHover(state) {
		setHover(state);
	}

	// Renderer
	return React.createElement(
		'div',
		{
			style: buttonStyle,
			onClick: props.onClick,
			onMouseEnter: function onMouseEnter() {
				handleHover(true);
			},
			onMouseLeave: function onMouseLeave() {
				handleHover(false);
			},
			onMouseMove: function onMouseMove() {
				handleHover(true);
			}
		},
		props.children
	);
}