import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductImageGallery from '../../component/ProductImageGallery';
import ExportButtons from '../../component/ExportButtons';

const globalForPrisma = globalThis as any;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

interface ProductDetail {
    id: bigint;
    itemId: string;
    title: string | null;
    oemReference: string | null;
    priceNet: number | null;
    priceBrut: number | null;
    currency: string | null;
    url: string | null;
    images: string[];
    seller: any;
    listingStartDate: Date | null;
    status: string;
    endDate: Date | null;
    closedReason: string | null;
    createdAt: Date;
    updatedAt: Date;
}

async function getProduct(itemId: string): Promise<ProductDetail | null> {
    try {
        // Rechercher par itemId uniquement
        const product = await prisma.product.findUnique({
            where: {
                itemId: itemId,
            },
        });
        
        return product;
    } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        return null;
    }
}

function formatDate(date: Date | null): string {
    if (!date) return 'Non disponible';
    return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function formatPrice(price: number | null, currency: string | null): string {
    if (price === null) return 'Non disponible';
    const currencySymbol = currency || 'EUR';
    return `${price.toFixed(2)} ${currencySymbol}`;
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await getProduct(id); // id contient maintenant l'itemId

    if (!product) {
        notFound();
    }

    const seller = product.seller as { name?: string; lien?: string } | null;

    return (
        <div className='container mx-auto px-4 py-8 max-w-6xl'>
            {/* Bouton retour */}
            <Link
                href='/product'
                className='inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors'
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
                        d='M10 19l-7-7m0 0l7-7m-7 7h18'
                    />
                </svg>
                Retour à la liste
            </Link>

            <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-8'>
                    {/* Images */}
                    <div>
                        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                            Images
                        </h2>
                        <ProductImageGallery 
                            images={product.images || []} 
                            title={product.title}
                        />
                    </div>

                    {/* Informations principales */}
                    <div>
                        <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                            {product.title || 'Produit sans titre'}
                        </h1>

                        <div className='space-y-6 mb-8'>
                            {/* Prix */}
                            <div>
                                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2'>
                                    Prix
                                </h3>
                                <div className='space-y-2'>
                                    <p className='text-3xl font-bold text-blue-600 dark:text-blue-400'>
                                        {formatPrice(product.priceNet, product.currency)}
                                    </p>
                                    {product.priceBrut && (
                                        <p className='text-lg text-gray-600 dark:text-gray-400'>
                                            Prix brut: {formatPrice(product.priceBrut, product.currency)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Statut */}
                            <div>
                                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2'>
                                    Statut
                                </h3>
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                        product.status === 'ACTIVE'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                    }`}
                                >
                                    {product.status}
                                </span>
                            </div>

                            {/* Bouton URL si disponible */}
                            {product.url && (
                                <div>
                                    <a
                                        href={product.url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                                    >
                                        Voir sur le site d'origine
                                        <svg
                                            className='w-5 h-5 ml-2'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                                            />
                                        </svg>
                                    </a>
                                </div>
                            )}

                            {/* Boutons d'export */}
                            <div>
                                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2'>
                                    Export des données
                                </h3>
                                <ExportButtons product={product} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Détails supplémentaires */}
                <div className='border-t border-gray-200 dark:border-gray-700 p-8'>
                    <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>
                        Détails du produit
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {/* Informations générales */}
                        <div className='space-y-4'>
                            <div>
                                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1'>
                                    ID du produit
                                </h3>
                                <p className='text-gray-900 dark:text-white'>{product.itemId}</p>
                            </div>

                            {product.oemReference && (
                                <div>
                                    <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1'>
                                        Référence OEM
                                    </h3>
                                    <p className='text-gray-900 dark:text-white'>{product.oemReference}</p>
                                </div>
                            )}

                            <div>
                                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1'>
                                    Date de création
                                </h3>
                                <p className='text-gray-900 dark:text-white'>
                                    {formatDate(product.createdAt)}
                                </p>
                            </div>

                            <div>
                                <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1'>
                                    Dernière mise à jour
                                </h3>
                                <p className='text-gray-900 dark:text-white'>
                                    {formatDate(product.updatedAt)}
                                </p>
                            </div>
                        </div>

                        {/* Informations vendeur et dates */}
                        <div className='space-y-4'>
                            {seller && (seller.name || seller.lien) && (
                                <div>
                                    <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1'>
                                        Vendeur
                                    </h3>
                                    <div className='space-y-1'>
                                        {seller.name && (
                                            <p className='text-gray-900 dark:text-white'>{seller.name}</p>
                                        )}
                                        {seller.lien && (
                                            <a
                                                href={seller.lien}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                className='text-blue-600 dark:text-blue-400 hover:underline text-sm'
                                            >
                                                {seller.lien}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {product.listingStartDate && (
                                <div>
                                    <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1'>
                                        Date de début d'annonce
                                    </h3>
                                    <p className='text-gray-900 dark:text-white'>
                                        {formatDate(product.listingStartDate)}
                                    </p>
                                </div>
                            )}

                            {product.endDate && (
                                <div>
                                    <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1'>
                                        Date de fin
                                    </h3>
                                    <p className='text-gray-900 dark:text-white'>
                                        {formatDate(product.endDate)}
                                    </p>
                                </div>
                            )}

                            {product.closedReason && (
                                <div>
                                    <h3 className='text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1'>
                                        Raison de clôture
                                    </h3>
                                    <p className='text-gray-900 dark:text-white'>{product.closedReason}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

