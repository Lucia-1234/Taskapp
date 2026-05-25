/**
 * @file put.js
 * @description Provee una función auxiliar para realizar peticiones HTTP PUT, facilitando la actualización de recursos existentes en el backend.
 */

import { BASE_URL } from "@/helpers/api/config.js"

/**
 * Realiza una petición HTTP PUT para actualizar datos en un recurso específico del servidor.
 * 
 * @param {string} endpoint - Ruta relativa del recurso que se desea actualizar.
 * @param {Object} datos - Objeto con los nuevos datos que actualizarán el recurso.
 * @returns {Promise<Object>} Promesa que resuelve a los datos actualizados devueltos por el servidor.
 * @throws {Error} Si la respuesta del servidor no tiene éxito (código fuera de 2xx).
 */
export const update = async (endpoint, datos) => {
    // Realiza la solicitud HTTP PUT enviando el cuerpo con la información actualizada serializada en JSON.
    const respuesta = await fetch(`${BASE_URL}${endpoint}`, {
        // Define el método PUT para indicar que se reemplazará o modificará el recurso especificado.
        method: 'PUT',
        // Encabezado que define el tipo de contenido como JSON para que el servidor lo procese adecuadamente.
        headers: {
            'Content-Type': 'application/json'
        },
        // Convierte el objeto de datos a string para que viaje sobre la red de forma estructurada.
        body: JSON.stringify(datos)
    });

    // Comprueba si la respuesta del servidor indica un fallo en la actualización.
    if (!respuesta.ok) {
        // Lanza un error detallado indicando los detalles HTTP para su gestión en el controlador.
        throw new Error(`Error PUT: ${respuesta.status} ${respuesta.statusText}`);
    }

    // Deserializa el JSON del cuerpo de la respuesta recibida y lo retorna.
    return await respuesta.json();
};