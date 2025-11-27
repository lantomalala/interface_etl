'use client';

import { useState } from 'react';

interface ProductImageGalleryProps {
    images: string[];
    title?: string | null;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
    const [currentMainImage, setCurrentMainImage] = useState(0);
    const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

    // Filtrer les images valides (non vides)
    const validImages = images.filter((img, index) => 
        img && img.trim() !== '' && !failedImages.has(index)
    );

    const defaultImageSvg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EAucune image%3C/text%3E%3C/svg%3E';

    const handleImageError = (index: number) => {
        setFailedImages(prev => {
            const newSet = new Set([...prev, index]);
            
            // Si l'image principale échoue, essayer la suivante qui fonctionne
            if (index === currentMainImage) {
                const remainingImages = validImages.filter((_, i) => !newSet.has(i));
                if (remainingImages.length > 0) {
                    const nextIndex = validImages.findIndex((_, i) => !newSet.has(i));
                    if (nextIndex !== -1) {
                        setCurrentMainImage(nextIndex);
                    }
                }
            }
            
            return newSet;
        });
    };

    // Si toutes les images ont échoué ou aucune image valide
    if (validImages.length === 0 || failedImages.size === validImages.length) {
        return (
            <div className='w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center'>
                <img
                    src={defaultImageSvg}
                    alt={title || 'Aucune image'}
                    className='w-full h-full object-contain'
                />
            </div>
        );
    }

    const mainImage = validImages[currentMainImage] || defaultImageSvg;

    return (
        <div className='space-y-4'>
            {/* Image principale */}
            <div className='w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden'>
                <img
                    src={mainImage}
                    alt={title || 'Produit'}
                    className='w-full h-full object-cover'
                    onError={() => handleImageError(currentMainImage)}
                />
            </div>

            {/* Miniatures */}
            {validImages.length > 1 && (
                <div className='grid grid-cols-4 gap-2'>
                    {validImages.slice(0, 5).map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentMainImage(index)}
                            className={`w-full h-24 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden border-2 transition-all ${
                                currentMainImage === index
                                    ? 'border-blue-500 dark:border-blue-400'
                                    : 'border-transparent hover:border-gray-400 dark:hover:border-gray-500'
                            }`}
                        >
                            <img
                                src={image}
                                alt={`${title || 'Produit'} - Image ${index + 1}`}
                                className='w-full h-full object-cover'
                                onError={() => handleImageError(index)}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

