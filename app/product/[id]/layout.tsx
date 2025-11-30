import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Product Detail",
  description: "Détail du produit",
};
export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
