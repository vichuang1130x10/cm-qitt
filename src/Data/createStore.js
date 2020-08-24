import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import reducer from "./AppState";

const initialState = {};
const logger = createLogger();

const rootReducer = combineReducers({
  app: reducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(logger)
  // other store enhancers if any
);

// const store = createStore(rootReducer, initialState, enhancer); develop only
const store = createStore(rootReducer, initialState, enhancer);

export default store;
