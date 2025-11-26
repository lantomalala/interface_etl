import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(products);
    } catch (error) {
        console.error('Erreur lors de la recherche:', error);
        return NextResponse.json({ error: 'Erreur lors de la recherche' }, { status: 500 });
    }
}

