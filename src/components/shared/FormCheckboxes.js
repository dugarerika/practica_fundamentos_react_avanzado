import React from 'react';

class FormCheckboxes extends React.Component {
	state = {
		infoTags: [
			{ id: 1, value: 'Ropa' },
			{ id: 2, value: 'tecnologia' },
			{ id: 3, value: 'Celulares' },
			{ id: 4, value: 'Deporte' },
			{ id: 5, value: 'Video Juegos' },
			{ id: 6, value: 'Hogar' },
			{ id: 7, value: 'Aseo' },
			{ id: 8, value: 'Automovil' }
		]
	};

	render() {
		const { label, value, name, type, ...props } = this.props;
		const { infoTags } = this.state;
		return (
			<div>
				{infoTags.map((item) => (
					<label key={item.id}>
						<input
							{...props}
							type='checkbox'
							name='tags'
							label={item.value}
							value={item.value}
						/>
						{item.value}
					</label>
				))}
			</div>
		);
	}
}

export default FormCheckboxes;
