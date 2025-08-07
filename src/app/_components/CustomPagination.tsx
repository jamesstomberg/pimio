'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CustomPagination({ apiData }: { apiData: any }) {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? '1';

    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            {page && parseInt(page, 10) > 1 && (
                <Link
                    href={`/product?page=${parseInt(page, 10) - 1}`}
                    aria-label="Previous page"
                    className="flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-700 rounded-full shadow hover:bg-gray-400 hover:text-gray-900 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </Link>
            )}

            <ul className="flex gap-2 list-none p-0 items-center">
                {Array.from({ length: apiData.total_pages }, (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = page && pageNumber === parseInt(page, 10);

                    return (
                        <li key={pageNumber} className="flex items-center mb-0">
                            <Link
                                href={`/product?page=${pageNumber}`}
                                className={`flex items-center justify-center w-10 h-10 text-center rounded-lg shadow ${
                                    isActive
                                        ? 'bg-blue-600 text-white font-bold'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-900'
                                } transition`}
                                aria-label={`Page ${pageNumber}`}
                            >
                                {pageNumber}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {page && parseInt(page, 10) < apiData.total_pages && (
                <Link
                    href={`/product?page=${parseInt(page, 10) + 1}`}
                    aria-label="Next page"
                    className="flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-700 rounded-full shadow hover:bg-gray-400 hover:text-gray-900 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </Link>
            )}
        </div>
    );
}
