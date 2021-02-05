import AnunciosPage from '../anuncios/AnunciosPage';
import LoginPage from '../auth/LoginPage';
import Tags from '../anuncios/Tags';
import T from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';
import AnuncioPage from '../anuncios/AnuncioPage';
import NewAnuncioPage from '../anuncios/NewAnuncioPage';
import ProtectedRoute from '../auth/ProtectedRoute';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path='/' exact component={AnunciosPage} />
				<Route
					path='/anuncios/tags'
					exact
					component={Tags}
				/>
				<Route
					path='/anuncios'
					exact
					component={AnunciosPage}
				/>
				<ProtectedRoute path='/anuncio/new' exact>
					{({ history }) => (
						<NewAnuncioPage history={history} />
					)}
				</ProtectedRoute>
				<Route
					path='/anuncio/:anuncioID'
					exact
					component={AnuncioPage}
				/>
				<Route path='/login' exact>
					{({ history }) => <LoginPage history={history} />}
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
	);
}

App.propTypes = {
	initialLogged: T.bool
};

export default App;
