'use client';

import { useState } from 'react';
import axios from 'axios';

interface ScrapingResult {
    success: boolean;
    itemId: string;
    message?: string;
    data?: any;
}

export default function ScrapingCategoriePage() {
    const [singleItemId, setSingleItemId] = useState('');
    const [multipleItemIds, setMultipleItemIds] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<ScrapingResult[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<'single' | 'multiple'>('single');

    const extractItemId = (input: string): string | null => {
        // Si c'est une URL eBay, extraire l'itemId
        const urlMatch = input.match(/\/itm\/(\d+)/);
        if (urlMatch) {
            return urlMatch[1];
        }
        // Sinon, considérer que c'est directement l'itemId
        const trimmed = input.trim();
        return trimmed.length > 0 ? trimmed : null;
    };

    const buildEbayUrl = (itemId: string): string => {
        // Construire l'URL eBay simple sans paramètres supplémentaires
        return `https://www.ebay.com/itm/${itemId}`;
    };

    const scrapeProduct = async (itemId: string): Promise<ScrapingResult> => {
        try {
            const url = buildEbayUrl(itemId);
            // Body doit être exactement: { "url": "https://www.ebay.com/itm/333585471677" }
            const requestBody = {
                url: url
            };

            // Utiliser la route API Next.js locale qui fait le proxy (évite les problèmes CORS)
            const response = await axios.post('/api/products/scrape', requestBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Axios retourne les données dans response.data
            return {
                success: true,
                itemId,
                data: response.data
            };
        } catch (err: any) {
            // Gérer les erreurs axios
            let errorMessage = 'Erreur inconnue';
            
            if (err.response) {
                // L'API a répondu avec un code d'erreur
                const errorData = err.response.data;
                errorMessage = errorData.error || errorData.message || `Erreur HTTP: ${err.response.status}`;
            } else if (err.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                errorMessage = 'Aucune réponse du serveur. Vérifiez votre connexion.';
            } else if (err instanceof Error) {
                // Erreur lors de la configuration de la requête
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }

            return {
                success: false,
                itemId,
                message: errorMessage
            };
        }
    };

    const handleSingleScrape = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!singleItemId.trim()) {
            setError('Veuillez saisir un itemId');
            return;
        }

        setLoading(true);
        setError(null);
        setResults([]);

        const itemId = extractItemId(singleItemId);
        if (!itemId) {
            setError('ItemId invalide. Veuillez entrer un itemId ou une URL eBay valide.');
            setLoading(false);
            return;
        }

        const result = await scrapeProduct(itemId);
        setResults([result]);
        setLoading(false);

        if (!result.success) {
            setError(result.message || 'Erreur lors du scraping');
        } else {
            setSingleItemId('');
        }
    };

    const handleMultipleScrape = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!multipleItemIds.trim()) {
            setError('Veuillez saisir au moins un itemId');
            return;
        }

        setLoading(true);
        setError(null);
        setResults([]);

        // Parser les itemIds (séparés par virgule, point-virgule, ou retour à la ligne)
        const inputs = multipleItemIds
            .split(/[,\n;]/)
            .map(id => id.trim())
            .filter(id => id.length > 0);

        if (inputs.length === 0) {
            setError('Aucun itemId valide trouvé');
            setLoading(false);
            return;
        }

        // Extraire les itemIds
        const itemIds: string[] = [];
        for (const input of inputs) {
            const itemId = extractItemId(input);
            if (itemId) {
                itemIds.push(itemId);
            }
        }

        if (itemIds.length === 0) {
            setError('Aucun itemId valide trouvé dans la liste');
            setLoading(false);
            return;
        }

        // Scraper tous les produits en parallèle
        const scrapingPromises = itemIds.map(itemId => scrapeProduct(itemId));
        const scrapingResults = await Promise.all(scrapingPromises);

        setResults(scrapingResults);
        setLoading(false);

        const successCount = scrapingResults.filter(r => r.success).length;
        const failCount = scrapingResults.filter(r => !r.success).length;

        if (failCount > 0) {
            setError(`${failCount} produit(s) ont échoué sur ${itemIds.length} total`);
        } else {
            setMultipleItemIds('');
        }
    };

    return (
        <div className='container mx-auto px-4 py-8'>
            <header className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>Scraping de produits</h1>
                <p className='text-gray-600 dark:text-gray-400'>Scrapez des produits eBay en utilisant leur itemId</p>
            </header>

            {/* Mode selector */}
            <div className='mb-6 flex gap-4'>
                <button
                    onClick={() => {
                        setMode('single');
                        setResults([]);
                        setError(null);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'single' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                >
                    Scraper un produit
                </button>
                <button
                    onClick={() => {
                        setMode('multiple');
                        setResults([]);
                        setError(null);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'multiple' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                >
                    Scraper plusieurs produits
                </button>
            </div>

            {/* Single product scraping */}
            {mode === 'single' && (
                <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6'>
                    <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>Scraper un produit unique</h2>
                    <form onSubmit={handleSingleScrape} className='space-y-4'>
                        <div>
                            <label htmlFor='singleItemId' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                                ItemId ou URL eBay
                            </label>
                            <input id='singleItemId' type='text' value={singleItemId} onChange={e => setSingleItemId(e.target.value)} placeholder='Ex: 333585471677 ou https://www.ebay.com/itm/333585471677' className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent' disabled={loading} />
                            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>Vous pouvez entrer directement l'itemId ou coller l'URL complète</p>
                        </div>
                        <button type='submit' disabled={loading || !singleItemId.trim()} className='w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'>
                            {loading ? 'Scraping en cours...' : 'Scraper le produit'}
                        </button>
                    </form>
                </div>
            )}

            {/* Multiple products scraping */}
            {mode === 'multiple' && (
                <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6'>
                    <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>Scraper plusieurs produits</h2>
                    <form onSubmit={handleMultipleScrape} className='space-y-4'>
                        <div>
                            <label htmlFor='multipleItemIds' className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                                Liste d'itemIds (séparés par virgule, point-virgule ou retour à la ligne)
                            </label>
                            <textarea
                                id='multipleItemIds'
                                value={multipleItemIds}
                                onChange={e => setMultipleItemIds(e.target.value)}
                                placeholder='Ex: 333585471677, 333585471678, 333585471679&#10;ou&#10;https://www.ebay.com/itm/333585471677&#10;https://www.ebay.com/itm/333585471678'
                                rows={6}
                                className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm'
                                disabled={loading}
                            />
                            <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>Entrez un itemId ou URL par ligne, ou séparez-les par des virgules</p>
                        </div>
                        <button type='submit' disabled={loading || !multipleItemIds.trim()} className='w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors'>
                            {loading ? 'Scraping en cours...' : 'Scraper les produits'}
                        </button>
                    </form>
                </div>
            )}

            {/* Error display */}
            {error && (
                <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6'>
                    <p className='text-red-800 dark:text-red-200'>{error}</p>
                </div>
            )}

            {/* Results display */}
            {results.length > 0 && (
                <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                    <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>Résultats du scraping ({results.length} produit(s))</h2>
                    <div className='space-y-4'>
                        {results.map((result, index) => (
                            <div key={index} className={`border rounded-lg p-4 ${result.success ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'}`}>
                                <div className='flex items-start justify-between mb-2'>
                                    <div>
                                        <span className='font-medium text-gray-900 dark:text-white'>ItemId: {result.itemId}</span>
                                        <span className={`ml-3 px-2 py-1 rounded text-xs font-medium ${result.success ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200'}`}>{result.success ? '✓ Succès' : '✗ Échec'}</span>
                                    </div>
                                </div>
                                {result.success && result.data && (
                                    <div className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                                        <p className='font-medium mb-1'>Données récupérées:</p>
                                        <pre className='bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto text-xs'>{JSON.stringify(result.data, null, 2)}</pre>
                                    </div>
                                )}
                                {!result.success && result.message && (
                                    <div className='mt-2'>
                                        <p className='text-sm font-medium text-red-700 dark:text-red-300 mb-1'>Erreur:</p>
                                        <pre className='text-sm text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 p-3 rounded overflow-x-auto whitespace-pre-wrap break-words'>{result.message.trim()}</pre>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                            Succès: {results.filter(r => r.success).length} / {results.length}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
