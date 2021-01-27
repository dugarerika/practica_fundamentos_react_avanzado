import client from './client';

const anuncioBaseUrl = '/apiv1';

export const getAllAnuncios = () => {
	const url = `${anuncioBaseUrl}/adverts`;
	return client.get(url);
};

export const getDetalleAnuncio = (anuncioID) => {
	const url = `${anuncioBaseUrl}/adverts/${anuncioID}`;
	return client.get(url);
};

export const createAnuncio = (formData) => {
	const url = `${anuncioBaseUrl}/adverts`;
	return client.post(url, formData);
};

export const deleteDetalleAnuncio = (anuncioID) => {
	const url = `${anuncioBaseUrl}/adverts/${anuncioID}`;
	return client.delete(url);
};

export const getFilterAnuncios = (filter) => {
	console.log(filter);
	const url = `${anuncioBaseUrl}/adverts`;
	return client.get(url, { params: filter });
};
