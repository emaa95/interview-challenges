import React from 'react';
import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from '../src/App';

describe('<App />', () => {
    test('should work', () => {
        render(<App />)

        expect(
            screen.getByText('Prueba técnica React')
        ).toBeDefined();
    })
})