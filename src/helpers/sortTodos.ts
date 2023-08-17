import {Todo} from '@types';

export const sortTodos = (todos: Todo[]) =>
  [...todos].sort(
    (a, b) => (a.completedTimestamp ?? 0) - (b.completedTimestamp ?? 0),
  );
