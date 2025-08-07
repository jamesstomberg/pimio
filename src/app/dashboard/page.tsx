import Link from 'next/link';

export default async function Dashboard() {
    return (
        <section className="container mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Dashboard</h1>

            <p className="text-center font-semibold mb-5">
                Välj vilken typ av innehåll du vill administrera.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none">
                <li>
                    <Link
                        href="/product"
                        className="flex items-center justify-center h-40 bg-white shadow-md rounded-lg hover:bg-blue-100 hover:shadow-lg transform transition-all duration-300 text-blue-700 text-xl font-semibold no-underline"
                    >
                        Produkter
                    </Link>
                </li>

                <li>
                    <Link
                        href="/user"
                        className="flex items-center justify-center h-40 bg-white shadow-md rounded-lg hover:bg-blue-100 hover:shadow-lg transform transition-all duration-300 text-blue-700 text-xl font-semibold no-underline"
                    >
                        Användare
                    </Link>
                </li>
            </ul>
        </section>
    );
}
