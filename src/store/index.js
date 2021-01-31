import { createStore } from 'redux';
import reducer from './reducers';

export function configureStore(preloadedState) {
	const store = createStore(
		reducer,
		preloadedState,
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	);
	return store;
}
