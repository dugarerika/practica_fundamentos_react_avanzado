import * as types from './types';
const initialState = { auth: null, anuncios: null };

export const auth = (state = initialState.auth, action) => {
	switch (action.type) {
		case types.AUTH_LOGIN:
			return action.payload.loggedUser;

		case types.AUTH_LOGOUT:
			return null;

		default:
			return state;
	}
};

export const anuncios = (
	state = initialState.anuncios,
	action
) => {
	switch (action.type) {
		case types.ANUNCIOS_CREATED:
			if (!state) {
				return [
					action.payload.anuncio
				];
			}
			return state.concat(action.payload.anuncio);

		case types.ANUNCIOS_DELETED:
			if (!state) {
				return [
					action.payload.anuncio
				];
			}
			return state.filter(action.payload.anuncio);

		default:
			return state;
	}
};
