


# Interface ETL - Gestion de Produits

Une interface web moderne développée avec Next.js pour la gestion et l'exploration de produits via un système ETL (Extract, Transform, Load).

## 📋 Description

Ce projet est une application web qui permet de visualiser, rechercher et gérer des produits stockés dans une base de données PostgreSQL. L'interface offre une expérience utilisateur moderne avec un design responsive, un mode sombre, et des fonctionnalités de recherche en temps réel.

## 🛠️ Technologies utilisées

### Frontend
- **Next.js 16** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Framework CSS utilitaire

### Backend & Base de données
- **Prisma** - ORM pour PostgreSQL
- **PostgreSQL** - Base de données relationnelle (Neon)
- **Next.js API Routes** - Endpoints REST

## ✨ Fonctionnalités

- 📦 **Visualisation des produits** - Affichage de tous les produits en grille responsive
- 🔍 **Recherche en temps réel** - Recherche de produits par titre avec API dédiée
- 🕷️ **Scraping de catégories** - Gestion du scraping de catégories de produits
- 🌙 **Mode sombre** - Support du mode sombre pour une meilleure expérience
- 📱 **Design responsive** - Interface adaptée à tous les écrans

## 🚀 Installation

### Prérequis

- Node.js 18+ 
- npm, yarn, pnpm ou bun
- PostgreSQL (ou compte Neon pour une base de données cloud)

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <url-du-repo>
cd interface_etl
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configurer la base de données**

Créer un fichier `.env` à la racine du projet :
```env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

4. **Initialiser Prisma**
```bash
npx prisma generate
npx prisma migrate dev
```

5. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
interface_etl/
├── app/
│   ├── about/              # Documentation du projet
│   ├── api/                # Routes API
│   │   └── products/
│   │       └── search/      # Endpoint de recherche
│   ├── component/          # Composants réutilisables
│   │   ├── Navbar.tsx      # Barre de navigation
│   │   └── ProductWidget.tsx # Widget d'affichage produit
│   ├── product/            # Page de liste des produits
│   ├── scraping-categorie/ # Page de scraping
│   ├── search/             # Page de recherche
│   └── layout.tsx          # Layout principal
├── prisma/
│   └── schema.prisma       # Schéma de base de données
└── public/                  # Fichiers statiques
```

## 🧭 Navigation

L'application dispose de plusieurs pages accessibles via la barre de navigation :

- **Accueil** (`/`) - Page d'accueil
- **Product** (`/product`) - Liste de tous les produits
- **Scraping categorie** (`/scraping-categorie`) - Gestion du scraping
- **Search** (`/search`) - Recherche de produits
- **About** (`/about`) - Documentation du projet

## 💾 Modèle de données

Le modèle `Product` contient les champs suivants :

- `id` - Identifiant unique (BigInt)
- `itemId` - Identifiant de l'article (unique)
- `title` - Titre du produit
- `oemReference` - Référence OEM
- `priceNet` - Prix net
- `priceBrut` - Prix brut
- `currency` - Devise
- `url` - URL du produit
- `images` - Tableau d'images
- `seller` - Informations du vendeur (JSON)
- `status` - Statut (ACTIVE par défaut)
- `listingStartDate` - Date de début
- `endDate` - Date de fin
- `closedReason` - Raison de clôture
- `createdAt` - Date de création
- `updatedAt` - Date de mise à jour

## 🔌 API Routes

### GET /api/products/search

Recherche de produits par titre.

**Paramètres :**
- `q` (query string) - Terme de recherche

**Exemple :**
```bash
GET /api/products/search?q=laptop
```

**Réponse :**
```json
[
  {
    "id": "1",
    "title": "Laptop Dell",
    "priceNet": 999.99,
    "currency": "EUR",
    ...
  }
]
```

## 📝 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Démarrer en production
npm start

# Linter
npm run lint
```

## 🎨 Personnalisation

Le projet utilise Tailwind CSS pour le styling. Vous pouvez personnaliser les couleurs et le thème en modifiant le fichier `app/globals.css` ou en configurant Tailwind dans `tailwind.config.js`.

## 📚 Documentation

Pour plus de détails sur le projet, consultez la page de documentation intégrée à l'adresse `/about` une fois l'application lancée.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est sous licence MIT.

## 🔗 Liens utiles

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation React](https://react.dev)
