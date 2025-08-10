import CreateUser from '../_components/CreateUser';
import { getSession } from '../_lib/auth';

export default async function User() {
    const session = await getSession();

    if (!session || !session.user || !session.user.token) {
        return;
    }

    const token = session.user.token;

    return (
        <section>
            <h1 className="text-3xl text-blue-600">Lägg till ny användare</h1>

            <CreateUser token={token} />
        </section>
    );
}
