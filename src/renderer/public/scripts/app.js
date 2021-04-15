var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function App(props) {
	// Define the makeStyles function
	this.makeStyles = function (css) {
		var colors = css.colors;

		var styleContainer = {
			width: '100%',
			height: '100%',
			background: colors.background
		};
		Object.assign(styleContainer, css.flexColumn);

		var styleContainer2 = {
			width: 'calc(100% - 200px)',
			height: '100%'
		};

		return {
			styleContainer: styleContainer,
			styleContainer2: styleContainer2
		};
	};
	// Make css

	var _makeStyles = this.makeStyles(config.css),
	    styleContainer = _makeStyles.styleContainer,
	    styleContainer2 = _makeStyles.styleContainer2;

	// Define React state


	var _React$useState = React.useState(config.states.LIST),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    state = _React$useState2[0],
	    setState = _React$useState2[1];

	setTimeout(function () {
		setState((state + 1) % config.TOTAL_STATES);
	}, 2000);

	// Renderer
	return React.createElement(
		'div',
		{ style: styleContainer },
		React.createElement(
			'div',
			{ style: styleContainer2 },
			React.createElement(Header, { state: state }),
			React.createElement(Content, null)
		)
	);
}

// Add ReactApp to DOM
var domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(App, null), domContainer);