import * as React from "react";

// Base generic Todo
export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function updateTodo<T extends Todo>(todos: T[], newTodo: T): T[] {
  return todos.map(todo => (todo.id === newTodo.id ? newTodo : todo));
}

function toggleTodo<T extends { id: number; done: boolean }>(
  todos: T[],
  id: number
): T[] {
  return todos.map(todo => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done
  }));
}

function removeTodo<T extends { id: number }>(todos: T[], id: number): T[] {
  return todos.filter(todo => todo.id !== id);
}

function addTodo<T extends Todo>(todos: T[], newObject: T): T[] {
  return [
    ...todos,
    {
      ...newObject,
      id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
      done: false
    }
  ];
}

// Custom hook implementation
export function createTodoContext<T extends Todo>() {
  const useTodos = (initial: T[]) => {
    const [todos, setTodos] = React.useState<T[]>(initial);

    return {
      todos,
      addTodo(newTodo: T) {
        setTodos(tl => addTodo(tl, newTodo));
      },
      updateTodo(newTodo: T) {
        setTodos(tl => updateTodo(tl, newTodo));
      },
      removeTodo(id: number) {
        setTodos(tl => removeTodo(tl, id));
      },
      toggleTodo(id: number) {
        setTodos(tl => toggleTodo(tl, id));
      },
      load(inTodos: T[]) {
        setTodos(inTodos);
      }
    };
  };

  const TodoContext = React.createContext<ReturnType<typeof useTodos> | null>(
    null
  );

  return {
    useTodoContext: () => React.useContext(TodoContext)!,
    TodosProvider: ({ children }: { children: React.ReactNode }) => (
      <TodoContext.Provider value={useTodos([])}>
        {children}
      </TodoContext.Provider>
    )
  };
}
