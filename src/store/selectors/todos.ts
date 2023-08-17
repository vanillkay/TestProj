import {createSelector} from 'reselect';

import {RootState} from '@store';

const selectTodosStore = (store: RootState) => store.todos;

export const selectTodos = createSelector(
  [selectTodosStore],
  store => store.todos,
);

export const selectTodosFilters = createSelector(
  [selectTodosStore],
  store => store.filters,
);
