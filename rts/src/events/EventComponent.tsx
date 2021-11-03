const EventComponent: React.FC = () => {
	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		console.log(event);
	};

	const onDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
		console.log(event);
	};

	return (
		<div>
			<input onChange={onChange} />
			<div draggable onDragStart={onDragStart}></div>
		</div>
	);
};

export default EventComponent;