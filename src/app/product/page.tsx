import Link from 'next/link';
import { getSession } from '../_lib/auth';
import ListProducts from '../_components/ListProducts';

export default async function Product() {
    const session = await getSession();

    // Check for token validity in the session.
    if (!session || !session.user || !session.user.token) {
        console.error('Invalid session or missing token.');
        return (
            <section>
                <h1>Products</h1>
                <p>Authentication failed. Please log in again.</p>
            </section>
        );
    }

    const token = session.user.token;

    return (
        <section>
            <ListProducts token={token} />
        </section>
    );
}
