'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Errors() {
    const searchParams = useSearchParams();
    const errorsString = searchParams.get('errors') ?? '{}';
    const [isVisible, setIsVisible] = useState(true);

    let errors: Record<string, string> = {};

    try {
        errors = JSON.parse(errorsString);
    } catch (e) {
        console.error('Failed to parse errors:', e);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`errors ${isVisible ? 'not-hidden' : ''}`}>
            {Object.entries(errors).map(([key, value]) => (
                <p key={key}>{`- ${value}`}</p>
            ))}
        </div>
    );
}
