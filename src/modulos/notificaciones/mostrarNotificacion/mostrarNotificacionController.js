/**
 * @file mostrarNotificacionController.js
 * @description Controlador del módulo de notificaciones. Expone funciones simplificadas para enviar notificaciones
 * de diferentes tipos (éxito, error, info) al componente de UI.
 */

import { mostrarNotificacionDOM } from './mostrarNotificacionUI.js';

/**
 * Muestra una notificación de éxito (estilo verde).
 * 
 * @param {string} mensaje - Mensaje a mostrar.
 * @returns {void}
 */
export const notificarExito = (mensaje) => {
    // Llama al renderizador de la UI indicando que el mensaje tiene tipo 'exito' para aplicar los estilos correspondientes.
    return mostrarNotificacionDOM(mensaje, 'exito');
};

/**
 * Muestra una notificación de error (estilo rojo).
 * 
 * @param {string} mensaje - Mensaje a mostrar.
 * @returns {void}
 */
export const notificarError = (mensaje) => {
    // Llama al renderizador de la UI indicando que el mensaje tiene tipo 'error' para alertar al usuario visualmente.
    return mostrarNotificacionDOM(mensaje, 'error');
};

/**
 * Muestra una notificación informativa (estilo azul).
 * 
 * @param {string} mensaje - Mensaje a mostrar.
 * @returns {void}
 */
export const notificarInfo = (mensaje) => {
    // Llama al renderizador de la UI indicando que el mensaje es de tipo informativo 'info'.
    return mostrarNotificacionDOM(mensaje, 'info');
};
