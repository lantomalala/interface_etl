'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Accueil' },
        { href: '/product', label: 'Product' },
        { href: '/scraping-categorie', label: 'Scraping categorie' },
        { href: '/search', label: 'Search' },
        { href: '/export-data', label: 'Export Data' },
        { href: '/about', label: 'About' },
    ];

    return (
        <nav className='bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50'>
            <div className='container mx-auto px-4'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center space-x-8'>
                        {navLinks.map(link => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-blue-600 text-white dark:bg-blue-500'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}

