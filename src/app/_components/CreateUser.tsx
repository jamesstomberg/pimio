'use client';
import { useState } from 'react';
import { api } from '../_lib/definitions';
import { redirect } from 'next/navigation';

export default function CreateUser({ token }: { token: string }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleCreate = async (e: any) => {
        e.preventDefault();

        const data = {
            username,
            email,
            password,
            passwordConfirm,
            roles: 'administrator',
        };

        const response = await fetch(api.baseUrl + '/wp/v2/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (response.status !== 201) {
            alert(`Användaren kunde inte skapas. Fel: ${response.statusText}`);
        }

        alert('Användaren skapades!');

        redirect('/dashboard');
    };

    const handleTextInputChange = (name: string, e: any) => {
        const value = e.target.value;

        if (name === 'username') {
            setUsername(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'passwordConfirm') {
            setPasswordConfirm(value);
        }
    };

    return (
        <form action="/">
            <label htmlFor="username">
                Användarnamn
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => {
                        handleTextInputChange('username', e);
                    }}
                />
            </label>

            <label htmlFor="email">
                E-post
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                        handleTextInputChange('email', e);
                    }}
                />
            </label>

            <label htmlFor="password">
                Lösenord
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                        handleTextInputChange('password', e);
                    }}
                />
            </label>

            <label htmlFor="password_confirm">
                Bekräfta lösenord
                <input
                    type="password"
                    name="password_confirm"
                    id="password_confirm"
                    value={passwordConfirm}
                    onChange={(e) => {
                        handleTextInputChange('passwordConfirm', e);
                    }}
                />
            </label>

            <button type="submit" onClick={handleCreate}>
                Skapa
            </button>
        </form>
    );
}
