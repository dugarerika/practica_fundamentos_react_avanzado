import React from 'react';
import './LoginPage.css';
import Button from '../shared/Button';
import FormInput from '../shared/FormInput';
import { login } from '../../API/auth';
import T from 'prop-types';

class LoginPage extends React.Component {
	state = {
		form: {
			email: '',
			password: '',
			RememberMe: false
		},
		submmiting: false,
		error: null
	};

	handleSubmit = async (event) => {
		const { onLogin, history } = this.props;
		const { form: credentials } = this.state;

		event.preventDefault();
		console.log(event);
		console.log(credentials);
		this.setState({ submmiting: true });

		try {
			const info = await login(credentials);
			const loggedUser = info.ok;
			console.log(loggedUser);
			this.setState({ submmiting: false, error: null });
			if (info.ok === false) throw info.error;
			onLogin(loggedUser, () => history.push('/anuncios'));
		} catch (error) {
			console.log('memandaron al error');
			this.setState({ submmiting: false, error });
		}
	};

	handleCheck = (event) => {
		console.log(event.target);
		const target = event.target;
		const value = target.checked;
		const name = target.name;

		this.setState((state) => ({
			form: { ...state.form, [name]: value }
		}));
	};

	handleChange = (event) => {
		console.log(event.target.value);
		this.setState((state) => ({
			form: { ...state.form, [event.target.name]: event.target.value }
		}));
	};

	couldSubmit = () => {
		const { form: { email, password }, submmiting } = this.state;
		return !submmiting && email && password;
	};

	componentWillUnmount() {
		console.log('componentWillUnmount');
	}

	render() {
		const { form: { email, password }, error } = this.state;

		return (
			<div className='container'>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						name='email'
						type='text'
						label='phone, email or username'
						className='loginPage-field'
						value={email}
						onChange={this.handleChange}
					/>
					<FormInput
						name='password'
						type='password'
						label='password'
						value={password}
						className='loginPage-field'
						onChange={this.handleChange}
					/>
					<div id='lower'>
						<div className='loginPage-checkbox'>
							<input
								type='checkbox'
								name='RememberMe'
								onChange={this.handleCheck}
								checked={this.state.RememberMe}
							/>
							<label>Remember me</label>
						</div>
						<Button
							type='submit'
							className='loginPage-submit'
							variant='primary'
							disabled={!this.couldSubmit()}>
							Log In
						</Button>
						{error && <div className='loginPage-error'>{error}</div>}
					</div>
				</form>
			</div>
		);
	}
}

LoginPage.propTypes = { onLogin: T.func.isRequired };
export default LoginPage;
