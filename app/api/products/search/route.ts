import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Product as PrismaProduct } from '@prisma/client';

// Type pour les produits renvoyés côté API
type SerializedProduct = {
    id: string;
    title: string;
    itemId: string;
    priceNet: number;
    images: string[];
    currency: string;
    seller: {
        name: string;
        url: string;
    };
    listingStartDate: Date;
    status: string;
    endDate: Date;
    closedReason: string;
};

const globalForPrisma = globalThis as any;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q') || '';

        if (!query.trim()) {
            return NextResponse.json([]);
        }

        const products = await prisma.product.findMany({
            where: {
                title: {
                    not: null,
                    contains: query,
                    mode: 'insensitive',
                },
            },
            take: 50,
            orderBy: { createdAt: 'desc' },
        });

        // Sérialisation des BigInt en string avec type explicite
        const serializedProducts: SerializedProduct[] = products.map((product: PrismaProduct) => ({
            ...product,
            id: product.id.toString(),
        }));

        return NextResponse.json(serializedProducts);
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        return NextResponse.json({ error: 'Erreur lors de la recherche' }, { status: 500 });
    }
}
