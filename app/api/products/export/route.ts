import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Product as PrismaProduct } from '@prisma/client';

const globalForPrisma = globalThis as any;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

interface SerializedProduct {
    id: string;
    itemId: string;
    title: string | null;
    oemReference: string | null;
    priceNet: number | null;
    priceBrut: number | null;
    currency: string | null;
    url: string | null;
    images: string[];
    seller: any;
    listingStartDate: Date | null;
    status: string;
    endDate: Date | null;
    closedReason: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { itemIds } = body;

        if (!itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
            return NextResponse.json(
                { error: 'Veuillez fournir un tableau de itemIds' },
                { status: 400 }
            );
        }

        // Récupérer les produits par itemId
        const products = await prisma.product.findMany({
            where: {
                itemId: {
                    in: itemIds,
                },
            },
        });

        // Sérialiser les BigInt en string
        const serializedProducts: SerializedProduct[] = products.map((product: PrismaProduct) => ({
            ...product,
            id: product.id.toString(),
        }));

        return NextResponse.json(serializedProducts);
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la récupération des produits' },
            { status: 500 }
        );
    }
}

