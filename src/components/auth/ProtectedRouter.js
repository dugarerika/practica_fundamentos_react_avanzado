import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContextConsumer } from '../auth/context';

const ProtectedRouter = ({ isLogged, ...props }) =>

		isLogged ? <Route {...props} /> :
		<Redirect to='/login' />;

export const ConnectedToAuthHeaderPrivateRouter = (props) => (
	<AuthContextConsumer>
		{(value) => <ProtectedRouter {...props} isLogged={value.isLogged} />}
	</AuthContextConsumer>
);

export default ConnectedToAuthHeaderPrivateRouter;
