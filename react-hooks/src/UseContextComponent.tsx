import { useState, useContext } from "react";
import UserContext, { UserState } from "./store";

const ConsumerComponent = (): JSX.Element | null => {
  const user = useContext<UserState>(UserContext);

  return (
    <div>
      <div>First: {user.first}</div>
      <div>Last: {user.last}</div>
    </div>
  );
};

const UseContextComponent = (): JSX.Element | null => {
  const [user, userSet] = useState<UserState>({
    first: "First",
    last: "Last"
  });

  return (
    <UserContext.Provider value={user}>
      <ConsumerComponent />
      <button
        onClick={() =>
          userSet({
            first: "vfsasa",
            last: "afdfa"
          })
        }
      >
        Change context
      </button>
    </UserContext.Provider>
  );
};

export default UseContextComponent;
