import client from './client';

import storage from '../utils/storage';

export const login = (credentials) =>
	client.login(credentials).then((auth) => {
		const Remember = credentials.RememberMe;
		const { ok, token } = auth;
		if (Remember === true) {
			storage.set('auth', { ok, token });
		}
		return auth;
	});

export const logout = () =>
	client.logout().then(() => {
		storage.remove('auth');
	});

export const create = () =>
	client.create().then(() => {
		storage.add('auth');
	});
