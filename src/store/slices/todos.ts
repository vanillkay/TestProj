import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Todo} from '@types';
import {Filter} from '@components/TodosFilters/types';

interface TodosData {
  todos: Todo[];
  filters: Filter[];
}

const initialState: TodosData = {
  todos: [],
  filters: [],
};

const todosReducer = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, {payload}: PayloadAction<Todo[]>) {
      state.todos = payload;
    },

    addTodo(state, {payload}: PayloadAction<string>) {
      state.todos = [
        {title: payload, isCompleted: false, id: uuidv4()},
        ...state.todos,
      ];
    },

    removeTodo(state, {payload}: PayloadAction<string>) {
      state.todos = state.todos.filter(({id}) => id !== payload);
    },

    completeTodo(state, {payload}: PayloadAction<string>) {
      state.todos = state.todos.map(todo =>
        todo.id === payload
          ? {...todo, isCompleted: true, completedTimestamp: Date.now()}
          : todo,
      );
    },

    addFilter(state, {payload}: PayloadAction<Filter>) {
      state.filters = [...state.filters, payload];
    },

    removeFilter(state, {payload}: PayloadAction<Filter>) {
      state.filters = state.filters.filter(filter => filter !== payload);
    },
  },
});

export const {
  setTodos,
  addTodo,
  completeTodo,
  removeTodo,
  addFilter,
  removeFilter,
} = todosReducer.actions;
export default todosReducer.reducer;
