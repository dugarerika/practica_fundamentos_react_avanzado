import { useState } from 'react';

function useForm(initialForm) {
	const [
		form,
		setForm
	] = useState(initialForm);

	const handleFormChange = (e) =>
		setForm({
			...form,
			[e.target.name]: e.target.value
		});

	const handleFormCheck = (e) =>
		setForm({
			...form,
			[e.target.name]: e.target.checked
		});

	return [
		form,
		handleFormChange,
		handleFormCheck
	];
}

export default useForm;
