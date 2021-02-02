import { useState } from 'react';

function useForm(initialForm) {
	const [
		form,
		setForm
	] = useState(initialForm);

	const handleFormChange = (event) =>
		setForm({
			...form,
			[event.target.name]: event.target.value
		});

	const handleFormCheck = (event) =>
		setForm({
			...form,
			[event.target.name]: event.target.checked
		});

	return [
		form,
		handleFormChange,
		handleFormCheck
	];
}

export default useForm;
