import type { StateCreator } from 'zustand';
import type { Todo } from "../types/config";

export interface TodoListStateSlice {
  todoList: Todo[];

  addTodo: (todo: Todo) => void;
  completedTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export const createTodoListSlice: StateCreator<
  TodoListStateSlice,
  [],
  [],
  TodoListStateSlice> = (set) => {
    return {
      todoList: [],
      addTodo: (todo: Todo) => {
        set((state: TodoListStateSlice) => ({ todoList: [...state.todoList, todo] }));
      },
      
      deleteTodo: (id: string) => {
        set((state: TodoListStateSlice) => ({ todoList: state.todoList.filter((t) => t.id !== id) }));
      },

      completedTodo: (id: string) => {
        set((state: TodoListStateSlice) => ({ todoList: state.todoList.map(t => t.id === id ? {...t, completed: !t.completed} : t) }));
      },

    }
  };
