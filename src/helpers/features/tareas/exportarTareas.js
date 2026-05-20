/**
 * Procesa un arreglo de tareas y genera un archivo JSON descargable en el navegador.
 * Este helper es puro y desacoplado, no interactúa directamente con alertas o notificaciones de UI.
 * 
 * @param {Array} tareas - Arreglo conteniendo las tareas visibles filtradas y ordenadas.
 */
export const descargarTareasJSON = (tareas) => {
    // 1. Convertir la lista de tareas a texto JSON indentado
    const contenidoJSON = JSON.stringify(tareas, null, 2);
    
    // 2. Crear un Blob de tipo JSON
    const blob = new Blob([contenidoJSON], { type: 'application/json' });
    
    // 3. Generar una URL temporal para descargar el Blob
    const urlDescarga = URL.createObjectURL(blob);
    
    // 4. Crear un enlace (a) temporal en memoria
    const linkAuxiliar = document.createElement('a');
    
    // 5. Asignar la URL temporal al enlace
    linkAuxiliar.href = urlDescarga;
    
    // 6. Obtener la fecha actual (AAAA-MM-DD)
    const fechaActual = new Date().toISOString().split('T')[0];
    
    // 7. Definir el nombre del archivo descargable
    linkAuxiliar.download = `tareas_visibles_${fechaActual}.json`;
    
    // 8. Simular el clic en el enlace para iniciar la descarga
    linkAuxiliar.click();
    
    // 9. Revocar la URL temporal para liberar memoria
    URL.revokeObjectURL(urlDescarga);
};
