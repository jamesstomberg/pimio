import Link from 'next/link';
import ProductForm from '@/app/_components/ProductForm';
import { getProductBySku, getTodosByProductSku } from '@/app/_lib/functions';
import { getSession } from '@/app/_lib/auth';
import ProductTodos from '@/app/_components/ProductTodos';

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
    const { sku } = await params;
    const session = await getSession();

    const productData = await getProductBySku(sku, session.user.token);
    const todoData = await getTodosByProductSku(sku, session.user.token);

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

            <div className="flex flex-wrap justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-600">Redigerar produkt</h1>
                <Link
                    href={`/product/${sku}/delete`}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition no-underline mt-5"
                >
                    Radera produkt
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
                <ProductForm productData={productData} token={session.user.token} action="edit" />
            </div>

            {todoData && (
                <ProductTodos todosData={todoData} session={session} sku={sku}/>
            )}
        </section>
    );
}
