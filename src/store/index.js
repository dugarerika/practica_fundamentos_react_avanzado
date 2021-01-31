import { createStore } from 'redux';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export function configureStore(preloadedState) {
	const store = createStore(
		reducer,
		preloadedState,
		composeWithDevTools()
	);
	return store;
}
