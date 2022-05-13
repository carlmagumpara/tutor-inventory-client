import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import appReducer from './reducers';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import logger from 'redux-logger';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    const { darkmode } = state
    state = { darkmode };
  }

  return appReducer(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    thunk,
    logger,
  ],
});

let persistor = persistStore(store);

export {
  store,
  persistor,
};