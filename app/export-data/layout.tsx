import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Export Data",
  description: "Exportation des données",
};
export default function ExportDataLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
