'use client';

import { useState } from 'react';
import { createNewProduct, editProductBySku } from '../_lib/functions';
import { redirect } from 'next/navigation';
import Errors from './Errors';

export default function ProductForm({
    productData,
    token,
    action,
}: {
    productData: any;
    token: string;
    action: string;
}) {
    const { sku, name, price, stock, description } = productData;
    const [productSku, setProductSku] = useState(sku ?? '');
    const [productName, setProductName] = useState(name ?? '');
    const [productPrice, setProductPrice] = useState(price ?? 0);
    const [productStock, setProductStock] = useState(stock ?? 0);
    const [productDescription, setProductDescription] = useState(description ?? '');

    const handleSkuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductSku(e.target.value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductPrice(parseFloat(e.target.value));
    };

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductStock(parseInt(e.target.value, 10));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProductDescription(e.target.value);
    };

    const handleSave = async (e: any) => {
        e.preventDefault();

        let data = {
            sku: sku,
            newSku: productSku,
            name: productName,
            price: productPrice,
            stock: productStock,
            description: productDescription,
        };

        if (action === 'edit') {
            const response = await editProductBySku(sku, data, token);

            if (sku !== productSku) {
                redirect('/product/' + productSku);
            }

            if (response.sku) {
                alert('Produkten uppdaterades!');
            } else {
                alert('Något gick fel.');
            }
        } else if (action === 'create') {
            data.sku = productSku;

            const response = await createNewProduct(data, token);

            if (response.sku) {
                redirect('/product');
            } else {
                alert('Produkten måste ha ett artikelnummer!');
            }
        }
    };

    return (
        <section>
            <form className="space-y-6">
                <div>
                    <label
                        htmlFor="product_sku"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Artikelnummer
                    </label>
                    <input
                        type="text"
                        name="product_sku"
                        id="product_sku"
                        value={productSku}
                        onChange={handleSkuChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="product_name"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Namn
                    </label>
                    <input
                        type="text"
                        name="product_name"
                        id="product_name"
                        value={productName}
                        onChange={handleNameChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="product_price"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Pris
                    </label>
                    <input
                        type="number"
                        name="product_price"
                        id="product_price"
                        value={productPrice}
                        onChange={handlePriceChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="product_stock"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Lager
                    </label>
                    <input
                        type="number"
                        name="product_stock"
                        id="product_stock"
                        value={productStock}
                        onChange={handleStockChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="product_description"
                        className="block mb-2 text-sm font-medium text-gray-700"
                    >
                        Beskrivning
                    </label>
                    <textarea
                        name="product_description"
                        id="product_description"
                        rows={10}
                        value={productDescription}
                        onChange={handleDescriptionChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    onClick={handleSave}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer"
                >
                    Spara
                </button>
            </form>
            <Errors />
        </section>
    );
}
