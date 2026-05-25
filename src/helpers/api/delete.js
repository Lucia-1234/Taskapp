/**
 * @file delete.js
 * @description Provee una función auxiliar para realizar peticiones HTTP DELETE al servidor backend, facilitando la eliminación de recursos.
 */

import { BASE_URL } from "@/helpers/api/config.js"

/**
 * Realiza una petición HTTP DELETE hacia un recurso específico en el backend.
 * 
 * @param {string} endpoint - Ruta relativa del recurso que se desea eliminar en el servidor.
 * @returns {Promise<Object>} Promesa que se resuelve con la respuesta JSON del servidor.
 * @throws {Error} Si la respuesta del servidor no es satisfactoria (status fuera del rango 200-299).
 */
export const remove = async (endpoint) => {
    // Envía la solicitud de red HTTP usando fetch construyendo la URL completa con el endpoint especificado.
    const respuesta = await fetch(`${BASE_URL}${endpoint}`, {
        // Indica el método DELETE para indicarle al servidor que se desea remover el recurso.
        method: 'DELETE',
        // Envía el encabezado de tipo de contenido para asegurar la comunicación estructurada.
        headers: {
            "Content-Type": "application/json",
        }
    });
    
    // Comprueba si la respuesta del servidor no tiene éxito (código de estado diferente de 2xx).
    if (!respuesta.ok) {
        // Lanza un error descriptivo con el estado HTTP para facilitar el rastreo en la consola y la UI.
        throw new Error(`Error DELETE: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    // Espera a que se procese el cuerpo de la respuesta en formato JSON y lo retorna.
    return await respuesta.json();
};