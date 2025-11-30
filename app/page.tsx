import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Produits",
      description: "Explorez et gérez tous vos produits en un seul endroit",
      href: "/product",
      icon: "📦",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Recherche",
      description: "Recherchez rapidement des produits par différents critères",
      href: "/search",
      icon: "🔍",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Scraping",
      description: "Gérez le scraping de catégories et collectez des données",
      href: "/scraping-categorie",
      icon: "🕷️",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Export de données",
      description: "Exportez vos données dans différents formats",
      href: "/export-data",
      icon: "📊",
      color: "bg-orange-500 hover:bg-orange-600",
    },
    {
      title: "Annonces",
      description: "Consultez les annonces actives et terminées",
      href: "/anonce",
      icon: "📢",
      color: "bg-pink-500 hover:bg-pink-600",
    },
    {
      title: "À propos",
      description: "Découvrez plus d'informations sur cette application",
      href: "/about",
      icon: "ℹ️",
      color: "bg-gray-500 hover:bg-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Interface ETL
            </h1>
            <p className="text-xl mb-8 text-blue-100 dark:text-blue-200">
              Gestion complète de vos produits et données avec une interface moderne et intuitive
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/product"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Voir les produits
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white/20"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Fonctionnalités principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{feature.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                Accéder
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                ETL
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Extract, Transform, Load
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                ⚡
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Performance optimale
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                🔒
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Sécurisé et fiable
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
