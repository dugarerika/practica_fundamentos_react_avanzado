import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import storage from './utils/storage';
import { configuraClient } from './API/client';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './store';

const auth = storage.get('auth') || {
	ok: false,
	token: null
};

configuraClient(auth.token);

const store = configureStore();
console.log(store);

const Root = ({ children }) => {};
ReactDOM.render(
	<BrowserRouter>
		<App initialLogged={auth.ok} />
	</BrowserRouter>,
	document.getElementById('root')
);
