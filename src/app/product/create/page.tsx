import Link from 'next/link';
import ProductForm from '@/app/_components/ProductForm';
import { getSession } from '@/app/_lib/auth';

export default async function CreateProduct() {
    const session = await getSession();

    return (
        <section className="container mx-auto py-10 px-4">
            <div className="mb-6">
                <Link
                    href="/product"
                    className="px-6 py-3 bg-gray-200 rounded-lg text-blue-600 shadow-md hover:bg-gray-300 transition no-underline"
                >
                    Tillbaka till produkter
                </Link>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-600">Skapa produkt</h1>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <ProductForm productData={{}} token={session.user.token} action="create" />
            </div>
        </section>
    );
}
