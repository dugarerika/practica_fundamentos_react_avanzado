import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, { Root } from './components/App';
import storage from './utils/storage';
import { configuraClient } from './API/client';
import { configureStore } from './store';
import { authLogin } from './store/actions';

const auth = storage.get('auth') || {
	ok: false,
	token: null
};

configuraClient(auth.token);

const store = configureStore();
console.log(store);
store.dispatch(authLogin('id'));
// console.log(store.getState());

ReactDOM.render(
	<Root>
		<App initialLogged={auth.ok} />
	</Root>,
	document.getElementById('root')
);
