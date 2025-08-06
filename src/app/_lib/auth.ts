import { cookies } from 'next/headers';
import { LoginFormSchema } from './definitions';
import axios from 'axios';
import https from 'https';

type LoginCredentials = {
    username: string;
    password: string;
};

export async function login(formData: FormData) {
    const formObject: LoginCredentials = Object.fromEntries(formData.entries()) as LoginCredentials;
    const errors: any = {};

    const result = LoginFormSchema.safeParse(formObject);

    if (!result.success) {
        result.error.issues.map((issue) => {
            errors[issue.path[0]] = issue.message;
        });

        (await cookies()).set('session', JSON.stringify({}), { httpOnly: true });

        return errors;
    }

    const url = 'wp-json/jwt-auth/v1/token';
    const postData = {
        username: formObject.username,
        password: formObject.password,
    };

    const axiosInstance = axios.create({
        baseURL: 'http://vanilla.test/',
        httpsAgent: new https.Agent({
            rejectUnauthorized: false,
        }),
    });

    const user = {
        token: '',
        user_email: '',
        user_nicename: '',
    };

    try {
        const response = await axiosInstance.post(url, postData);

        user.token = response.data.token;
        user.user_email = response.data.user_email;
        user.user_nicename = response.data.user_nicename;
    } catch {
        errors['invalid_credentials'] = 'Invalid credentials';
        (await cookies()).set('session', JSON.stringify({}), { httpOnly: true });

        return errors;
    }

    const session = JSON.stringify({ user });

    // Set the session cookie.
    (await cookies()).set('session', session, { httpOnly: true });
}

export async function getSession() {
    // Retrieve the session cookie value
    const sessionCookie = (await cookies()).get('session')?.value;

    // If the session cookie is undefined or empty, return `null`
    if (!sessionCookie) {
        return null;
    }

    try {
        // Decode and parse the session JSON string
        const session = JSON.parse(sessionCookie);

        // Check if the parsed session is an object and has any keys
        if (typeof session === 'object' && Object.keys(session).length > 0) {
            return session; // Valid session
        }

        return null; // Empty session object
    } catch (error) {
        console.error('Error parsing session cookie:', error);
        return null; // Return `null` if parsing fails
    }
}

export async function logout() {
    // Clear the session cookie by setting it to an empty value with no expiration.
    (await cookies()).set('session', '', { httpOnly: true });
}
