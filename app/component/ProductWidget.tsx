'use client';

import Link from 'next/link';
import ProductImageWithFallback from './ProductImageWithFallback';

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

interface ProductWidgetProps {
    product: Product;
}

export default function ProductWidget({product}: ProductWidgetProps) {
    return (
        <Link href={`/product/${product.itemId}`}>
            <div id={product.itemId} className='bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 cursor-pointer hover:scale-105'>
                <div className='p-4'>
                    <div className='w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center overflow-hidden'>
                        <ProductImageWithFallback
                            src={product.images && product.images.length > 0 ? product.images[0] : null}
                            alt={product.title}
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2'>{product.title}</h3>
                    <div className='flex justify-between items-center'>
                        <p className='text-xl font-bold text-blue-600 dark:text-blue-400'>
                            {product.priceNet.toFixed(2)} {product.currency}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
