function Content(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		var contentStyle = {
			width: '100%',
			height: 'calc(100% - ' + css.headerHeight + ')'
		};

		return { contentStyle: contentStyle };
	}
	// Make css

	var _makeStyles = makeStyles(config.css),
	    contentStyle = _makeStyles.contentStyle;

	// Make content


	function MakeContent() {
		switch (props.state) {
			case config.states.LIST:
				return React.createElement(Table, { list: props.list, selected: props.selected, active: props.active });

			case config.states.IMPORT:
				return React.createElement(Import, { count: props.list.length });

			case config.states.SETTINGS:
				return React.createElement(Settings, {
					appFolder: props.appFolder,
					gameFolder: props.gameFolder
				});
		}
	}

	//Renderer
	return React.createElement(
		'div',
		{ style: contentStyle },
		React.createElement(MakeContent, null)
	);
}