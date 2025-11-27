'use client';

import { useState } from 'react';
import ProductWidget from '../component/ProductWidget';

interface Product {
    title: string;
    id: string; // id en string après sérialisation
    itemId: string;
    priceNet: number;
    images: string[];
    currency: string;
    seller: {
        name: string;
        url: string;
    };
    listingStartDate: Date;
    status: string;
    endDate: Date;
    closedReason: string;
}

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setLoading(true);
        setHasSearched(true);
        try {
            const response = await fetch(`/api/products/search?q=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) throw new Error('Erreur lors de la recherche');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Erreur lors de la recherche:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container mx-auto px-4 py-8'>
            <header className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>Recherche de produits</h1>
                <form onSubmit={handleSearch} className='max-w-2xl'>
                    <div className='flex gap-2'>
                        <input
                            type='text'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder='Rechercher par titre ou itemId...'
                            className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        <button
                            type='submit'
                            disabled={loading}
                            className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
                        >
                            {loading ? 'Recherche...' : 'Rechercher'}
                        </button>
                    </div>
                </form>
            </header>

            {loading && (
                <p className='text-gray-600 dark:text-gray-400 text-center py-8'>Recherche en cours...</p>
            )}

            {!loading && products.length > 0 && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {products.map(product => (
                        <ProductWidget key={product.id} product={product} />
                    ))}
                </div>
            )}

            {!loading && hasSearched && products.length === 0 && (
                <p className='text-gray-600 dark:text-gray-400 text-center py-8'>
                    Aucun produit trouvé pour "{searchTerm}"
                </p>
            )}
        </div>
    );
}
