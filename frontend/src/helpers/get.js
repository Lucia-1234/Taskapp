/**
 * Archivo: get.js
 * Propósito: Proveer una función auxiliar (helper) para realizar peticiones HTTP GET.
 */

const url = "http://localhost:3000/"

export const obtener = async (endpoint) => {
  try {
    const respuesta = await fetch(`${url}${endpoint}`);
    
    if (!respuesta.ok) {
      throw new Error(`Error GET: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
