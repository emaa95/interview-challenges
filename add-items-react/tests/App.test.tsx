import React from 'react';
import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from '../src/App';
import userEvent from '@testing-library/user-event';

describe('<App />', () => {

    /*
    test('should work', () => {
        render(<App />)

        expect(
            screen.getByText('Prueba técnica React')
        ).toBeDefined();
    })
        */
        
    test('should add items and remove them', async () => {
        const user = userEvent.setup();

        render(<App/>)
        // Buscar el input
        const input = screen.getByRole('textbox');

        expect(input).toBeDefined()

        //Buscar el form
        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        const button = form.querySelector('button')
        expect(button).toBeDefined()

        const randomText = crypto.randomUUID()
        await user.type(input, randomText)
        await user.click(button!)

        // Asegurar que el elemento se agrego
        const list = screen.getByRole('list')
        expect(list).toBeDefined()

        expect(list.childNodes.length).toBe(3)
        
        // Asegurar que se puede eliminar el elemento

        const item = screen.getByText(randomText)
        const item2 = screen.getByText('Videojuegos :D')
        const item3 = screen.getByText('Libros XD')

        const removeButton = item.querySelector('button')
        expect(removeButton).toBeDefined()

        const removeButton2 = item2.querySelector('button')
        expect(removeButton2).toBeDefined()

        const removeButton3 = item3.querySelector('button')
        expect(removeButton3).toBeDefined()

        await user.click(removeButton!)
        await user.click(removeButton2!)
        await user.click(removeButton3!)

        
        const noResults = screen.getByText('La lista esta vacia')
        expect(noResults).toBeDefined()

    
    })
})