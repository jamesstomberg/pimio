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
                url += '&search=' + search;
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

            <div>
                <label htmlFor="product_search">
                    Sök produkt
                    <input
                        type="text"
                        name="product_search"
                        id="product_search"
                        value={search}
                        onChange={handleSearch}
                    />
                </label>
            </div>

            <ul>
                {products.map((product) => (
                    <li key={product.sku}>
                        <Link href={`/product/${product.sku}`}>
                            <p className="list-products__name">
                                <strong>{product.name}</strong>
                            </p>
                            <p className="list-products__sku">{product.sku}</p>
                            <p className="list-products__stock">Lagersaldo: {product.stock}</p>
                        </Link>
                    </li>
                ))}
            </ul>

            <CustomPagination apiData={apiData} />
        </section>
    );
}
