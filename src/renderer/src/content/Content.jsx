function Content(props) {
	// Define the makeStyles function
	function makeStyles(css) {
		let contentStyle = {
			width: '100%',
			height: 'calc(100% - ' + css.headerHeight + ')',
		};

		return { contentStyle };
	}
	// Make css
	let { contentStyle } = makeStyles(config.css);

	// Make content
	function MakeContent() {
		switch (props.state) {
			case config.states.LIST:
				return <div>Table</div>;

			case config.states.IMPORT:
				return <Import onMapImport={props.onMapImport} />;

			case config.states.SETTINGS:
				return (
					<Settings
						appFolder={props.appFolder}
						gameFolder={props.gameFolder}
						onAppFolderEdit={props.onAppFolderEdit}
						onGameFolderEdit={props.onGameFolderEdit}
					/>
				);
		}
	}

	//Renderer
	return (
		<div style={contentStyle}>
			<MakeContent />
		</div>
	);
}
