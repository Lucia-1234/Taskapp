import { inicializarBusquedaUsuario } from '../usuarios/buscarUsuario.js';
import { inicializarCrearTarea } from './crearTarea.js';
import { mostrarVistaTareas } from './mostrarTareas.js';
import { obtenerTareasVisibles, cargarTareasServidor } from './listarTareas.js';
import { descargarTareasJSON } from './exportarTareas.js';
import { notificarExito, notificarError, notificarInfo } from '../notificaciones/mostrarNotificacion.js';
import { update } from '../../api/index.js';

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

    // Seleccionar elementos del DOM para la edición de tareas
    const formEditar = document.querySelector("#formEditarTarea");
    const btnCancelar = document.querySelector("#btnCancelarEdicion");
    const seccionEdicion = document.querySelector("#editTaskSection");
    const seccionCreacion = document.querySelector("#taskSection");

    // Escuchar el click en Cancelar para volver al formulario de registro
    if (btnCancelar && seccionEdicion && seccionCreacion) {
        btnCancelar.addEventListener("click", () => {
            // Ocultar sección de edición
            seccionEdicion.classList.add("hidden");
            // Mostrar sección de creación
            seccionCreacion.classList.remove("hidden");
            // Limpiar los campos del formulario de edición
            if (formEditar) formEditar.reset();
        });
    }

    // Escuchar el submit del formulario de edición
    if (formEditar && seccionEdicion && seccionCreacion) {
        formEditar.addEventListener("submit", async (e) => {
            // Evitar comportamiento por defecto del navegador al enviar formulario
            e.preventDefault();

            // Obtener referencias a los inputs del DOM
            const inputId = document.querySelector("#editTareaId");
            const inputTitulo = document.querySelector("#editTareaTitulo");
            const inputDescripcion = document.querySelector("#editTareaDescripcion");
            const inputEstado = document.querySelector("#editTareaEstado");
            const inputUsuario = document.querySelector("#editTareaUsuario");

            // Leer valores sanitizados
            const id = inputId.value;
            const titulo = inputTitulo.value.trim();
            const descripcion = inputDescripcion.value.trim();
            const estado = inputEstado.value;
            const usuarioId = Number(inputUsuario.value);

            // Validar que el título no esté vacío
            if (!titulo) {
                notificarError("El título no puede estar vacío.");
                return;
            }

            // Validar que la descripción no esté vacía
            if (!descripcion) {
                notificarError("La descripción no puede estar vacía.");
                return;
            }

            // Validar que el ID de usuario asignado sea válido y positivo
            if (isNaN(usuarioId) || usuarioId <= 0) {
                notificarError("ID de usuario asignado inválido.");
                return;
            }

            // Buscar la tarea original para conservar la fecha de creación original
            const tareasVisibles = obtenerTareasVisibles();
            const tareaOriginal = tareasVisibles.find(t => Number(t.id) === Number(id)) || {};
            const fechaOriginal = tareaOriginal.createdAt || new Date().toISOString().split('T')[0];

            // Crear el objeto estructurado con la tarea actualizada
            const tareaActualizada = {
                id: Number(id),
                title: titulo,
                description: descripcion,
                Tarea: descripcion,
                status: estado,
                userId: usuarioId,
                completed: estado === "completada",
                createdAt: fechaOriginal
            };

            // Enviar la actualización a la API
            try {
                // Realizar petición PUT a la API
                await update(`task/${id}`, tareaActualizada);
                // Notificar éxito al usuario
                notificarExito("Tarea actualizada exitosamente.");
                // Recargar el listado de tareas del usuario actualmente en sesión
                await cargarTareasServidor(usuarioActual ? usuarioActual.id : usuarioId);
                // Ocultar sección de edición
                seccionEdicion.classList.add("hidden");
                // Volver a mostrar sección de creación
                seccionCreacion.classList.remove("hidden");
                // Limpiar el formulario
                formEditar.reset();
            } catch (error) {
                // Registrar el error en consola
                console.error("Error al actualizar la tarea:", error);
                // Notificar el fallo al usuario mediante un toast
                notificarError("Error al actualizar la tarea.");
            }
        });
    }

}