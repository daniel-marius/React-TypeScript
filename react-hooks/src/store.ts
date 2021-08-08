import React, { createContext } from "react";

interface IState {
  first: string;
  last: string;
}

const initialState: IState = {
  first: "First",
  last: "Last"
};

export type UserState = typeof initialState;

const context: React.Context<IState> = createContext<typeof initialState>(
  initialState
);

export default context;
