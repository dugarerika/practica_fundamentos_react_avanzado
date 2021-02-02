import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLoggedUser } from '../../store/selectors';

const ProtectedRoute = ({ loggedUser, ...props }) =>

		loggedUser ? <Route {...props} /> :
		<Redirect to='/login' />;

export default connect((state) => ({
	loggedUser: getLoggedUser(state)
}))(ProtectedRoute);
