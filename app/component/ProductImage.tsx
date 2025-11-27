'use client';

import { useState } from 'react';

interface ProductImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackSrc?: string;
}

export default function ProductImage({ src, alt, className = '', fallbackSrc }: ProductImageProps) {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [errorCount, setErrorCount] = useState(0);
    const [showDefault, setShowDefault] = useState(false);

    const defaultImage = fallbackSrc || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="20" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EAucune image%3C/text%3E%3C/svg%3E';

    const handleError = () => {
        if (errorCount === 0 && fallbackSrc) {
            // Essayer l'image de fallback
            setCurrentSrc(fallbackSrc);
            setErrorCount(1);
        } else {
            // Afficher l'image par défaut
            setCurrentSrc(defaultImage);
            setShowDefault(true);
        }
    };

    return (
        <img
            src={currentSrc}
            alt={alt}
            className={className}
            onError={handleError}
        />
    );
}

