import Link from 'next/link';
import { getSession } from '../_lib/auth';

export default async function Header() {
    const session = await getSession();

    return (
        <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link href="/" className="no-underline">
                    <h1 className="text-2xl font-bold hover:text-blue-200 text-white">Pimio</h1>
                </Link>

                <div className="flex flex-wrap gap-6 items-center mt-2">
                    {session && (
                        <Link
                            href="/dashboard"
                            className="hover:text-blue-300 transition-colors no-underline text-white"
                        >
                            Dashboard
                        </Link>
                    )}
                    {session && (
                        <Link
                            href="/logout"
                            className="hover:text-blue-300 transition-colors no-underline text-white"
                        >
                            Logga ut
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
