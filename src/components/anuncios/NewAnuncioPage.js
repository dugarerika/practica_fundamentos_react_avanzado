import React from 'react';
import Layout from '../layout';
import {
	AnuncioInput,
	Button,
	FormCheckboxes
} from '../shared/index';
import { createAnuncio } from '../../API/anuncios';

class NewAnuncioPage extends React.Component {
	state = {
		form: {
			name: '',
			price: '',
			sale: false,
			photo: 'default-photo.jpg',
			tags: []
		}
	};

	handleSubmit = async (event) => {
		const formData = new FormData();
		const { history } = this.props;
		const { form: credentials } = this.state;
		event.preventDefault();
		formData.append('photo', credentials.photo.name);
		formData.append('name', credentials.name);
		formData.append('price', credentials.price);
		formData.append('sale', credentials.sale);
		credentials.tags.map((tag) =>
			formData.append('tags', tag)
		);
		try {
			const createdAnuncio = await createAnuncio(formData);
			history.push(`/anuncio/${createdAnuncio.result._id}`);
		} catch (error) {}
	};

	handleCheck = (event) => {
		const { form: { tags } } = this.state;
		const target = event.target;
		const value = target.value;
		if (target.checked) {
			this.setState((state) => ({
				form: { ...state.form, tags: tags.concat(value) }
			}));
		}
		else {
			this.setState((state) => ({
				form: {
					...state.form,
					tags: tags.filter((item) => item !== value)
				}
			}));
		}
	};

	handleImage = (event) => {
		try {
			this.setState((state) => ({
				form: {
					...state.form,
					photo: event.target.files[0]
				}
			}));
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = async (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState((state) => ({
			form: { ...state.form, [name]: value }
		}));
	};

	couldSubmit = () => {
		const { form: { name, price, sale } } = this.state;
		return name && price && sale;
	};

	render() {
		const { form: { name, price } } = this.state;
		return (
			<Layout title='Crea un nuevo anuncio'>
				<div className='form-new-anuncio'>
					<form onSubmit={this.handleSubmit}>
						<AnuncioInput
							className='input-new-anuncio'
							name='name'
							label='name'
							type='text'
							value={name}
							onChange={this.handleChange}
						/>
						<div
							className='radio-input-new-anuncio'
							onChange={this.handleChange}>
							<input
								type='radio'
								value={false}
								name='sale'
							/>{' '}
							Compra
							<input
								type='radio'
								value={true}
								name='sale'
							/>{' '}
							Venta
							<input
								type='radio'
								value=''
								name='sale'
							/>{' '}
							Ambos
						</div>
						<AnuncioInput
							className='input-new-anuncio'
							name='photo'
							type='file'
							label='Foto'
							onChange={this.handleImage}
						/>
						<div>
							<AnuncioInput
								min={0}
								className='input-new-anuncio'
								name='price'
								type='number'
								label='price €  Euro '
								value={price}
								onChange={this.handleChange}
							/>
						</div>
						<div className='checkboxs-new-anuncio '>
							<FormCheckboxes
								className='checkbox-input-new-anuncio'
								name='tags'
								label='tags'
								onChange={this.handleCheck}
							/>
						</div>
						<div id='loweranuncio'>
							<Button
								type='submit'
								disabled={!this.couldSubmit()}>
								Crear
							</Button>
						</div>
					</form>
				</div>
			</Layout>
		);
	}
}

export default NewAnuncioPage;
