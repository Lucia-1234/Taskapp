/**
 * Archivo: get.js
 * Propósito: Proveer una función auxiliar (helper) para realizar peticiones HTTP GET.
 */
export const obtener = async (url) => {
  try {
    const respuesta = await fetch(url);
    
    if (!respuesta.ok) {
      throw new Error(`Error GET: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
