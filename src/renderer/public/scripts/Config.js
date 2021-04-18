var config = {
	states: {
		LIST: 0,
		IMPORT: 1,
		SETTINGS: 2
	},
	statesName: ["SELECT", "IMPORT", "SETTINGS"],
	TOTAL_STATES: 3,
	css: {
		font: {
			title: "bold 25px Consolas"
		},
		colors: {
			text1: "#FFF",
			text2: "#999999",
			line1: "#5B5B5B",
			line2: "#4F4F4F",
			background: "#666666",
			button: "#767676",
			icon: "#f6b26b",
			switchOn: "#93c47d",
			switchOff: "#d73535"
		},
		flexColumn: {
			display: "flex",
			flexDirection: "column"
		},
		flexRow: {
			display: "flex",
			flexDirection: "row"
		},
		flexCenter: {
			justifyContent: "center",
			alignItems: "center"
		},
		flexLeft: {
			justifyContent: "start",
			alignItems: "center"
		},
		flexSpace: {
			justifyContent: "space-between",
			alignItems: "center"
		},
		headerHeight: "75px",
		iconSize: "25"
	},
	svg_path: "./images/icons/",
	icons: {
		ARROW: "arrow_icon.svg",
		EDIT: "edit_icon.svg",
		SETTINGS: "settings_icon.svg",
		ADD: "add_icon.svg"
	}
};