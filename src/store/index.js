import { combineReducers, createStore } from 'redux';
import { auth, anuncios } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
const reducer = combineReducers({ auth, anuncios });

export function configureStore(preloadedState) {
	const store = createStore(
		reducer,
		preloadedState,
		composeWithDevTools()
	);
	return store;
}
