/**
 * @file get.js
 * @description Provee una función auxiliar para realizar peticiones HTTP GET, facilitando la consulta de datos al backend.
 */

import { BASE_URL } from "@/helpers/api/config.js"

/**
 * Realiza una petición HTTP GET para consultar información en un endpoint específico.
 * 
 * @param {string} endpoint - Ruta relativa del recurso que se desea consultar.
 * @returns {Promise<Object>} Promesa que resuelve a los datos devueltos por el servidor.
 * @throws {Error} Si la respuesta no es satisfactoria (código fuera del rango 2xx).
 */
export const get = async (endpoint) => {
  // Realiza la consulta de red al servidor combinando la URL base con el endpoint.
  const respuesta = await fetch(`${BASE_URL}${endpoint}`);
  
  // Evalúa si el código de estado devuelto está fuera del rango de éxito (200-299).
  if (!respuesta.ok) {
    // Genera y lanza un error detallado que describe el fallo del servidor para facilitar su manejo.
    throw new Error(`Error GET: ${respuesta.status} ${respuesta.statusText}`);
  }
  
  // Resuelve el cuerpo del mensaje interpretado como objeto JSON y lo retorna.
  return await respuesta.json();
};
