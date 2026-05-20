import { inicializarBusquedaUsuario } from '../usuarios/buscarUsuario.js';
import { inicializarCrearTarea } from './crearTarea.js';
import { mostrarVistaTareas } from './mostrarTareas.js';
import { obtenerTareasVisibles } from './listarTareas.js';
import { descargarTareasJSON } from './exportarTareas.js';
import { notificarExito, notificarError, notificarInfo } from '../notificaciones/mostrarNotificacion.js';

let usuarioActual = null;

export const inicializarTareas = () => {

    inicializarBusquedaUsuario((usuario) => {
        usuarioActual = usuario;
        mostrarVistaTareas(usuario);
    });

    inicializarCrearTarea(() => usuarioActual);

    // Seleccionar el botón de exportación desde el DOM por su ID único (RF04)
    const btnExportar = document.querySelector("#btnExportarTareas");

    // Validar si el botón existe antes de añadir el escuchador de eventos
    if (btnExportar) {
        // Registrar el manejador para el evento 'click' del botón
        btnExportar.addEventListener("click", () => {
            // Recuperar la lista de tareas actualmente filtradas y ordenadas en la interfaz
            const tareas = obtenerTareasVisibles();

            // Validar si el arreglo de tareas visibles está vacío
            if (!tareas || tareas.length === 0) {
                // Notificar al usuario mediante un toast de información que no hay nada para exportar
                notificarInfo("No hay tareas visibles para exportar.");
                // Detener la ejecución del flujo
                return;
            }

            // Intentar procesar y descargar la información
            try {
                // Ejecutar el helper puro para empaquetar y descargar el archivo JSON
                descargarTareasJSON(tareas);
                // Notificar mediante un toast de éxito la cantidad de tareas exportadas
                notificarExito(`Se exportaron ${tareas.length} tareas correctamente.`);
            } catch (error) {
                // Registrar el detalle técnico del fallo en la consola
                console.error("Error al exportar tareas:", error);
                // Notificar un toast de error informando que falló el procesamiento
                notificarError("Ocurrió un error al intentar exportar las tareas.");
            }
        });
    }

}