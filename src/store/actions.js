import {
	AUTH_LOGIN,
	AUTH_LOGOUT,
	ANUNCIOS_CREATED,
	ANUNCIOS_DELETED
} from './types';
export const authLogin = (loggedUser) => {
	return { type: AUTH_LOGIN, payload: { loggedUser } };
};

export const authLogout = () => {
	return { type: AUTH_LOGOUT };
};

export const anunciosCreated = (anuncios) => {
	return {
		type: ANUNCIOS_CREATED,
		payload: { anuncios }
	};
};

export const anunciosDeleted = (anuncios) => {
	return {
		type: ANUNCIOS_DELETED,
		payload: { anuncios }
	};
};
