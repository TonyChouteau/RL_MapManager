var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function App(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		var colors = css.colors;

		var styleContainer = {
			width: '100%',
			height: '100%',
			background: colors.background
		};
		Object.assign(styleContainer, css.flexColumn, css.flexCenter);

		var styleContainer2 = {
			width: 'calc(100% - 200px)',
			height: '100%'
		};
		Object.assign(styleContainer2, css.flexCenter);

		return {
			styleContainer: styleContainer,
			styleContainer2: styleContainer2
		};
	}
	// Make css

	var _makeStyles = makeStyles(config.css),
	    styleContainer = _makeStyles.styleContainer,
	    styleContainer2 = _makeStyles.styleContainer2;

	// Define React state


	var _React$useState = React.useState(config.states.LIST),
	    _React$useState2 = _slicedToArray(_React$useState, 2),
	    state = _React$useState2[0],
	    setState = _React$useState2[1];

	function handleStateChange(state) {
		setState(state);
	}

	var _React$useState3 = React.useState('Not defined'),
	    _React$useState4 = _slicedToArray(_React$useState3, 2),
	    appFolder = _React$useState4[0],
	    setAppFolder = _React$useState4[1];

	handler.getAppPath(function (path) {
		if (path !== appFolder) {
			setAppFolder(path);
		}
	});

	var _React$useState5 = React.useState(null),
	    _React$useState6 = _slicedToArray(_React$useState5, 2),
	    gameFolder = _React$useState6[0],
	    setGameFolder = _React$useState6[1];

	handler.getGamePath(function (path) {
		if (path !== gameFolder) {
			setGameFolder(path);
		}
	});

	var _React$useState7 = React.useState([]),
	    _React$useState8 = _slicedToArray(_React$useState7, 2),
	    list = _React$useState8[0],
	    setList = _React$useState8[1];

	// Renderer


	return React.createElement(
		'div',
		{ style: styleContainer },
		React.createElement(
			'div',
			{ style: styleContainer2 },
			React.createElement(Header, { state: state, size: config.css.iconSize, handleStateChange: handleStateChange }),
			React.createElement(Content, {
				state: state,
				list: list
				// Settings
				, appFolder: appFolder,
				gameFolder: gameFolder
			})
		)
	);
}

// Add ReactApp to DOM
var domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(App, null), domContainer);