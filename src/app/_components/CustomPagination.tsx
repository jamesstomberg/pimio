'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CustomPagination({ apiData }: { apiData: any }) {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? "1";

    return (
        <div>
            <p>Sidor</p>
            {page && parseInt(page, 10) > 1 && (
                <Link href={`/product?page=${parseInt(page, 10) - 1}`}>Tillbaka</Link>
            )}
            <ul>
                {Array.from({ length: apiData.total_pages }, (_, index) => (
                    <li key={index + 1}>
                        {page && index + 1 === parseInt(page, 10) ? (
                            <strong>
                                <Link href={`/product?page=${index + 1}`}>{index + 1}</Link>
                            </strong>
                        ) : (
                            <Link href={`/product?page=${index + 1}`}>{index + 1}</Link>
                        )}
                    </li>
                ))}
            </ul>

            {page && parseInt(page, 10) < apiData.total_pages && (
                <Link href={`/product?page=${parseInt(page, 10) + 1}`}>Nästa</Link>
            )}
        </div>
    );
}
