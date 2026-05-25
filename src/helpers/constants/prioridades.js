/**
 * @file prioridades.js
 * @description Este archivo se creó bajo la carpeta 'constants' para centralizar y estandarizar
 * los valores fijos y pesos de prioridad de los estados de las tareas. Esto evita el uso de
 * "valores mágicos" (valores quemados en el código) a lo largo del proyecto, facilitando el
 * mantenimiento y garantizando la coherencia en comparaciones y ordenamientos.
 */

/**
 * Mapa que asigna un peso numérico a cada estado de una tarea para su visualización y ordenamiento.
 * Se utiliza para priorizar estados al listar: pendientes primero, en progreso después, completadas al final.
 * 
 * @type {Object.<string, number>}
 */
export const prioridadesEstado = {
    // Asigna el peso 1 al estado "pendiente" para posicionarlo primero en la lista.
    "pendiente": 1,
    // Asigna el peso 2 al estado "en-progreso" para posicionarlo en segundo lugar en la lista.
    "en-progreso": 2,
    // Asigna el peso 3 al estado "completada" para posicionarlo al final de la lista.
    "completada": 3
};
