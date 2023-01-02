import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';

test('renders learn react link', () => {
	const { getByText } = render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	console.log(getByText());
});