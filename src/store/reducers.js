import * as types from './types';
const initialState = { auth: null, anuncios: null };

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.AUTH_LOGIN:
			//login
			//return Object.assign({}, state,{auth:action.payload.loggedUser})
			return { ...state, auth: action.payload.loggedUser };

		case types.AUTH_LOGOUT:
			//logout
			return { ...state, auth: null };
		case types.ANUNCIOS_CREATED:
			if (!state.anuncios) {
				return {
					...state,
					anuncios: [
						action.payload.anuncio
					]
				};
			}
			return {
				...state,
				anuncios: state.anuncios.concat(
					action.payload.anuncio
				)
			};
		case types.ANUNCIOS_DELETED:
			if (!state.anuncios) {
				return {
					...state,
					anuncios: [
						action.payload.anuncio
					]
				};
			}
			return {
				...state,
				anuncios: state.anuncios.filter(
					action.payload.anuncio
				)
			};
		default:
			return state;
	}
};

export default reducer;
