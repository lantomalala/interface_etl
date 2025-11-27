import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='container mx-auto px-4 py-16 text-center'>
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                Produit non trouvé
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mb-8'>
                Le produit que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Link
                href='/product'
                className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
            >
                Retour à la liste des produits
            </Link>
        </div>
    );
}

