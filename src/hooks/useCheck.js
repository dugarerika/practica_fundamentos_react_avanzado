import { useState } from 'react';

function useCheck(initialForm) {
	const [
		form,
		setForm
	] = useState(initialForm);

	const handleFormCheck = (event) =>
		setForm({
			...form,
			[event.target.name]: event.target.checked
		});
}
