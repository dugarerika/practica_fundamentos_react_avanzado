import React from 'react';
import { Redirect } from 'react-router-dom';
import { deleteDetalleAnuncio, getDetalleAnuncio } from '../../API/anuncios';
import Layout from '../layout/Layout';
import Anuncio from '../anuncios/Anuncio';
import Imagen from '../shared/Imagen';
import './Anuncio.css';
import ConfirmButton from '../shared/ConfirmButton';
import Container from '../shared/Container';

class AnuncioPage extends React.Component {
	state = {
		anuncio: null,
		error: null
	};

	deleteDetalle = () => {
		const { history } = this.props;
		const { anuncioID } = this.props.match.params;
		deleteDetalleAnuncio(anuncioID)
			.then(() => history.push('/'))
			.catch((error) => this.setState({ error }));
	};

	getDetalle = async () => {
		const { anuncioID } = this.props.match.params;
		getDetalleAnuncio(anuncioID)
			.then((anuncio) => this.setState({ anuncio }))
			.catch((error) => this.setState({ error }));
	};

	componentDidMount() {
		this.getDetalle();
	}

	renderContent() {
		const { history } = this.props;
		const { anuncio, error } = this.state;
		if (error) {
			return <Redirect to='/404' />;
		}
		if (!anuncio) {
			return null;
		}
		return (
			<div className='anuncio'>
				<div className='left'>
					<Imagen src={anuncio.result.photo} />
				</div>
				<Anuncio key={anuncio._id} anuncio={anuncio.result} history={history} />
			</div>
		);
	}

	render() {
		return (
			<Layout title='Anuncio Detalle'>
				<div className='AnuncioPage'>{this.renderContent()}</div>
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

export default AnuncioPage;
