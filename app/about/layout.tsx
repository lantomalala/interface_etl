import { Metadata } from 'next';
export const metadata: Metadata = {
  title: "About",
  description: "About page",
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

