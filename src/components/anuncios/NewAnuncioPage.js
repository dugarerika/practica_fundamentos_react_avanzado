import React from 'react';
import Layout from '../layout';
import {
	AnuncioInput,
	Button,
	FormCheckboxes
} from '../shared/index';
import { createAnuncio } from '../../API/anuncios';
import useNewAnuncio from '../../hooks/useNewAnuncio';

function NewAnuncioPage({ history }) {
	const [
		form,
		onChange,
		onCheck,
		onImage
	] = useNewAnuncio({
		name: '',
		price: '',
		sale: false,
		photo: 'default-photo.jpg',
		tags: []
	});

	const { name, price, sale, tags } = form;

	const handleSubmit = async (event) => {
		const formData = new FormData();
		const credentials = form;
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
			const resultado = createdAnuncio.result;

			console.log(resultado._id);
			history.push(`/anuncio/${resultado._id}`);
		} catch (error) {}
	};

	const couldSubmit = () => {
		return name && price && sale;
	};

	return (
		<Layout title='Crea un nuevo anuncio'>
			<div className='form-new-anuncio'>
				<form onSubmit={handleSubmit}>
					<AnuncioInput
						className='input-new-anuncio'
						name='name'
						label='name'
						type='text'
						value={name}
						onChange={onChange}
					/>
					<div
						className='radio-input-new-anuncio'
						onChange={onChange}>
						<input type='radio' value={false} name='sale' />
						Compra
						<input type='radio' value={true} name='sale' />
						Venta
					</div>
					<AnuncioInput
						className='input-new-anuncio'
						name='photo'
						type='file'
						label='Foto'
						onChange={onImage}
					/>
					<div>
						<AnuncioInput
							min={0}
							className='input-new-anuncio'
							name='price'
							type='number'
							label='price €  Euro '
							value={price}
							onChange={onChange}
						/>
					</div>
					<div className='checkboxs-new-anuncio '>
						<FormCheckboxes
							className='checkbox-input-new-anuncio'
							name='tags'
							onChange={onCheck}
							value={tags}
						/>
					</div>
					<div id='loweranuncio'>
						<Button type='submit' disabled={!couldSubmit()}>
							Crear
						</Button>
					</div>
				</form>
			</div>
		</Layout>
	);
}

export default NewAnuncioPage;
