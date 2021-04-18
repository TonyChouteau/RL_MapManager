function Table(props) {
	return (
		<div>
			<div>Count : {props.list.length}</div>
			<div>
				{props.list.map((map, id) => {
					return <div key={id}>{map}</div>;
				})}
			</div>
		</div>
	);
}
