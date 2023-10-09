import {
    fireEvent,
    render,
    screen,
    RenderResult,
} from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import React from 'react';
import LoginPage from '../src/components/LoginPage/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

let page: null | RenderResult<
    typeof import('../node_modules/@testing-library/dom/types/queries'),
    HTMLElement,
    HTMLElement
> = null;

describe('Login tests', () => {
    beforeEach(() => {
        page = render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
    });
    it('Login page renders', () => {
        expect(screen.getByText(/Добро пожаловать/)).toHaveClass('form__title');
        expect(page).toMatchSnapshot();
    });
    it('Client validation of email works correctly', () => {
        expect(document.getElementById('email')).toBeInTheDocument();
        expect(
            screen.queryByText(/Введите e-mail в верном формате/)
        ).toBeNull();
        expect(screen.queryByDisplayValue(/cat/)).toBeNull();
        fireEvent.change(document.getElementById('email') as HTMLInputElement, {
            target: { value: 'cat' },
        });
        expect(screen.queryByDisplayValue(/cat/)).toBeInTheDocument();
        expect(
            screen.queryByText(/Введите e-mail в верном формате/)
        ).toBeInTheDocument();
    });
    it('Client validation of password works correctly', () => {
        expect(document.getElementById('password')).toBeInTheDocument();
        expect(
            screen.queryByText(/Пароль должен быть не менее 8 символов/)
        ).toBeNull();
        expect(screen.queryByDisplayValue(/pass/)).toBeNull();
        fireEvent.change(
            document.getElementById('password') as HTMLInputElement,
            {
                target: { value: 'pass' },
            }
        );
        expect(screen.queryByDisplayValue(/pass/)).toBeInTheDocument();
        expect(
            screen.queryByText(/Пароль должен быть не менее 8 символов/)
        ).toBeInTheDocument();
        fireEvent.change(
            document.getElementById('password') as HTMLInputElement,
            {
                target: { value: 'password' },
            }
        );
        expect(
            screen.queryByText(
                /Пароль должен содержать заглавную букву в диапазоне A - Z/
            )
        ).toBeInTheDocument();
        fireEvent.change(
            document.getElementById('password') as HTMLInputElement,
            {
                target: { value: 'passwordA1' },
            }
        );
        expect(
            screen.queryByText(
                'Пароль должен содержать специальный символ !@#$%^&*+'
            )
        ).toBeInTheDocument();
    });
    it('Correctly checks fields are empty', () => {
        expect(screen.queryByText(/Это обязательное поле/)).toBeNull();
        fireEvent.click(
            document.getElementById('button-login') as HTMLInputElement
        );
        expect(screen.queryAllByText(/Это обязательное поле/)).not.toBeNull();
    });
    it('Correctly checks correct password', () => {
        expect(screen.queryByText(/Вы ввели неверный пароль/)).toBeNull();
        fireEvent.change(document.getElementById('email') as HTMLInputElement, {
            target: { value: 'ksu1ven@mail.ru' },
        });
        fireEvent.change(
            document.getElementById('password') as HTMLInputElement,
            {
                target: { value: '9845587Ok+' },
            }
        );
        fireEvent.click(
            document.getElementById('button-login') as HTMLInputElement
        );

        expect(screen.queryByText(/Вы ввели неверный пароль/)).toBeNull();
    });
});
