import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import createCompressor from 'redux-persist-transform-compress'
import reducer from './AppState'
import setHeaderLink from './SetHeaderLink'

const compressor = createCompressor()

const persistConfig = {
    key: 'root',
    storage,
    transforms: [compressor],
}

const initialState = {}
const logger = createLogger()

const rootReducer = combineReducers({
    app: reducer,
    filter: setHeaderLink,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose

const enhancer = composeEnhancers(
    applyMiddleware(logger)
    // other store enhancers if any
)

// const store = createStore(rootReducer, initialState, enhancer); develop only
export const store = createStore(persistedReducer, initialState, enhancer)
export const persistor = persistStore(store)
// export default store
