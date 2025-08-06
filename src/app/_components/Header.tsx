import Link from 'next/link';
import { getSession } from '../_lib/auth';

export default async function Header() {
    const session = await getSession();

    return (
        <header>
            <Link href="/">
                <h1>Pimio</h1>
            </Link>
            {session && (
                <ul>
                    <li>
                        <Link href="/dashboard">Dashboard</Link>
                    </li>
                </ul>
            )}
        </header>
    );
}
