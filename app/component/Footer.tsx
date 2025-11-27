import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto'>
            <div className='container mx-auto px-4 py-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {/* À propos */}
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                            À propos
                        </h3>
                        <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                            Interface ETL moderne pour la gestion et l'exploration de produits. 
                            Développée avec Next.js, Prisma et PostgreSQL pour offrir une expérience 
                            utilisateur optimale.
                        </p>
                    </div>

                    {/* Navigation rapide */}
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                            Navigation
                        </h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link 
                                    href='/' 
                                    className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors'
                                >
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href='/product' 
                                    className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors'
                                >
                                    Produits
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href='/search' 
                                    className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors'
                                >
                                    Recherche
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href='/about' 
                                    className='text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors'
                                >
                                    Documentation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Auteur */}
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                            Auteur
                        </h3>
                        <p className='text-gray-600 dark:text-gray-400 text-sm mb-2'>
                            <span className='font-medium text-gray-900 dark:text-white'>
                                Justin Lantomalala
                            </span>
                        </p>
                        <p className='text-gray-600 dark:text-gray-400 text-sm leading-relaxed'>
                            Développeur passionné par les technologies web modernes et les solutions 
                            innovantes pour la gestion de données.
                        </p>
                    </div>
                </div>

                {/* Copyright */}
                <div className='mt-8 pt-6 border-t border-gray-200 dark:border-gray-700'>
                    <div className='flex flex-col md:flex-row justify-between items-center'>
                        <p className='text-gray-600 dark:text-gray-400 text-sm'>
                            © {currentYear} Interface ETL. Tous droits réservés.
                        </p>
                        <p className='text-gray-600 dark:text-gray-400 text-sm mt-2 md:mt-0'>
                            Développé avec  par <span className='font-medium text-gray-900 dark:text-white'>Justin Lantomalala</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

