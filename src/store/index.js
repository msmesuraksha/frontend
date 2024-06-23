// import { createStore, applyMiddleware, compose } from "redux";
// import createSagaMiddleware from "redux-saga";
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// import rootReducer from "./reducers";
// import rootSaga from "./sagas";

// const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const persistConfig = {
//   key: 'root',
//   storage,
//   // Add any additional configuration options as needed
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   persistedReducer,
//   composeEnhancers(applyMiddleware(sagaMiddleware))
// );

// const persistor = persistStore(store);

// sagaMiddleware.run(rootSaga);

// export { store, persistor };













import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

// Check if we are in production mode
const isProduction = process.env.NODE_ENV === "production";

// Use Redux DevTools compose enhancer only in development
const composeEnhancers = !isProduction && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

// Create the store with middleware
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;

