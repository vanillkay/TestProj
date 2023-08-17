import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';

import todosReducer from './slices/todos';

const TODO_REDUCERS_KEY = 'todos-reducer';

const persistConfig = {
  key: TODO_REDUCERS_KEY,
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, todosReducer);

export const store = configureStore({
  reducer: {
    todos: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export * from './selectors';
