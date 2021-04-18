function Table(props) {
	return (
		<div>
			<div>Count : {props.list.length}</div>
			<div>
				{props.list.map((map) => {
					return <div>{map.name}</div>;
				})}
			</div>
		</div>
	);
}
