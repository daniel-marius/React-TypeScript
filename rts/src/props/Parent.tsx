import { ChildAsFC } from "./Child";

const Parent = (): JSX.Element => {
	return (
		<ChildAsFC color="red" onClick={() => console.log("Clicked") } >
			asdcasd
		</ChildAsFC>
	);
};

export default Parent;