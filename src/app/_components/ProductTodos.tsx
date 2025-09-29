'use client';
import { useEffect, useState } from 'react';
import { Todo } from '../_interfaces/Todo';
import { createNewTodo, deleteProductTodoById, updateProductTodoById } from '../_lib/functions';
import { useRouter } from 'next/navigation';

interface ProductTodosProps {
    todosData: Todo[];
    session: any;
    sku: string;
}

export default function ProductTodos({ todosData, session, sku }: ProductTodosProps) {
    const [newTodosData, setNewTodosData] = useState<Todo[]>(todosData ?? []);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const router = useRouter();

    useEffect(() => {
        setNewTodosData(todosData ?? []);
    }, [todosData]);

    const isUsersTodo = (todo: Todo) => {
        const userEmail = session?.user?.user_email ?? session?.user?.email;
        return !!(todo.user_email && userEmail && todo.user_email === userEmail);
    };

    const updateField = (id: Todo['id'], field: keyof Todo, value: string) => {
        setNewTodosData((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
    };

    const handleUpdateTodo = async (todo: Todo) => {
        // ensure we have latest state version (optional)
        const current = newTodosData.find((t) => t.id === todo.id) ?? todo;

        const success = await updateProductTodoById(current.id, current, session?.user?.token);
        if (!success) {
            alert('Något gick fel!');
            window.location.reload(); // <-- call it
            return;
        }
        alert('Noteringen uppdaterades!');
    };

    const handleDeleteTodo = async (todo: Todo) => {
        if (!confirm('Är du säker att du vill ta bort noteringen?')) return;

        const success = await deleteProductTodoById(todo.id, session?.user?.token);
        if (!success) {
            alert('Något gick fel!');
            return;
        }
        setNewTodosData((prev) => prev.filter((t) => t.id !== todo.id));
        alert('Notering togs bort!');
    };

    const handleNewTodo = async () => {
        if (newTitle.length < 5) {
            alert('Notering måste ha en titel med minst 5 tecken!');
            return;
        }

        const success = await createNewTodo(
            { title: newTitle, description: newDesc, sku },
            session?.user?.token
        );

        if (!success) {
            alert('Något gick fel!');
            return;
        }

        setNewTitle('');
        setNewDesc('');

        router.refresh();
    };

    return (
        <section>
            <div className="bg-white rounded-lg shadow-lg p-6 mt-5">
                <h3>Noteringar</h3>

                {newTodosData.length === 0 && (
                    <p className="text-sm text-gray-500 mt-2">Inga att göra-poster ännu.</p>
                )}

                {newTodosData.length !== 0 &&
                    newTodosData.map((todo) => {
                        const mine = isUsersTodo(todo);
                        const titleId = `todo_title_${todo.id}`;
                        const descId = `todo_description_${todo.id}`;

                        return (
                            <div
                                key={todo.id}
                                className={`shadow-sm mt-2 p-3 rounded-lg ${
                                    mine ? 'bg-amber-50' : ''
                                }`}
                            >
                                {!mine && (
                                    <div>
                                        <h4 className="font-medium">{todo.title}</h4>
                                        {todo.description && (
                                            <p className="text-sm text-gray-700 mt-1">
                                                {todo.description}
                                            </p>
                                        )}

                                        <p className="mt-2 text-sm text-gray-600">
                                            Ansvarig: {todo.user_email ?? 'okänd'}
                                        </p>
                                    </div>
                                )}

                                {mine && (
                                    <div className="space-y-2">
                                        <div>
                                            <label
                                                htmlFor={titleId}
                                                className="block text-sm font-medium"
                                            >
                                                Titel
                                            </label>
                                            <input
                                                type="text"
                                                name={titleId}
                                                id={titleId}
                                                value={todo.title ?? ''}
                                                onChange={(e) =>
                                                    updateField(todo.id, 'title', e.target.value)
                                                }
                                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor={descId}
                                                className="block text-sm font-medium"
                                            >
                                                Beskrivning
                                            </label>
                                            <input
                                                type="text"
                                                name={descId}
                                                id={descId}
                                                value={todo.description ?? ''}
                                                onChange={(e) =>
                                                    updateField(
                                                        todo.id,
                                                        'description',
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                                            />
                                        </div>
                                    </div>
                                )}

                                {mine && (
                                    <div className="mt-3 px-3 py-4 border-gray-300 rounded-lg shadow-sm">
                                        <div className="flex gap-2">
                                            <button
                                                className="px-3 py-1 bg-gray-200 rounded-lg text-blue-600 shadow-md hover:bg-gray-300 transition"
                                                onClick={() => handleUpdateTodo(todo)}
                                            >
                                                Uppdatera
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
                                                onClick={() => handleDeleteTodo(todo)}
                                            >
                                                Ta bort
                                            </button>
                                        </div>

                                        <p className="mt-2 text-sm text-gray-600">
                                            Ansvarig: {todo.user_email ?? 'okänd'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mt-5">
                <div role="form" className="mt-4 p-4 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="font-medium">Ny notering</h4>

                    <div className="mt-3 space-y-3">
                        <div>
                            <label htmlFor="new_title" className="block text-sm font-medium">
                                Titel
                            </label>
                            <input
                                type="text"
                                id="new_title"
                                name="new_title"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Skriv en kort titel…"
                            />
                        </div>

                        <div>
                            <label htmlFor="new_description" className="block text-sm font-medium">
                                Beskrivning
                            </label>
                            <textarea
                                id="new_description"
                                name="new_description"
                                value={newDesc}
                                onChange={(e) => setNewDesc(e.target.value)}
                                className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-3 py-2 min-h-[90px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Lägg till detaljer…"
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs text-gray-500">Tips: håll titeln kort och tydlig.</p>

                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer"
                            onClick={handleNewTodo}
                            disabled={!newTitle.trim()}
                        >
                            Skapa
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
