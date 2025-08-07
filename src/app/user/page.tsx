import CreateUser from '../_components/CreateUser';
import { getSession } from '../_lib/auth';

export default async function User() {
    const session = await getSession();

    if (!session || !session.user || !session.user.token) {
        console.error('Invalid session or missing token.');
        return (
            <section>
                <h1>Användare</h1>
                <p>Authentication failed. Please log in again.</p>
            </section>
        );
    }

    const token = session.user.token;

    return (
        <section>
            <h1>Lägg till ny användare</h1>

            <CreateUser token={token} />
        </section>
    );
}
