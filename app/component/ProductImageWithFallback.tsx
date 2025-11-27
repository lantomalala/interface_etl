'use client';

import { useState } from 'react';

interface ProductImageWithFallbackProps {
    src: string | null | undefined;
    alt: string;
    className?: string;
    fallbackClassName?: string;
}

export default function ProductImageWithFallback({ 
    src, 
    alt, 
    className = '',
    fallbackClassName = ''
}: ProductImageWithFallbackProps) {
    const [currentSrc, setCurrentSrc] = useState<string | null>(src || null);
    const [hasError, setHasError] = useState(false);

    const defaultImageSvg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="16" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EAucune image%3C/text%3E%3C/svg%3E';

    const handleError = () => {
        if (!hasError) {
            setCurrentSrc(defaultImageSvg);
            setHasError(true);
        }
    };

    if (!currentSrc || currentSrc.trim() === '') {
        return (
            <div className={`flex items-center justify-center ${fallbackClassName || className}`}>
                <img
                    src={defaultImageSvg}
                    alt={alt}
                    className={className}
                />
            </div>
        );
    }

    return (
        <img
            src={currentSrc}
            alt={alt}
            className={className}
            onError={handleError}
        />
    );
}

