import { useState } from 'react';

function useNewAnuncio(initialForm) {
	const [
		form,
		setForm
	] = useState(initialForm);

	const handleChange = (e) =>
		setForm({
			...form,
			[e.target.name]: e.target.value
		});

	const handleCheck = (e) => {
		const { tags } = form;


			e.target.checked ? setForm({
				...form,
				tags: tags.concat(e.target.value)
			}) :
			setForm({
				...form,
				tags: tags.filter((item) => item !== e.target.value)
			});
	};

	const handleImage = (e) =>
		setForm({
			...form,
			[e.target.name]: e.target.files[0]
		});
	return [
		form,
		handleChange,
		handleCheck,
		handleImage
	];
}

export default useNewAnuncio;
