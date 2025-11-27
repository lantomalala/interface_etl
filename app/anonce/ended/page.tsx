import {PrismaClient, Product as PrismaProduct} from '@prisma/client';
import ProductWidget from '../../component/ProductWidget';

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

const getEndedProducts = async (): Promise<Product[]> => {
    const products = await prisma.product.findMany({
        where: {
            status: 'ENDED',
        },
    });
    // Sérialisation des BigInt en string
    return products.map((product: PrismaProduct) => ({
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

export default async function EndedAnoncePage() {
    const products: Product[] = await getEndedProducts();

    return (
        <div className='container mx-auto px-4 py-8'>
            <header className='mb-8'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-6'>
                    Annonces terminées
                </h1>
                <p className='text-gray-600 dark:text-gray-400'>
                    {products.length} annonce{products.length > 1 ? 's' : ''} terminée{products.length > 1 ? 's' : ''}
                </p>
            </header>
            {products.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {products.map(product => (
                        <ProductWidget key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className='text-center py-12'>
                    <p className='text-gray-500 dark:text-gray-400 text-lg'>
                        Aucune annonce terminée pour le moment.
                    </p>
                </div>
            )}
        </div>
    );
}

