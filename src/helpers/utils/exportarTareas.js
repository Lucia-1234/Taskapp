/**
 * @file exportarTareas.js
 * @description Procesa un arreglo de tareas y genera un archivo JSON descargable en el navegador.
 * Este helper es puro y desacoplado, no interactúa directamente con alertas o notificaciones de UI.
 */

/**
 * Genera la descarga en el navegador del listado de tareas en formato JSON.
 * 
 * @param {Array.<Object>} tareas - Arreglo conteniendo las tareas visibles filtradas y ordenadas.
 * @returns {void}
 */
export const descargarTareasJSON = (tareas) => {
    // Convierte el arreglo de tareas a una cadena de texto JSON con sangría de 2 espacios para mejorar su legibilidad.
    const contenidoJSON = JSON.stringify(tareas, null, 2);
    // Crea un Blob (Binary Large Object) a partir del texto JSON especificando que es de tipo aplicación JSON.
    const blob = new Blob([contenidoJSON], { type: 'application/json' });
    // Genera una URL temporal única que apunta al Blob en memoria del navegador para poder descargarlo.
    const urlDescarga = URL.createObjectURL(blob);
    
    // Crea un elemento de anclaje (enlace) temporal en el DOM para simular la acción de descarga.
    const linkAuxiliar = document.createElement('a');
    // Asigna la URL temporal del Blob como el destino del enlace de descarga.
    linkAuxiliar.href = urlDescarga;
    
    // Obtiene la fecha actual en formato ISO y la divide para extraer únicamente la parte de la fecha YYYY-MM-DD.
    const fechaActual = new Date().toISOString().split('T')[0];
    // Define el nombre predeterminado del archivo descargable incluyendo la fecha del día actual.
    linkAuxiliar.download = `tareas_visibles_${fechaActual}.json`;
    
    // Simula programáticamente un clic en el enlace creado para abrir la ventana de descarga del navegador.
    linkAuxiliar.click();
    // Libera la URL temporal de la memoria del navegador para optimizar el consumo de recursos tras finalizar el proceso.
    URL.revokeObjectURL(urlDescarga);
};
