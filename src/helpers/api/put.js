/**
 * Archivo: put.js
 * Propósito: Proveer una función auxiliar para actualizar datos en el servidor mediante HTTP PUT.
 */

import { url } from "./config.js"

export const update = async (endpoint, datos) => {
    try {
        const respuesta = await fetch(`${url}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error PUT: ${respuesta.status} ${respuesta.statusText}`);
        }

        return await respuesta.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};