/**
 * Archivo: post.js
 * Propósito: Proveer una función auxiliar para enviar datos al servidor (crear recursos) mediante HTTP POST.
 */

import { url } from "./config.js"

export const post = async (endpoint, datos) => {
  try {
    const respuesta = await fetch(`${url}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    
    if (!respuesta.ok) {
      throw new Error(`Error POST: ${respuesta.status} ${respuesta.statusText}`);
    }
    
    return await respuesta.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
