import { AUTH_LOGIN, AUTH_LOGOUT } from './types';
export const authLogin = () => {
	return { type: AUTH_LOGIN, payload: { loggedUser } };
};

export const authLogout = () => {
	return { type: AUTH_LOGOUT };
};
