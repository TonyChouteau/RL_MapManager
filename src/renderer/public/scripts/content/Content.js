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
				return React.createElement(
					'div',
					null,
					'Table'
				);

			case config.states.IMPORT:
				return React.createElement(Import, { onMapImport: props.onMapImport });

			case config.states.SETTINGS:
				return React.createElement(Settings, {
					appFolder: props.appFolder,
					gameFolder: props.gameFolder,
					onAppFolderEdit: props.onAppFolderEdit,
					onGameFolderEdit: props.onGameFolderEdit
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