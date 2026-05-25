/**
 * @file ordenarTareas.js
 * @description Provee lógica pura para ordenar una lista de tareas bajo diferentes criterios y direcciones.
 */

import { prioridadesEstado } from '@/helpers/constants/prioridades.js';

/**
 * Ordena un arreglo de tareas según el criterio y la dirección especificados sin mutar el original.
 * 
 * @param {Array.<Object>} tareas - El arreglo original de tareas a ordenar.
 * @param {'nombre'|'estado'|'fecha'} criterio - Atributo por el cual se va a ordenar.
 * @param {'asc'|'desc'} direccion - Dirección del ordenamiento (ascendente o descendente).
 * @returns {Array.<Object>} Un nuevo arreglo con las tareas ordenadas.
 */
export const ordenarTareas = (tareas, criterio, direccion) => {
    // Clona el arreglo original mediante el operador de propagación (spread) para asegurar que la función sea pura y no altere los datos base.
    const tareasOrdenadas = [...tareas];

    // Utiliza el método de ordenación sort comparando los elementos par a par.
    tareasOrdenadas.sort((a, b) => {
        // Inicializa la variable de comparación en 0 (indica que son iguales por defecto).
        let comparacion = 0;

        // Comprueba si el criterio de ordenamiento es alfabético por nombre/título.
        if (criterio === "nombre") {
            // Obtiene el título de la tarea A o una cadena vacía si es nulo.
            const tituloA = a.title || "";
            // Obtiene el título de la tarea B o una cadena vacía si es nulo.
            const tituloB = b.title || "";
            // Realiza la comparación alfabética en idioma español ignorando mayúsculas y acentos.
            comparacion = tituloA.localeCompare(tituloB, 'es', { sensitivity: 'base' });
        } 
        // Comprueba si el criterio es el estado actual de la tarea.
        else if (criterio === "estado") {
            // Resuelve el peso numérico de prioridad del estado de la tarea A desde las constantes.
            const ordenA = prioridadesEstado[a.status] || 0;
            // Resuelve el peso numérico de prioridad del estado de la tarea B desde las constantes.
            const ordenB = prioridadesEstado[b.status] || 0;
            // Resta los pesos numéricos para establecer el orden relativo de menor a mayor.
            comparacion = ordenA - ordenB;
        } 
        // Si no coincide con ninguno, ordena por fecha de creación por defecto.
        else {
            // Convierte la fecha a milisegundos numéricos, usando el id numérico como respaldo si no tiene fecha.
            const fechaA = a.createdAt ? new Date(a.createdAt).getTime() : (a.id || 0);
            // Convierte la fecha a milisegundos numéricos, usando el id numérico como respaldo si no tiene fecha.
            const fechaB = b.createdAt ? new Date(b.createdAt).getTime() : (b.id || 0);
            // Resta los valores numéricos de tiempo para ordenarlos cronológicamente.
            comparacion = fechaA - fechaB;
        }

        // Si la dirección solicitada es descendente, invierte el signo de la comparación para revertir el orden.
        return direccion === "desc" ? -comparacion : comparacion;
    });

    // Retorna el nuevo arreglo ordenado con los criterios especificados.
    return tareasOrdenadas;
};
