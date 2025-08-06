import DeleteProduct from '@/app/_components/DeleteProduct';
import { getSession } from '@/app/_lib/auth';
import Link from 'next/link';

export default async function deleteProduct({ params }: { params: Promise<{ sku: string }> }) {
    const { sku } = await params;
    const session = await getSession();

    return (
        <section>
            <Link href={`/product/${sku}`}>Tillbaka till produkten</Link>
            <DeleteProduct sku={sku} token={session.user.token}></DeleteProduct>
        </section>
    );
}
