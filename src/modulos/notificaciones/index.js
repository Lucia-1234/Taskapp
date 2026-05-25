/**
 * @file index.js
 * @description Punto de entrada unificado para el módulo de notificaciones.
 * Expone los atajos de notificaciones globales del sistema hacia el exterior.
 */

// Exporta las funciones controladoras de alertas desde el submódulo correspondiente.
export { notificarExito, notificarError, notificarInfo } from './mostrarNotificacion/index.js';
