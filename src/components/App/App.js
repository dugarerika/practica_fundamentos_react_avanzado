import React, { useState } from 'react';
import AnunciosPage from '../anuncios/AnunciosPage';
import LoginPage from '../auth/LoginPage';
import Tags from '../anuncios/Tags';
import T from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import AnuncioPage from '../anuncios/AnuncioPage';
import NewAnuncioPage from '../anuncios/NewAnuncioPage';
import ProtectedRoute from '../auth/ProtectedRouter';
import { AuthContextProvider } from '../auth/context';
import * as actions from '../../store/actions';
function App({ dispatch, loggedUser }) {
	const handleLogin = (loggedUser) =>
		new Promise((resolve) => {
			dispatch(actions.authLogin(loggedUser));
			resolve();
		});
	const handleLogout = () => dispatch(actions.authLogout());

	return (
		<AuthContextProvider
			value={{
				isLogged: loggedUser,
				onLogin: handleLogin,
				onLogout: handleLogout
			}}>
			<div className='App'>
				<Switch>
					<Route path='/' exact>
						{({ history }) => (
							<AnunciosPage history={history} />
						)}
					</Route>
					<ProtectedRoute
						path='/anuncios/tags'
						exact
						component={Tags}
					/>
					<ProtectedRoute
						path='/anuncios'
						exact
						component={AnunciosPage}
					/>
					<ProtectedRoute
						path='/anuncio/new'
						exact
						component={NewAnuncioPage}
					/>
					<ProtectedRoute
						path='/anuncio/:anuncioID'
						exact
						component={AnuncioPage}
					/>
					<Route path='/login' exact>
						{({ history }) => (
							<LoginPage
								onLogin={handleLogin}
								history={history}
							/>
						)}
					</Route>
					<Route path='/404' exact>
						<div
							style={{
								textAlign: 'center',
								fontSize: 48,
								fontWeight: 3
							}}>
							404 Not Found
						</div>
					</Route>
					<Route>
						<Redirect to='/404' />
					</Route>
				</Switch>
			</div>
		</AuthContextProvider>
	);
}

App.propTypes = {
	initialLogged: T.bool
};

export default App;
