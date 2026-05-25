/**
 * @file index.js
 * @description Exportador unificado de las funciones públicas del submódulo de búsqueda de usuarios.
 */

// Exporta las funciones controladoras de inicialización y obtención de caché de usuarios.
export { inicializarBusquedaUsuario, obtenerUsuariosCache } from './buscarUsuarioController.js';
