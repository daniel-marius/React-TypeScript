import * as React from "react";
import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

import { Store } from "../store/types";
import { deleteTodo, toggleTodo, updateTodo } from "../store/actions";

const TodoListItems = (): JSX.Element => {
  const todos = useSelector((state: Store) => state.todos);
  const dispatch = useDispatch();

  const renderTodos = (): JSX.Element => {
    return (
      <div>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Flex pt={2} key={todo.id}>
              <Checkbox onClick={() => dispatch(toggleTodo(todo.id))} />
              <Input
                mx={2}
                value={todo.text}
                onChange={evt =>
                  dispatch(updateTodo(todo.id, evt.target.value))
                }
              />
              <Button onClick={() => dispatch(deleteTodo(todo.id))}>
                Delete
              </Button>
            </Flex>
          ))
        ) : (
          <div>No Elements!</div>
        )}
      </div>
    );
  };

  return <div>{renderTodos()}</div>;
};

const TodoList = (): JSX.Element => {
  return (
    <div>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </div>
  );
};

export default TodoList;
