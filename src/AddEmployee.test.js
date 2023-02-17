import React from "react";
import AddEmployee from './pages/AddEmployee';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from "@testing-library/user-event";


describe("add employee", () => {

    const onSubmit = jest.fn();

    beforeEach(() => {
        onSubmit.mockClear();

        render(<AddEmployee />);
    })


    it("onsubmit", () => {
        userEvent.type(getName(), 'Hendrikus');

        const dropDown = screen.getByTestId('gender');
        
        userEvent.selectOptions(dropDown, within(dropDown).getByRole('option', {name: 'MALE'}));

        const department = screen.getByTestId('department');

        userEvent.type(department, 'IT');

        const dob = screen.getByTestId('dob');
        userEvent.type(dob, '1991-06-07');

        userEvent.click(screen.getByRole('button', {name:/Submit/i}));


        expect(onSubmit).toHaveBeenCalledTimes(1);
        // await waitFor(() => {
            
        // })

        // expect(onSubmit).toHaveBeenCalledWith({lazy: true});

    })

});

function getName () {
    return screen.getByRole('textbox', {
        name: /name/i
    })
}