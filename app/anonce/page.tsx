import {PrismaClient, Product as PrismaProduct} from '@prisma/client';
import Link from 'next/link';
import ProductWidget from '../component/ProductWidget';

interface Product {
    title: string;
    id: string;
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

const globalForPrisma = globalThis as any;
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const getRandomProducts = async (limit: number = 8): Promise<Product[]> => {
    const products = await prisma.product.findMany({
        take: limit,
        orderBy: {
            createdAt: 'desc',
        },
    });
    // Mélanger les produits pour avoir un rendu aléatoire
    const shuffled = products.sort(() => 0.5 - Math.random());
    // Sérialisation des BigInt en string
    return shuffled.map((product: PrismaProduct) => ({
        ...product,
        id: product.id.toString(),
        title: product.title || '',
        priceNet: product.priceNet || 0,
        currency: product.currency || 'EUR',
        seller: (product.seller as { name?: string; url?: string } | null) || { name: '', url: '' },
        listingStartDate: product.listingStartDate || new Date(),
        endDate: product.endDate || new Date(),
        closedReason: product.closedReason || '',
    }));
};

export default async function AnoncePage() {
    const products: Product[] = await getRandomProducts(8);

    return (
        <div className='container mx-auto px-4 py-8'>
            <header className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
                    Annonces
                </h1>
                <p className='text-gray-600 dark:text-gray-400 mb-6'>
                    Explorez les annonces actives et terminées
                </p>
                
                {/* Boutons de navigation */}
                <div className='flex flex-wrap gap-4 mb-8'>
                    <Link
                        href='/anonce/active'
                        className='inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg'
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
                                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                        Annonces Actives
                    </Link>
                    <Link
                        href='/anonce/ended'
                        className='inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-md hover:shadow-lg'
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
                                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                            />
                        </svg>
                        Annonces Terminées
                    </Link>
                </div>
            </header>

            {/* Produits aléatoires */}
            <div className='mb-8'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
                    Produits récents
                </h2>
                {products.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                        {products.map(product => (
                            <ProductWidget key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className='text-center py-12'>
                        <p className='text-gray-500 dark:text-gray-400 text-lg'>
                            Aucun produit disponible pour le moment.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

