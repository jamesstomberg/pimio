import { getSession } from '../_lib/auth';
import ListProducts from '../_components/ListProducts';

export default async function Product() {
    const session = await getSession();

    if (!session || !session.user || !session.user.token) {
        console.error('Invalid session or missing token.');
        return (
            <section className="container mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Produkter</h1>
                <p className="text-lg text-gray-800">Authentication failed. Please log in again.</p>
            </section>
        );
    }

    const token = session.user.token;

    return (
        <section className="container mx-auto py-10 px-4">
            <ListProducts token={token} />
        </section>
    );
}
