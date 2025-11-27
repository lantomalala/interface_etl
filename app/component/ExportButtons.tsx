'use client';

import * as XLSX from 'xlsx';

interface ProductData {
    itemId: string;
    title: string | null;
    oemReference: string | null;
    priceNet: number | null;
    priceBrut: number | null;
    currency: string | null;
    url: string | null;
    status: string;
    listingStartDate: Date | null;
    endDate: Date | null;
    closedReason: string | null;
    createdAt: Date;
    updatedAt: Date;
    seller: { name?: string; url?: string } | null | any;
    images: string[];
}

interface ExportButtonsProps {
    product: ProductData;
}

export default function ExportButtons({ product }: ExportButtonsProps) {
    const formatDate = (date: Date | null): string => {
        if (!date) return 'Non disponible';
        return new Date(date).toLocaleDateString('fr-FR', {
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

    const prepareData = () => {
        return {
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
        };
    };

    const exportToCSV = () => {
        const data = prepareData();
        const headers = Object.keys(data);
        const values = Object.values(data);
        
        // Créer le contenu CSV
        const csvContent = [
            headers.join(','),
            values.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')
        ].join('\n');
        
        // Créer le blob et télécharger
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `produit_${product.itemId}_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToExcel = () => {
        const data = prepareData();
        
        // Préparer les données pour Excel
        const worksheetData = [
            Object.keys(data),
            Object.values(data)
        ];
        
        // Créer le workbook et la worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(worksheetData);
        
        // Ajuster la largeur des colonnes
        ws['!cols'] = [{ wch: 25 }, { wch: 50 }];
        
        // Ajouter la worksheet au workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Données produit');
        
        // Télécharger le fichier
        XLSX.writeFile(wb, `produit_${product.itemId}_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="flex gap-4 mt-6">
            <button
                onClick={exportToCSV}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
                <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                Export CSV
            </button>
            <button
                onClick={exportToExcel}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
                <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                Export Excel
            </button>
        </div>
    );
}

