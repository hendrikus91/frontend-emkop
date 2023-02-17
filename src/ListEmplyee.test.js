import React from 'react';
import { render, screen } from '@testing-library/react';
import ListEmployee from './pages/ListEmployee';
import { Button } from "react-bootstrap";

describe("ListEmployee Success Fetch", () => {


    it("should render ListEmployee component correctly", () => {
        render(<ListEmployee />);

        const textElement = screen.getByText('Loading')

        expect(textElement).toBeInTheDocument();
    });
});