import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Search",
  description: "Search page",
};
export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
