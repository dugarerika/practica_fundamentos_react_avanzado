import React from 'react';
import T from 'prop-types';

import './Anuncio.css';

const Anuncio = ({ anuncio, history }) => (
	<article
		className='anuncio'
		onClick={() => history.push(`/anuncio/${anuncio._id}`)}>
		<div className='left'>
			{
				anuncio.sale ? <span>Venta</span> :
				<span>Compra</span>}
		</div>

		<div className='right'>
			<div className='anuncio-cabecera'>
				<h1 className='anuncio-nombre'>{anuncio.name}</h1>
				<div className='anuncio-contenido'>
					<span className='anuncio-venta'>{anuncio.sale}</span>
					<span className='anuncio-precio'>{'Precio: €' + anuncio.price}</span>
					<span className='anuncio-etiquetas'>
						Tags:
						<ul className='anuncio-etiquetas-contenido'>
							{anuncio.tags.map((tag) => (
								<li key={anuncio.tags.indexOf(tag)}>{tag}</li>
							))}
						</ul>
					</span>
				</div>
				<span className='anuncio-separador' />
			</div>
			<div />
		</div>
	</article>
);

Anuncio.propTypes = {
	anuncio: T.object,
	history: T.shape({ push: T.func.isRequired }).isRequired
};

export default Anuncio;
