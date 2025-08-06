import Link from 'next/link';
import ProductForm from '@/app/_components/ProductForm';
import { getProductBySku } from '@/app/_lib/functions';
import { getSession } from '@/app/_lib/auth';

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
    const { sku } = await params;
    const session = await getSession();

    const productData = await getProductBySku(sku, session.user.token);

    return (
        <section>
            <Link href="/product">Tillbaka till produkter</Link>

            <h1>Redigerar produkt</h1>

            <Link href={`/product/${sku}/delete`}>Radera produkt</Link>

            <ProductForm productData={productData} token={session.user.token} action="edit" />
        </section>
    );
}
