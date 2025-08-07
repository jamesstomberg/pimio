import DeleteProduct from '@/app/_components/DeleteProduct';
import { getSession } from '@/app/_lib/auth';
import Link from 'next/link';

export default async function deleteProduct({ params }: { params: Promise<{ sku: string }> }) {
    const { sku } = await params;
    const session = await getSession();

    return (
        <section className="container mx-auto py-10 px-4">
            <div className="mb-6">
                <Link
                    href={`/product/${sku}`}
                    className="px-6 py-3 bg-gray-200 text-blue-600 rounded-lg shadow-md hover:bg-gray-300 transition no-underline"
                >
                    Tillbaka till produkten
                </Link>
            </div>

            <DeleteProduct sku={sku} token={session.user.token} />
        </section>
    );
}
