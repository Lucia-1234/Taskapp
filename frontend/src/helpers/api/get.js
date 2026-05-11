/**
 * Archivo: get.js
 * Propósito: Proveer una función auxiliar (helper) para realizar peticiones HTTP GET.
 */

import { url } from "./config.js"

export const get = async (endpoint) => {
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
