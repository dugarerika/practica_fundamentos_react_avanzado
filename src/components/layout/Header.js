import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import classNames from 'classnames';
import './Header.css';
import { Link } from 'react-router-dom';
import Button from '../shared/Button';
import { ReactComponent as Icon } from '../images/shopping-cart.svg';
import { logout } from '../../API/auth';
import { getLoggedUser } from '../../store/selectors';
import { authLogout } from '../../store/actions';

const Header = ({ className, ...props }) => {
	const loggedUser = useSelector(getLoggedUser);
	const dispatch = useDispatch();
	const onLogout = () => dispatch(authLogout());
	return (
		<header
			className={classNames('header', className)}
			{...props}>
			<div className='header-logo'>
				{<Icon width='32' height='32' />}
			</div>
			<nav className='header-nav-anuncio'>
				<Button
					as={Link}
					to='/'
					variant='primary'
					className='header-button'>
					Anuncios
				</Button>
				<Button
					as={Link}
					to='/anuncio/new'
					variant='primary'
					className='header-button'>
					Nuevo Anuncio
				</Button>
			</nav>
			<nav className='header-nav'>
				{
					loggedUser ? <Button
						as={Link}
						to='/login'
						className='header-button'
						onClick={() => logout().then(onLogout)}>
						Logout
					</Button> :
					<Button
						as={Link}
						to='/login'
						className='header-button'>
						Login
					</Button>}
			</nav>
		</header>
	);
};

export default Header;
