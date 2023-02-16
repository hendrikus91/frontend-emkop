import { render, screen } from '@testing-library/react';
import ListEmployee from './pages/ListEmployee';

test('list employee success', () => {
    render(<ListEmployee />);
})