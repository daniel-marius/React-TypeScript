import ReactDOM from "react-dom";

// import GuestList from "./state/GuestList";
import UserSearch from "./state/UserSearch";

const App = (): JSX.Element => {
	return (
		<div>
			<UserSearch />
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));