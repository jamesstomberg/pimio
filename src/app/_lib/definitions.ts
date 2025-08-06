import { z } from 'zod';
import { ApiConfig } from '@/app/_interfaces/Interface.ApiConfig';

export const LoginFormSchema = z.object({
    username: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
    password: z.string().min(4, { message: 'Be at least 4 characters long' }).trim(),
});

export const api: ApiConfig = {
    baseUrl: 'http://vanilla.test/wp-json',
    login: '/jwt-auth/v1/token',
    validateToken: '/jwt-auth/v1/token/validate',
};
