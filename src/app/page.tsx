import Link from 'next/link';
import { getSession } from './_lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getSession();

    if (session) {
        redirect('/dashboard');
    }

    return (
        <div className="relative flex flex-col items-center justify-center bg-blue-50 md:min-h-[70vh] h-full">
            <img
                src="/round-icons.svg"
                alt="PIM System Illustration"
                className="absolute inset-0 w-full h-full object-cover opacity-10"
            />

            <div className="z-10 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
                    Välkommen till Pimio
                </h1>
                <p className="text-lg md:text-xl text-gray-700 mb-6">
                    Hantera din produktdata effektivt och kraftfullt.
                </p>
                <Link
                    href="/login"
                    className="px-6 py-3 text-white bg-blue-600 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-xl transform transition-transform duration-300 hover:scale-105 no-underline"
                >
                    Logga in
                </Link>
            </div>
        </div>
    );
}
