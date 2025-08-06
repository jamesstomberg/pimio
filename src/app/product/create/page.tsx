import Link from 'next/link';
import ProductForm from '@/app/_components/ProductForm';
import { getProductBySku } from '@/app/_lib/functions';
import { getSession } from '@/app/_lib/auth';

export default async function CreateProduct() {
    const session = await getSession();

    return (
        <section>
            <Link href="/product">Tillbaka till produkter</Link>

            <h1>Skapa produkt</h1>

            <ProductForm productData={{}} token={session.user.token} action="create" />
        </section>
    );
}
