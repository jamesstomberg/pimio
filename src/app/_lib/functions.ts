import { Todo } from '../_interfaces/Todo';
import { api } from './definitions';

export async function getProductBySku(sku: string, token: string): Promise<any> {
    try {
        const API_URL = `${api.baseUrl}/products/v1/Read/${sku}`;

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });

        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

export async function editProductBySku(sku: string, productData: any, token: string): Promise<any> {
    try {
        const API_URL = `${api.baseUrl}/products/v1/Edit/${sku}`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(productData),
        });

        return await response.json();
    } catch (error) {
        console.error('Error updating product:', error);
    }
}

export async function deleteProductBySku(sku: string, token: string): Promise<any> {
    try {
        const API_URL = `${api.baseUrl}/products/v1/Delete/${sku}`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });

        return await response.json();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

export async function createNewProduct(data: any, token: string): Promise<any> {
    try {
        const API_URL = `${api.baseUrl}/products/v1/Create`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

export async function getTodosByProductSku(sku: string, token: string): Promise<any> {
    try {
        const API_URL = `${api.baseUrl}/products/v1/Read/Todos/${sku}`;

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });

        return await response.json();
    } catch (error) {
        console.error('Error fetching product todos:', error);
    }
}

export async function deleteProductTodoById(id: number, token: string): Promise<any> {
    try {
        const API_URL = `${api.baseUrl}/products/v1/Delete/Todos/${id}`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });

        const result = await response.json();

        if (result) {
            return true;
        }
    } catch (error) {
        console.error('Error deleting product todo:', error);
    }

    return false;
}

export async function updateProductTodoById(
    id: number,
    todoData: Todo,
    token: string
): Promise<any> {
    try {
        const API_URL = `${api.baseUrl}/products/v1/Update/Todos/${id}`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(todoData),
        });

        const result = await response.json();

        if (result) {
            return true;
        }
    } catch (error) {
        console.error('Error updating product:', error);
    }

    return false;
}

export async function createNewTodo(data: any, token: string): Promise<any> {
    try {
        const API_URL = `${api.baseUrl}/products/v1/Create/Todos`;

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            body: JSON.stringify(data),
        });

        return await response.json();
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}
