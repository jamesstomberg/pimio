'use client';

import { redirect } from 'next/navigation';
import { deleteProductBySku } from '../_lib/functions';

export default function DeleteProduct({ sku, token }: { sku: string; token: string }) {
    const handleDelete = async () => {
        if (confirm(`Är du säker på att du vill ta bort produkten med artikelnummer: ${sku}?`)) {
            await deleteProductBySku(sku, token);
            redirect('/product');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto">
            <p className="text-lg font-medium text-gray-800 mb-4">
                Artikelnummer: <span className="font-semibold">{sku}</span>
            </p>

            <p className="text-gray-700 mb-6">
                Är du säker på att du vill ta bort produkten? Denna åtgärd kan inte ångras.
            </p>

            <div className="flex justify-center gap-4">
                <button
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition-all"
                >
                    Ja, ta bort produkten
                </button>

                <a
                    href={`/product/${sku}`}
                    className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg transition-all no-underline"
                >
                    Avbryt
                </a>
            </div>
        </div>
    );
}
