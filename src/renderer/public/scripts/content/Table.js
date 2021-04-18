function Table(props) {
	return React.createElement(
		"div",
		null,
		React.createElement(
			"div",
			null,
			"Count : ",
			props.list.length
		),
		React.createElement(
			"div",
			null,
			props.list.map(function (map) {
				return React.createElement(
					"div",
					null,
					map.name
				);
			})
		)
	);
}