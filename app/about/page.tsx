export default function AboutPage() {
    return (
        <div className='container mx-auto px-4 py-8 max-w-4xl'>
            <header className='mb-8'>
                <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
                    Documentation du Projet Interface ETL
                </h1>
                <p className='text-lg text-gray-600 dark:text-gray-400'>
                    Une interface web moderne pour la gestion et l'exploration de produits via un système ETL
                </p>
            </header>

            <div className='space-y-8'>
                {/* Vue d'ensemble */}
                <section className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                    <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
                        📋 Vue d'ensemble
                    </h2>
                    <p className='text-gray-700 dark:text-gray-300 leading-relaxed mb-4'>
                        Ce projet est une <strong>interface ETL (Extract, Transform, Load)</strong> développée avec Next.js 
                        pour la gestion et l'exploration de produits. L'application permet de visualiser, rechercher et 
                        gérer des produits stockés dans une base de données PostgreSQL via Prisma ORM.
                    </p>
                    <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                        L'interface offre une expérience utilisateur moderne avec un design responsive, un mode sombre, 
                        et des fonctionnalités de recherche en temps réel pour faciliter la navigation dans le catalogue de produits.
                    </p>
                </section>

                {/* Technologies utilisées */}
                <section className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                    <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
                        🛠️ Technologies utilisées
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
                            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>Frontend</h3>
                            <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1'>
                                <li><strong>Next.js 16</strong> - Framework React avec App Router</li>
                                <li><strong>React 19</strong> - Bibliothèque UI</li>
                                <li><strong>TypeScript</strong> - Typage statique</li>
                                <li><strong>Tailwind CSS 4</strong> - Framework CSS utilitaire</li>
                            </ul>
                        </div>
                        <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4'>
                            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>Backend & Base de données</h3>
                            <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1'>
                                <li><strong>Prisma</strong> - ORM pour PostgreSQL</li>
                                <li><strong>PostgreSQL</strong> - Base de données relationnelle (Neon)</li>
                                <li><strong>Next.js API Routes</strong> - Endpoints REST</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Architecture */}
                <section className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                    <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
                        🏗️ Architecture du projet
                    </h2>
                    <div className='space-y-4'>
                        <div>
                            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                                Structure des dossiers
                            </h3>
                            <pre className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-800 dark:text-gray-200'>
{`app/
├── about/          # Documentation du projet
├── api/            # Routes API (recherche de produits)
├── component/      # Composants réutilisables
│   ├── Navbar.tsx
│   └── ProductWidget.tsx
├── product/        # Page de liste des produits
├── scraping-categorie/  # Page de scraping de catégories
├── search/         # Page de recherche
└── layout.tsx      # Layout principal

prisma/
└── schema.prisma   # Schéma de base de données`}
                            </pre>
                        </div>
                    </div>
                </section>

                {/* Fonctionnalités */}
                <section className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                    <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
                        ✨ Fonctionnalités principales
                    </h2>
                    <div className='space-y-4'>
                        <div className='border-l-4 border-blue-500 pl-4'>
                            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                                1. Visualisation des produits
                            </h3>
                            <p className='text-gray-700 dark:text-gray-300'>
                                La page <code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>/product</code> affiche 
                                tous les produits de la base de données sous forme de grille responsive. Chaque produit est 
                                présenté dans un widget avec son image, titre et prix.
                            </p>
                        </div>
                        <div className='border-l-4 border-green-500 pl-4'>
                            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                                2. Recherche de produits
                            </h3>
                            <p className='text-gray-700 dark:text-gray-300'>
                                La page <code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>/search</code> permet 
                                de rechercher des produits en temps réel par titre. La recherche est insensible à la casse 
                                et utilise une API route pour interroger la base de données.
                            </p>
                        </div>
                        <div className='border-l-4 border-purple-500 pl-4'>
                            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                                3. Scraping de catégories
                            </h3>
                            <p className='text-gray-700 dark:text-gray-300'>
                                La page <code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>/scraping-categorie</code> 
                                est dédiée au scraping et à la gestion des catégories de produits (fonctionnalité en développement).
                            </p>
                        </div>
                        <div className='border-l-4 border-orange-500 pl-4'>
                            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                                4. Mode sombre
                            </h3>
                            <p className='text-gray-700 dark:text-gray-300'>
                                L'interface supporte le mode sombre avec un design cohérent et moderne pour améliorer 
                                l'expérience utilisateur.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Modèle de données */}
                <section className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                    <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
                        💾 Modèle de données
                    </h2>
                    <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4'>
                        <p className='text-gray-700 dark:text-gray-300 mb-3'>
                            Le modèle <strong>Product</strong> contient les champs suivants :
                        </p>
                        <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2'>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>id</code> - Identifiant unique (BigInt)</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>itemId</code> - Identifiant de l'article (unique)</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>title</code> - Titre du produit</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>oemReference</code> - Référence OEM</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>priceNet</code> - Prix net</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>priceBrut</code> - Prix brut</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>currency</code> - Devise</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>url</code> - URL du produit</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>images</code> - Tableau d'images</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>seller</code> - Informations du vendeur (JSON)</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>status</code> - Statut (ACTIVE par défaut)</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>listingStartDate</code> - Date de début</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>endDate</code> - Date de fin</li>
                            <li><code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>closedReason</code> - Raison de clôture</li>
                        </ul>
                    </div>
                </section>

                {/* API Routes */}
                <section className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                    <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
                        🔌 API Routes
                    </h2>
                    <div className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4'>
                        <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                            GET /api/products/search
                        </h3>
                        <p className='text-gray-700 dark:text-gray-300 mb-2'>
                            Recherche de produits par titre.
                        </p>
                        <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
                            <strong>Paramètres :</strong> <code className='bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>q</code> (query string)
                        </p>
                        <p className='text-sm text-gray-600 dark:text-gray-400'>
                            <strong>Retourne :</strong> Tableau de produits correspondant à la recherche (max 50 résultats)
                        </p>
                    </div>
                </section>

                {/* Installation et démarrage */}
                <section className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                    <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
                        🚀 Installation et démarrage
                    </h2>
                    <div className='space-y-4'>
                        <div>
                            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                                1. Installation des dépendances
                            </h3>
                            <pre className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-800 dark:text-gray-200'>
{`npm install`}
                            </pre>
                        </div>
                        <div>
                            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                                2. Configuration de la base de données
                            </h3>
                            <p className='text-gray-700 dark:text-gray-300 mb-2'>
                                Assurez-vous que la variable d'environnement <code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>DATABASE_URL</code> 
                                est configurée dans votre fichier <code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>.env</code>.
                            </p>
                            <pre className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-800 dark:text-gray-200'>
{`npx prisma generate
npx prisma migrate dev`}
                            </pre>
                        </div>
                        <div>
                            <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                                3. Lancement du serveur de développement
                            </h3>
                            <pre className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-800 dark:text-gray-200'>
{`npm run dev`}
                            </pre>
                            <p className='text-gray-700 dark:text-gray-300 mt-2'>
                                L'application sera accessible sur <a href='http://localhost:3000' className='text-blue-600 dark:text-blue-400 hover:underline'>http://localhost:3000</a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Navigation */}
                <section className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6'>
                    <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
                        🧭 Navigation
                    </h2>
                    <p className='text-gray-700 dark:text-gray-300 mb-4'>
                        L'application dispose d'une barre de navigation persistante en haut de la page avec les liens suivants :
                    </p>
                    <ul className='list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2'>
                        <li><strong>Accueil</strong> (<code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>/</code>) - Page d'accueil</li>
                        <li><strong>Product</strong> (<code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>/product</code>) - Liste de tous les produits</li>
                        <li><strong>Scraping categorie</strong> (<code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>/scraping-categorie</code>) - Gestion du scraping</li>
                        <li><strong>Search</strong> (<code className='bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded'>/search</code>) - Recherche de produits</li>
                    </ul>
                </section>

                {/* Conclusion */}
                <section className='bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-md p-6 border border-blue-200 dark:border-blue-800'>
                    <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-4'>
                        📝 Conclusion
                    </h2>
                    <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                        Cette interface ETL offre une solution moderne et efficace pour la gestion de produits. 
                        L'architecture basée sur Next.js permet une expérience utilisateur fluide avec un rendu côté serveur 
                        et des interactions client dynamiques. Le système est extensible et peut être facilement adapté 
                        pour répondre à des besoins spécifiques de gestion de données.
                    </p>
                </section>
            </div>
        </div>
    );
}

