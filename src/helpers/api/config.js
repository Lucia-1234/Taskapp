/**
 * @file config.js
 * @description Centraliza la configuración de red del cliente API, definiendo la dirección del servidor backend.
 */

// Obtiene la URL base del backend desde las variables de entorno de Vite o usa una URL local predeterminada.
// Esto permite que el backend cambie dinámicamente entre entornos de desarrollo, pruebas o producción sin modificar el código.
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";