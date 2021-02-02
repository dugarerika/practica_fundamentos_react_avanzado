import React, { useState } from 'react';
import './LoginPage.css';
import Button from '../shared/Button';
import FormInput from '../shared/FormInput';
import { login } from '../../API/auth';
import T from 'prop-types';
import { connect } from 'react-redux';
import { authLogin } from '../../store/actions';
import useForm from '../../hooks/useForm';

function LoginPage({ onLogin, history }) {
	const [
		form,
		onChange,
		onCheck
	] = useForm({
		email: '',
		password: '',
		RememberMe: false
	});

	const [
		submmitting,
		setSubmitting
	] = useState(false);

	const [
		error,
		setError
	] = useState(null);

	const { email, password, RememberMe } = form;

	const handleSubmit = async (event) => {
		const credentials = form;
		event.preventDefault();
		setSubmitting(true);

		try {
			const info = await login(credentials);
			const loggedUser = info.ok;
			setError(null);
			if (info.ok === false) throw info.error;
			onLogin(loggedUser).then(() =>
				history.push('/anuncios')
			);
		} catch (error) {
			setError(error);
		} finally {
			setSubmitting(false);
		}
	};

	const couldSubmit = () => {
		return !submmitting && email && password;
	};

	return (
		<div className='container'>
			<form onSubmit={handleSubmit}>
				<FormInput
					name='email'
					type='text'
					label='phone, email or username'
					className='loginPage-field'
					value={email}
					onChange={onChange}
				/>
				<FormInput
					name='password'
					type='password'
					label='password'
					value={password}
					className='loginPage-field'
					onChange={onChange}
				/>
				<div id='lower'>
					<div className='loginPage-checkbox'>
						<input
							type='checkbox'
							name='RememberMe'
							onChange={onCheck}
							checked={RememberMe}
						/>
						<label>Remember me</label>
					</div>
					<Button
						type='submit'
						className='loginPage-submit'
						variant='primary'
						disabled={!couldSubmit()}>
						Log In
					</Button>
					{error && (
						<div className='loginPage-error'>{error}</div>
					)}
				</div>
			</form>
		</div>
	);
}

LoginPage.propTypes = { onLogin: T.func.isRequired };

export default connect(null, (dispatch) => ({
	onLogin: (loggedUser) =>
		new Promise((resolve) => {
			dispatch(authLogin(loggedUser));
			resolve();
		})
}))(LoginPage);
