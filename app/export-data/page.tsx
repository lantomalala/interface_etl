'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';

interface ProductData {
    id: string;
    itemId: string;
    title: string | null;
    oemReference: string | null;
    priceNet: number | null;
    priceBrut: number | null;
    currency: string | null;
    url: string | null;
    images: string[];
    status: string;
    listingStartDate: Date | null;
    endDate: Date | null;
    closedReason: string | null;
    createdAt: Date;
    updatedAt: Date;
    seller: { name?: string; url?: string } | null | any;
}

export default function ExportDataPage() {
    const [itemIdsInput, setItemIdsInput] = useState('');
    const [products, setProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const formatDate = (date: Date | string | null): string => {
        if (!date) return 'Non disponible';
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatPrice = (price: number | null, currency: string | null): string => {
        if (price === null) return 'Non disponible';
        const currencySymbol = currency || 'EUR';
        return `${price.toFixed(2)} ${currencySymbol}`;
    };

    const handleFetchProducts = async () => {
        setLoading(true);
        setError(null);
        setProducts([]);

        try {
            // Parser les itemIds (séparés par virgule, point-virgule, ou retour à la ligne)
            const itemIds = itemIdsInput
                .split(/[,\n;]/)
                .map(id => id.trim())
                .filter(id => id.length > 0);

            if (itemIds.length === 0) {
                setError('Veuillez saisir au moins un itemId');
                setLoading(false);
                return;
            }

            const response = await fetch('/api/products/export', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemIds }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erreur lors de la récupération des produits');
            }

            const data = await response.json();
            setProducts(data);

            if (data.length === 0) {
                setError('Aucun produit trouvé pour les itemIds fournis');
            } else if (data.length < itemIds.length) {
                setError(
                    `Seulement ${data.length} produit(s) trouvé(s) sur ${itemIds.length} itemId(s) fourni(s)`
                );
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    const prepareDataForExport = () => {
        return products.map(product => ({
            'ID du produit': product.itemId,
            'Titre': product.title || 'Non disponible',
            'Référence OEM': product.oemReference || 'Non disponible',
            'Prix net': formatPrice(product.priceNet, product.currency),
            'Prix brut': formatPrice(product.priceBrut, product.currency),
            'Devise': product.currency || 'Non disponible',
            'URL': product.url || 'Non disponible',
            'Statut': product.status,
            'Vendeur': product.seller?.name || 'Non disponible',
            'URL vendeur': product.seller?.lien || 'Non disponible',
            'Date de début d\'annonce': formatDate(product.listingStartDate),
            'Date de fin': formatDate(product.endDate),
            'Raison de clôture': product.closedReason || 'Non disponible',
            'Date de création': formatDate(product.createdAt),
            'Dernière mise à jour': formatDate(product.updatedAt),
            'Nombre d\'images': product.images?.length || 0,
            'Images': product.images?.join('; ') || 'Non disponible',
        }));
    };

    const exportToCSV = () => {
        if (products.length === 0) {
            setError('Aucun produit à exporter');
            return;
        }

        const data = prepareDataForExport();
        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(','),
            ...data.map(row =>
                headers
                    .map(header => {
                        const value = row[header as keyof typeof row];
                        return `"${String(value).replace(/"/g, '""')}"`;
                    })
                    .join(',')
            ),
        ];

        const csvContent = csvRows.join('\n');
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute(
            'download',
            `export_produits_${new Date().toISOString().split('T')[0]}.csv`
        );
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToExcel = () => {
        if (products.length === 0) {
            setError('Aucun produit à exporter');
            return;
        }

        const data = prepareDataForExport();
        const worksheetData = [Object.keys(data[0]), ...data.map(row => Object.values(row))];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(worksheetData);

        // Ajuster la largeur des colonnes
        const colWidths = Object.keys(data[0]).map(() => ({ wch: 25 }));
        ws['!cols'] = colWidths;

        XLSX.utils.book_append_sheet(wb, ws, 'Données produits');

        XLSX.writeFile(wb, `export_produits_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className='container mx-auto px-4 py-8 max-w-6xl'>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-8'>
                Export de données
            </h1>

            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8'>
                <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
                    Saisir les ItemIds
                </h2>
                <p className='text-gray-600 dark:text-gray-400 mb-4 text-sm'>
                    Saisissez un ou plusieurs itemIds, séparés par des virgules, des points-virgules
                    ou des retours à la ligne.
                </p>

                <textarea
                    value={itemIdsInput}
                    onChange={e => setItemIdsInput(e.target.value)}
                    placeholder='Exemple: ITEM001, ITEM002, ITEM003'
                    className='w-full h-32 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                />

                <button
                    onClick={handleFetchProducts}
                    disabled={loading || !itemIdsInput.trim()}
                    className='mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center'
                >
                    {loading ? (
                        <>
                            <svg
                                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                            >
                                <circle
                                    className='opacity-25'
                                    cx='12'
                                    cy='12'
                                    r='10'
                                    stroke='currentColor'
                                    strokeWidth='4'
                                ></circle>
                                <path
                                    className='opacity-75'
                                    fill='currentColor'
                                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                                ></path>
                            </svg>
                            Chargement...
                        </>
                    ) : (
                        <>
                            <svg
                                className='w-5 h-5 mr-2'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                />
                            </svg>
                            Récupérer les produits
                        </>
                    )}
                </button>

                {error && (
                    <div className='mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg'>
                        {error}
                    </div>
                )}
            </div>

            {products.length > 0 && (
                <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
                            Produits trouvés ({products.length})
                        </h2>
                        <div className='flex gap-4'>
                            <button
                                onClick={exportToCSV}
                                className='inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium'
                            >
                                <svg
                                    className='w-5 h-5 mr-2'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                    />
                                </svg>
                                Export CSV
                            </button>
                            <button
                                onClick={exportToExcel}
                                className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
                            >
                                <svg
                                    className='w-5 h-5 mr-2'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                                    />
                                </svg>
                                Export Excel
                            </button>
                        </div>
                    </div>

                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
                            <thead className='bg-gray-50 dark:bg-gray-700'>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                                        ItemId
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                                        Titre
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                                        Prix
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                                        Statut
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700'>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                                            {product.itemId}
                                        </td>
                                        <td className='px-6 py-4 text-sm text-gray-900 dark:text-white'>
                                            {product.title || 'Sans titre'}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                                            {formatPrice(product.priceNet, product.currency)}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                                    product.status === 'ACTIVE'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}
                                            >
                                                {product.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

