/** Refactorizacion de un componente para que use Hooks 
 * gestionando su estado con useState( o sus efectos con 
 * useEffects */

import React from 'react';

import { Redirect } from 'react-router-dom';

function getDisplayName(WrappedComponent) {
	return (
		WrappedComponent.displayName ||
		WrappedComponent.name ||
		'Component'
	);
}

function withDataLoad({ getData, propName = 'data' }) {
	return function(WrappedComponent) {
		const ComponentWithDataLoad = (props) => {
			const [
				data,
				setData
			] = React.useState(null);
			const [
				error,
				setError
			] = React.useState(null);
			const [
				isLoading,
				setIsLoading
			] = React.useState(false);

			React.useEffect(
				() => {
					setIsLoading(true);
					getData(props)
						.then((data) => setData({ data }))
						.catch((error) => setError({ error }))
						.finally(() => setIsLoading(false));
				},
				[
					props
				]
			);

			if (isLoading) {
				return 'Loading....';
			}
			if (error) {
				return <Redirect to='/404' />;
			}
			if (!data) {
				return null;
			}

			const newProps = { [propName]: data, setData };
			return <WrappedComponent {...newProps} {...props} />;
		};

		ComponentWithDataLoad.displayName = `WithDataLoad(${getDisplayName(
			WrappedComponent
		)})`;

		return ComponentWithDataLoad;
	};
}

export default withDataLoad;
