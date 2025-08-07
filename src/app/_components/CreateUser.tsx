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
            return;
        }

        alert('Användaren skapades!');
        redirect('/dashboard');
    };

    const handleTextInputChange = (name: string, e: any) => {
        const value = e.target.value;

        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
        if (name === 'passwordConfirm') setPasswordConfirm(value);
    };

    return (
        <form
            onSubmit={handleCreate}
            className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-auto mt-10"
        >
            <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Skapa användare</h1>

            <label htmlFor="username" className="block mb-4">
                <span className="block text-gray-800 font-medium mb-2">Användarnamn</span>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => handleTextInputChange('username', e)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </label>

            <label htmlFor="email" className="block mb-4">
                <span className="block text-gray-800 font-medium mb-2">E-post</span>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => handleTextInputChange('email', e)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </label>

            <label htmlFor="password" className="block mb-4">
                <span className="block text-gray-800 font-medium mb-2">Lösenord</span>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => handleTextInputChange('password', e)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </label>

            <label htmlFor="password_confirm" className="block mb-6">
                <span className="block text-gray-800 font-medium mb-2">Bekräfta lösenord</span>
                <input
                    type="password"
                    id="password_confirm"
                    value={passwordConfirm}
                    onChange={(e) => handleTextInputChange('passwordConfirm', e)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
            </label>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
                Skapa
            </button>
        </form>
    );
}
