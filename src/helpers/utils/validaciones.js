/**
 * @file validaciones.js
 * @description Provee funciones auxiliares puras para validar datos de entrada de la aplicación.
 */

/**
 * Valida que los campos obligatorios de una tarea (título y descripción) contengan información.
 * Devuelve un mensaje descriptivo si hay un fallo, o null si los datos son correctos.
 * 
 * @param {string} titulo - Título de la tarea a evaluar.
 * @param {string} descripcion - Descripción detallada de la tarea a evaluar.
 * @returns {string|null} Cadena con el mensaje de error o null si la validación es exitosa.
 */
export const validarTarea = (titulo, descripcion) => {
    // Comprueba si el título no existe o está compuesto únicamente por espacios en blanco.
    if (!titulo || !titulo.trim()) {
        // Retorna un mensaje de error claro para alertar al usuario sobre el campo faltante.
        return "El título no puede estar vacío.";
    }
    // Comprueba si la descripción no existe o está compuesta únicamente por espacios en blanco.
    if (!descripcion || !descripcion.trim()) {
        // Retorna un mensaje de error indicando que la descripción también es obligatoria.
        return "La descripción no puede estar vacía.";
    }
    // Retorna null indicando que todos los campos pasaron las validaciones requeridas.
    return null;
};
