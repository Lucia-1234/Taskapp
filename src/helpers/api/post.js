/**
 * @file post.js
 * @description Provee una función auxiliar para realizar peticiones HTTP POST, facilitando el envío de datos nuevos al backend.
 */

import { BASE_URL } from "@/helpers/api/config.js"

/**
 * Realiza una petición HTTP POST para crear o enviar datos a un endpoint específico.
 * 
 * @param {string} endpoint - Ruta relativa del recurso en el servidor.
 * @param {Object} datos - Objeto de datos que se enviará en el cuerpo de la petición.
 * @returns {Promise<Object>} Promesa que resuelve a los datos devueltos por el servidor.
 * @throws {Error} Si la respuesta no es satisfactoria (código fuera del rango 2xx).
 */
export const post = async (endpoint, datos) => {
  // Realiza la solicitud HTTP POST enviando el objeto de datos formateado como JSON.
  const respuesta = await fetch(`${BASE_URL}${endpoint}`, {
    // Especifica el método POST para indicarle al servidor que se trata de una creación o envío de datos.
    method: 'POST',
    // Establece el encabezado de tipo de contenido para notificar al backend que el cuerpo está en formato JSON.
    headers: {
      'Content-Type': 'application/json'
    },
    // Serializa el objeto de datos a una cadena JSON para transmitirlo en la solicitud de red.
    body: JSON.stringify(datos)
  });
  
  // Verifica si el estado HTTP de la respuesta indica un error en la solicitud.
  if (!respuesta.ok) {
    // Lanza un error descriptivo con el estado HTTP correspondiente para que pueda gestionarse.
    throw new Error(`Error POST: ${respuesta.status} ${respuesta.statusText}`);
  }
  
  // Procesa y retorna la respuesta procesada como objeto JSON.
  return await respuesta.json();
};
