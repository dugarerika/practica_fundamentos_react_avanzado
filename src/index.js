import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { Root } from './components/App';
import storage from './utils/storage';
import { configuraClient } from './API/client';
import { configureStore } from './store';

const auth = storage.get('auth') || {
	ok: false,
	token: null
};

configuraClient(auth.token);

const store = configureStore({ auth: auth.ok });

const render = () => {
	ReactDOM.render(
		<Root>
			<App
				dispatch={store.dispatch}
				loggedUser={store.getState().auth}
			/>
		</Root>,
		document.getElementById('root')
	);
};

store.subscribe(render);
render();
