'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Errors() {
    const searchParams = useSearchParams();
    const errorsString = searchParams.get('errors'); // Will be null if no errors param
    const [isVisible, setIsVisible] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({}); // Store parsed errors

    useEffect(() => {
        if (errorsString) {
            try {
                const parsedErrors = JSON.parse(errorsString); // Attempt parsing
                setErrors(parsedErrors);
                setIsVisible(true); // Show the errors flash
            } catch (e) {
                console.error('Failed to parse errors:', e);
            }

            // Set timeout to hide the errors after 3 seconds
            const timer = setTimeout(() => {
                setIsVisible(false); // Hide errors
            }, 3000);

            return () => clearTimeout(timer); // Cleanup on component unmount
        }
    }, [errorsString]); // Effect runs when `errorsString` changes

    // Nothing renders if no errors are present
    if (!isVisible) {
        return null; // Render nothing
    }

    return (
        <div className={`errors ${isVisible ? 'not-hidden' : ''}`}>
            {Object.entries(errors).map(([key, value]) => (
                <p key={key}>{`- ${value}`}</p>
            ))}
        </div>
    );
}
