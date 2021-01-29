import React from 'react';
import Filtro from '../anuncios/Filtro';
import { getFilterAnuncios } from '../../API/anuncios';
import withDataLoad from '../../hocs/withDataLoads';

// import Anuncio from '../anuncios/Anuncio';
import Layout from '../layout/Layout';
class AnunciosPage extends React.Component {
	handlefilter = (generatedAnuncios) =>
		this.setState({
			anuncios: generatedAnuncios
		});

	renderFiltro() {
		const { history } = this.props;

		return (
			<Filtro
				onfilter={this.handlefilter}
				history={history}
			/>
		);
	}

	renderContent() {
		// const { history } = this.props;
		const { data: anuncios } = this.props;
		console.log(anuncios.data);

		if (anuncios.length === 0) {
			return (
				<span className='mensaje'>
					No hay anuncios que cumplan con la busqueda
				</span>
			);
		}

		// return anuncios.map((anuncio) => (
		// 	<Anuncio
		// 		key={anuncio._id}
		// 		anuncio={anuncio}
		// 		history={history}
		// 	/>
		// ));
	}

	render() {
		return (
			<Layout title='Lista de Anuncios'>
				<div className='AnunciosPage'>
					{this.renderFiltro()}
				</div>
				<div className='AnunciosPage'>
					{this.renderContent()}
				</div>
			</Layout>
		);
	}
}

const config = {
	getData: (props) => getFilterAnuncios()
};

const withDataLoadConfigured = withDataLoad(config);

const AnunciosPageWithDataLoad = withDataLoadConfigured(
	AnunciosPage
);

export default AnunciosPageWithDataLoad;
