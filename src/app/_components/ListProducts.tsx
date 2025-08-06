'use client';
import { useState, useEffect } from 'react';
import { api } from '../_lib/definitions';
import Link from 'next/link';
import CustomPagination from '../_components/CustomPagination';
import { useSearchParams } from 'next/navigation';

export default function ListProducts({ token }: { token: string }) {
    const [products, setProducts] = useState<any[]>([]);
    const [apiData, setApiData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    let page = 1;
    const searchParams = useSearchParams();
    const urlPage = searchParams.get('page');

    const fetchProducts = async () => {
        try {
            const response = await fetch(api.baseUrl + '/products/v1/Read/' + page, {
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
    }, [token, page, urlPage]);

    if (loading) {
        return <p>Laddar produkter...</p>;
    }

    if (error) {
        return (
            <section>
                <h1>Products</h1>
                <p>{error}</p>
            </section>
        );
    }

    return (
        <section>
            <h1>Produkter</h1>
            <div>
                <Link href="/product/create">Skapa ny produkt</Link>
            </div>

            <ul>
                {products.map((product) => (
                    <li key={product.sku}>
                        <Link href={`/product/${product.sku}`}>
                            <p>
                                <strong>{product.name}</strong>
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>

            <CustomPagination apiData={apiData} />
        </section>
    );
}
