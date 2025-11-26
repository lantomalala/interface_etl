import { PrismaClient } from "@prisma/client";
interface Product{
    title: string; id: bigint; priceNet: number; images: string
}
const globalForPrisma = globalThis as any;
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const getProducts = async () => {
    return await prisma.product.findMany();
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const products: Product[]= await getProducts();
    console.log(products)
    return (
        <html lang="en">
            <body>
                <header>
                    <h1>Liste des produits</h1>
                    <ul>
                    {products.map(product => (
                            <li key={product.id}>
                                {product.title} - ${product.priceNet} - Stock: {product.images}
                            </li>
                        ))}
                    </ul>
                </header>
                {children}
            </body>
        </html>
    );
}
