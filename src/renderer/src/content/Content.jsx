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
				return <Table list={props.list} selected={props.selected} active={props.active} gameFolder={props.gameFolder}></Table>;

			case config.states.IMPORT:
				return <Import count={props.list.length}/>;

			case config.states.SETTINGS:
				return (
					<Settings
						appFolder={props.appFolder}
						gameFolder={props.gameFolder}
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
