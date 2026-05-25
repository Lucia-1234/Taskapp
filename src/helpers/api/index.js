/**
 * @file index.js
 * @description Punto de entrada unificado para los clientes HTTP del backend. Re-exporta los helpers
 * de peticiones (get, post, update, remove) para simplificar las importaciones en otros módulos.
 */

// Exporta e importa la función auxiliar 'get' que maneja las solicitudes de consulta (HTTP GET).
export { get } from './get.js';
// Exporta e importa la función auxiliar 'post' que maneja las solicitudes de creación (HTTP POST).
export { post } from './post.js';
// Exporta e importa la función auxiliar 'update' que maneja las solicitudes de modificación (HTTP PUT).
export { update } from './put.js';
// Exporta e importa la función auxiliar 'remove' que maneja las solicitudes de borrado (HTTP DELETE).
export { remove } from './delete.js';