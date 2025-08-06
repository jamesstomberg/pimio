import { logout } from '@/app/_lib/auth';
import { redirect } from 'next/navigation';

export default async function Logout() {
    return (
        <form
            action={async (formData) => {
                'use server';

                await logout();

                redirect('/');
            }}
        >
            <p>Är du säker på att du vill logga ut?</p>
            <button>Logga ut</button>
        </form>
    );
}
