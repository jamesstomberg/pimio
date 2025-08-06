'use client';

import { redirect } from 'next/navigation';
import { deleteProductBySku } from '../_lib/functions';

export default function DeleteProduct({ sku, token }: { sku: string, token: string }) {
    const handleDelete = async () => {
        alert('Ta bort produkt: ' + sku);

        await deleteProductBySku(sku, token);

        redirect('/product');
    };

    return (
        <div role="form">
            <p>Artikelnummer: {sku}</p>
            <p>Är du säker på att du vill ta bort produkten?</p>
            <button onClick={handleDelete}>Ja, ta bort produkten</button>
        </div>
    );
}
