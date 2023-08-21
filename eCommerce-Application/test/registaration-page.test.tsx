import {
    fireEvent,
    render,
    screen,
    RenderResult,
} from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import React from 'react';
import RegistrationPage from '../src/components/RegistrationPage/RegistrationPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

let page: null | RenderResult<
    typeof import('c:/Users/100nout/Documents/RS/eCommerce-Application/eCommerce-Application/node_modules/@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
> = null;

describe('Registration tests', () => {
    beforeEach(() => {
        page = render(
            <BrowserRouter>
                <RegistrationPage />
            </BrowserRouter>
        );
    });
    it('Registration page renders', () => {
        expect(
            screen.getByText(/добро пожаловать на борт космической одиссеи!/)
        ).toHaveClass('form__title');
        expect(page).toMatchSnapshot();
    });
    it('Client validation of name works correctly', () => {
        expect(screen.getByText(/фамилия/)).toBeInTheDocument();
        expect(
            screen.queryByText(/Фамилия должна содердажать только буквы/)
        ).toBeNull();
        fireEvent.change(
            document.getElementById('surname') as HTMLInputElement,
            {
                target: { value: 'Bond007' },
            }
        );
        expect(
            screen.getByText(/Фамилия должна содердажать только буквы/)
        ).toBeInTheDocument();
    });
    it('Corectly checks different passwords', () => {
        expect(screen.getByText(/создайте пароль/)).toBeInTheDocument();
        expect(screen.getByText(/повторите пароль/)).toBeInTheDocument();
        expect(screen.queryByText(/Пароли не совпадают/)).toBeNull();
        fireEvent.change(
            document.getElementById('user-password') as HTMLInputElement,
            {
                target: { value: '9845587Ok+' },
            }
        );
        fireEvent.change(
            document.getElementById('user-password-repeat') as HTMLInputElement,
            {
                target: { value: '9845587Ok+!' },
            }
        );
        expect(screen.getByText(/Пароли не совпадают/)).toBeInTheDocument();
    });
    it('Corectly replace billing address with value of shipping one after click checkbox "Use as billing" ', () => {
        expect(screen.queryByText(/Формат индекса 6 цифр XXXYYY/)).toBeNull();
        fireEvent.change(
            document.getElementById('shipping-country') as HTMLElement,
            {
                target: { value: 'Беларусь' },
            }
        );
        fireEvent.change(
            document.getElementById(
                'shipping-address-region'
            ) as HTMLInputElement,
            {
                target: { value: 'Минская область' },
            }
        );
        fireEvent.change(
            document.getElementById(
                'shipping-address-city'
            ) as HTMLInputElement,
            {
                target: { value: 'Минск' },
            }
        );
        fireEvent.change(
            document.getElementById(
                'shipping-address-index'
            ) as HTMLInputElement,
            {
                target: { value: '1234' },
            }
        );
        fireEvent.change(
            document.getElementById(
                'shipping-address-checkbox'
            ) as HTMLInputElement,
            {
                target: { value: '1234' },
            }
        );
        expect(
            screen.getByText(/Формат индекса 6 цифр XXXYYY/)
        ).toBeInTheDocument();
        expect(
            document.getElementById('billing-country') as HTMLElement
        ).toHaveValue('Выберите страну*');
        fireEvent.click(
            document.getElementById(
                'billing-address-default-checkbox'
            ) as HTMLInputElement
        );
        expect(
            document.getElementById('billing-address-region') as HTMLElement
        ).toHaveValue('Минская область');
        expect(
            document.getElementById('billing-country') as HTMLElement
        ).toHaveValue('Беларусь');
    });
});
