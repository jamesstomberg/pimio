'use client';

import { useState, useEffect } from 'react';
import { api } from '../_lib/definitions';
import Link from 'next/link';
import CustomPagination from '../_components/CustomPagination';
import { redirect, useSearchParams } from 'next/navigation';

export default function ListProducts({ token }: { token: string }) {
    const [products, setProducts] = useState<any[]>([]);
    const [apiData, setApiData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    let page = 1;
    const searchParams = useSearchParams();
    const urlPage = searchParams.get('page');

    const fetchProducts = async () => {
        try {
            let url = api.baseUrl + '/products/v1/Read/?page=' + page;

            if (search && search.length !== 0) {
                url += `&search=${search}`;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorBody = await response.json();
                console.error('API Error:', errorBody);
                throw new Error(
                    `Failed to fetch products: ${response.status} ${response.statusText}`
                );
            }

            const apiData = await response.json();
            setProducts(apiData.products);
            setApiData(apiData);
        } catch (err) {
            console.error('Fetch Error:', err);
            setError('Failed to fetch products. Check the console for more details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (urlPage) {
            page = parseInt(urlPage, 10);
            setProducts([]);
        }

        fetchProducts();
    }, [token, page, urlPage, search]);

    const handleSearch = (e: any) => {
        setSearch(e.target.value);

        if (e.target.value.length) {
            redirect('/product');
        }
    };

    const gridMinHeight = () => {
        if (typeof window !== 'undefined') {
            const screenHeight = window.innerHeight;
            return screenHeight * 0.5;
        }
        return 400;
    };

    if (loading) {
        return (
            <section className="container mx-auto py-20 text-center">
                <p className="text-lg text-gray-600">Laddar produkter...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="container mx-auto py-20">
                <h1 className="text-3xl font-bold text-red-600 mb-6">Produkter</h1>
                <p className="text-lg text-gray-800">{error}</p>
            </section>
        );
    }

    return (
        <section className="container mx-auto py-10 px-4">
            <div className="flex flex-wrap justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-600">Produkter</h1>
                <Link
                    href="/product/create"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition no-underline mt-5"
                >
                    Skapa ny produkt
                </Link>
            </div>

            <div className="relative mb-8">
                <label htmlFor="product_search" className="sr-only">
                    Sök produkt
                </label>
                <input
                    type="text"
                    name="product_search"
                    id="product_search"
                    value={search}
                    placeholder="Sök efter produkter..."
                    onChange={handleSearch}
                    className="w-full max-w-md px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <ul
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0"
                style={{ minHeight: gridMinHeight() }}
            >
                {products.map((product) => (
                    <li
                        key={product.sku}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                    >
                        <Link
                            href={`/product/${product.sku}`}
                            className="block h-full p-4 flex flex-col no-underline"
                        >
                            <p className="text-lg font-semibold text-blue-600 mb-2">
                                {product.name}
                            </p>
                            <p className="text-sm text-gray-600">Artikelnummer: {product.sku}</p>
                            <p className="text-sm text-gray-600">Lagersaldo: {product.stock}</p>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="mt-10">
                <CustomPagination apiData={apiData} />
            </div>
        </section>
    );
}
