import { z } from 'zod';
import { ApiConfig } from '@/app/_interfaces/Interface.ApiConfig';

export const LoginFormSchema = z.object({
    username: z.string().min(2, { message: 'Användarnamn måste vara minst 2 tecken långt.' }).trim(),
    password: z.string().min(4, { message: 'Lösenord måste vara minst 4 tecken långt.' }).trim(),
});

export const api: ApiConfig = {
    baseUrl: 'http://vanilla.test/wp-json',
    login: '/jwt-auth/v1/token',
    validateToken: '/jwt-auth/v1/token/validate',
};
