import React from 'react';
import {
	deleteDetalleAnuncio,
	getDetalleAnuncio
} from '../../API/anuncios';
import Layout from '../layout/Layout';
import Anuncio from '../anuncios/Anuncio';
import Imagen from '../shared/Imagen';
import './Anuncio.css';
import ConfirmButton from '../shared/ConfirmButton';
import Container from '../shared/Container';
import withDataLoad from '../../hocs/withDataLoads';

class AnuncioPage extends React.Component {
	deleteDetalle = () => {
		const { history } = this.props;
		const { anuncioID } = this.props.match.params;
		deleteDetalleAnuncio(anuncioID)
			.then(() => history.push('/'))
			.catch((error) => this.setState({ error }));
	};

	renderContent() {
		const { history } = this.props;
		const { data: anuncio } = this.props;
		return (
			<div className='anuncio'>
				<div className='left'>
					<Imagen src={anuncio.data.result.photo} />
				</div>
				<Anuncio
					key={anuncio.data._id}
					anuncio={anuncio.data.result}
					history={history}
				/>
			</div>
		);
	}

	render() {
		return (
			<Layout title='Anuncio Detalle'>
				<div className='AnuncioPage'>
					{this.renderContent()}
				</div>
				<Container>
					<ConfirmButton
						name='delete'
						label='Delete'
						question='Esta Seguro?'
						onClick={this.deleteDetalle}
					/>
				</Container>
			</Layout>
		);
	}
}

const AnuncioPageWithDataLoad = withDataLoad(
	AnuncioPage,
	(props) => getDetalleAnuncio(props.match.params.anuncioID)
);
export default AnuncioPageWithDataLoad;
