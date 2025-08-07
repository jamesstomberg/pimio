import { logout } from '@/app/_lib/auth';
import { redirect } from 'next/navigation';

export default async function Logout() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-blue-50">
            <div className="absolute inset-0 w-full h-full bg-white opacity-80"></div>
            <div className="z-10 bg-white shadow-md rounded-lg p-8 text-center max-w-md w-full">
                <p className="text-xl font-semibold text-gray-800 mb-6">
                    Är du säker på att du vill logga ut?
                </p>

                <form
                    action={async (formData) => {
                        'use server';

                        await logout();

                        redirect('/');
                    }}
                >
                    <div className="flex items-center justify-center gap-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-red-700 hover:shadow-md transition-all cursor-pointer"
                        >
                            Logga ut
                        </button>
                        <a
                            href="/dashboard"
                            className="px-6 py-3 bg-gray-300 text-gray-800 text-lg font-semibold rounded-lg shadow hover:bg-gray-400 hover:shadow-md transition-all no-underline"
                        >
                            Avbryt
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
