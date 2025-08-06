import Link from 'next/link';
import { getSession } from './_lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getSession();

    if (session) {
        redirect('/dashboard');
    }

    return (
        <>
            <Link href="/login">Logga in</Link>
        </>
    );
}
