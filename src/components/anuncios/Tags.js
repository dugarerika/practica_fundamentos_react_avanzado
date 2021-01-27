import React from 'react';
import { FormCheckboxes } from '../shared/index';
import Layout from '../layout/Layout';

class Tags extends React.Component {
	render() {
		return (
			<Layout>
				<div>
					<FormCheckboxes
						className='checkbox-input-new-anuncio'
						name='tags'
						label='tags'
					/>
				</div>
			</Layout>
		);
	}
}

export default Tags;
