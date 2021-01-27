import React from 'react';
import { AnuncioInput, FormCheckboxes } from '../shared/index';
import '../anuncios/Filtro.css';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import { getFilterAnuncios } from '../../API/anuncios';
import Slider from 'rc-slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class Filtro extends React.Component {
	state = {
		query: {
			name: '',
			price: [
				0,
				0
			],
			sale: '',
			tags: []
		}
	};

	axiosParams = (credentials) => {
		const params = new URLSearchParams();


			credentials.price !==
			[
				0,
				0
			] ? params.append(
				'price',
				`${credentials.price[0]}-${credentials.price[1]}`
			) :
			params.append('price', 0);
		credentials.name !== '' && params.append('name', credentials.name);
		credentials.sale !== '' && params.append('sale', credentials.sale);
		credentials.tags.length !== 0 && params.append('tags', credentials.tags);
		console.log(`${credentials.price[0]}-${credentials.price[1]}`);
		return params;
	};

	handleSubmit = async (event) => {
		const { onfilter, history } = this.props;
		const { query: credentials } = this.state;
		event.preventDefault();
		console.log(credentials);
		const filter = this.axiosParams(credentials);

		try {
			const generatedAnuncios = await getFilterAnuncios(filter);
			console.log(generatedAnuncios.results);
			onfilter(generatedAnuncios, () => history.push('/anuncios'));
		} catch (error) {
			console.log('memandaron al error');
		}
	};

	handleSlider = (event) => {
		console.log(event);
		this.setState((state) => ({
			query: { ...state.query, price: event }
		}));
	};

	handleChange = async (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState((state) => ({
			query: { ...state.query, [name]: value }
		}));
	};

	handleCheck = (event) => {
		const { query: { tags } } = this.state;
		const target = event.target;
		const value = target.value;

		if (target.checked) {
			this.setState((state) => ({
				query: { ...state.query, tags: tags.concat(value) }
			}));
		}
		else {
			this.setState((state) => ({
				query: { ...state.query, tags: tags.filter((item) => item !== value) }
			}));
		}
		console.log(tags);
	};

	render() {
		const { query: { name, price } } = this.state;
		return (
			<div>
				<form
					className='container-consultar-anuncio'
					onSubmit={this.handleSubmit}>
					Filtrar Anuncios
					<div className='input-consulta-name'>
						<AnuncioInput
							className='input-new-anuncio'
							name='name'
							label='name'
							type='text'
							value={name}
							onChange={this.handleChange}
						/>
					</div>
					<div className='radio-input-new-anuncio' onChange={this.handleChange}>
						<input type='radio' value={false} name='sale' /> Compra
						<input type='radio' value={true} name='sale' /> Venta
					</div>
					<div className='input-consulta-price'>
						{price[0]} - {price[1]}
						<Range
							min={0}
							max={1000}
							onChange={this.handleSlider}
							defaultValue={price}
							tipFormatter={(value) => (
								<span className='tooltip'>{value}€</span>
							)}
						/>
					</div>
					<div className='checkboxs-consulta-anuncio'>
						<FormCheckboxes
							className='checkbox-input-new-anuncio'
							name='tags'
							label='tags'
							onChange={this.handleCheck}
						/>
					</div>
					<div id='lowerconsultaanuncio'>
						<button type='submit' className='consulta-anuncio-button'>
							consultar
						</button>
					</div>
				</form>
			</div>
		);
	}
}

export default Filtro;
