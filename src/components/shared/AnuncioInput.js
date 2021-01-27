import React from 'react';
import T from 'prop-types';
import classNames from 'classnames';
import './FormInput.css';

class AnuncioInput extends React.Component {
	state = {
		focus: false,
		value: '',
		selected: false
	};

	handleFocus = (ev) => {
		const { onFocus } = this.props;
		this.setState({ focus: true });
		if (onFocus) onFocus(ev);
	};
	handleBlur = (ev) => {
		const { onBlur } = this.props;
		this.setState({ focus: false });
		if (onBlur) onBlur(ev);
	};

	render() {
		const { className, label, ...props } = this.props;
		const { focus } = this.state;
		return (
			<div className={classNames({ 'formInput--focused': focus }, className)}>
				<label className='formInput-label'>
					<span>{label}</span>
				</label>
				<input
					className='formInput-input'
					{...props}
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					autoComplete='off'
					label={label}
				/>
			</div>
		);
	}
}
AnuncioInput.propTypes = {
	className: T.string,
	label: T.string.isRequired,
	onFocus: T.func,
	onBlur: T.func
};
export default AnuncioInput;
