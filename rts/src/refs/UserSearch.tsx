import { useState, useRef, useEffect } from "react";

interface IUser {
	name: string;
	age: number;
}

const users: IUser[] = [
	{ name: "a", age: 34 },
	{ name: "b", age: 45 }
];

const UserSearch: React.FC = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [name, setName] = useState<string>('');
	const [user, setUser] = useState<IUser | undefined>();

	useEffect(() => {
		// Type Guard
		if (!input.current) {
			return;
		}
		inputRef.current.focus();
	}, []);

	const onClick = (): void => {
		const foundUser: IUser | undefined = users.find((user) => {
			return user.name === name;
		});

		setUser(foundUser);
	};

	return (
		<div>
			User Search
			<input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
			<button onClick={onClick}>Find User</button>
			<div>
				{ user && user.name }
				{ user && user.age }
			</div>
		</div>
	);
};

export default UserSearch;