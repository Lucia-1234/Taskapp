/**
 * @file index.js
 * @description Exportador unificado de las funciones de UI y Controladores del submódulo mostrarNotificacion.
 */

// Exporta la función encargada de interactuar de forma directa con el DOM.
export { mostrarNotificacionDOM } from './mostrarNotificacionUI.js';
// Exporta los atajos de notificaciones (éxito, error, info) provistos por el controlador.
export { notificarExito, notificarError, notificarInfo } from './mostrarNotificacionController.js';
