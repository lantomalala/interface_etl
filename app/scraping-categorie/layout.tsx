import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Scraping de produits',
    description: 'Scrapez des produits eBay en utilisant leur itemId',
};

export default function ScrapingCategorieLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}

