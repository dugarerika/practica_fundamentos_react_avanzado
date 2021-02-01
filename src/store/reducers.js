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
			return {
				...state,
				anuncios: [
					...state.anuncios,
					action.payload.anuncio
				]
			};
		case types.ANUNCIOS_DELETED:
			return state;
		default:
			return state;
	}
};

export default reducer;
