import Link from 'next/link';

export default async function Dashboard() {
    return (
        <section>
            <h1>Dashboard</h1>
            <ul>
                <li>
                    <Link href="/logout">Logga ut</Link>
                </li>
                <li>
                    <Link href="/product">Produkter</Link>
                </li>
                <li>
                    <Link href="/user">Användare</Link>
                </li>
            </ul>
        </section>
    );
}
