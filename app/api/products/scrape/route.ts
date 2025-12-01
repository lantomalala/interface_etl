import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        // Faire la requête vers l'API externe depuis le serveur (pas de problème CORS)
        const response = await axios.post(
            'https://gestion-de-produits.onrender.com/products/product',
            { url },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return NextResponse.json(response.data);
    } catch (err: any) {
        // Gérer les erreurs axios
        if (err.response) {
            // L'API a répondu avec un code d'erreur
            const errorData = err.response.data;
            const errorMessage = errorData.error || errorData.message || `Erreur HTTP: ${err.response.status}`;
            
            return NextResponse.json(
                { error: errorMessage },
                { status: err.response.status || 500 }
            );
        } else if (err.request) {
            // La requête a été faite mais aucune réponse n'a été reçue
            return NextResponse.json(
                { error: 'Aucune réponse du serveur. Vérifiez votre connexion.' },
                { status: 503 }
            );
        } else {
            // Erreur lors de la configuration de la requête
            return NextResponse.json(
                { error: err.message || 'Erreur inconnue' },
                { status: 500 }
            );
        }
    }
}

