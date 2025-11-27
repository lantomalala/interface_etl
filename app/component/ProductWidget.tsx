'use client';

interface Product {
    title: string;
    id: bigint;
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
        <div id={product.itemId} className='bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 dark:border-gray-700'>
            <div className='p-4'>
                {product.images && (
                    <div className='w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-md mb-4 flex items-center justify-center overflow-hidden'>
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className='w-full h-full object-cover'
                            onError={e => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                    </div>
                )}
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2'>{product.title}</h3>
                <div className='flex justify-between items-center'>
                    <p className='text-xl font-bold text-blue-600 dark:text-blue-400'>
                        {product.priceNet.toFixed(2)} {product.currency}
                    </p>
                </div>
            </div>
        </div>
    );
}
