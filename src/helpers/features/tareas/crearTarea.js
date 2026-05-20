import { post } from '../../api/index.js';
import { cargarTareasServidor } from './listarTareas.js';
import { notificarExito, notificarError } from '../notificaciones/mostrarNotificacion.js';

// Inicializa la lógica de creación de nuevas tareas.
export const inicializarCrearTarea = (usuarioActual) => {

    const formTarea = document.querySelector("#formTarea");

    if (!formTarea) return;

    formTarea.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!usuarioActual()) return;

        const tituloInput = document.querySelector("#tareaTitulo");
        const descInput = document.querySelector("#tareaDescripcion");
        const estadoInput = document.querySelector("#tareaEstado");

        const contenidoTarea = descInput.value.trim();

        const nuevaTarea = {
            title: tituloInput.value.trim(),
            description: contenidoTarea,
            Tarea: contenidoTarea,
            status: estadoInput.value,
            userId: Number(usuarioActual().id),
            completed: estadoInput.value === "completada",
            createdAt: new Date().toISOString().split('T')[0]
        };

        if (!nuevaTarea.title) {
            notificarError("El título no puede estar vacío.");
            return;
        }

        if (!nuevaTarea.description) {
            notificarError("La descripción no puede estar vacía.");
            return;
        }

        try {

            await post("task", nuevaTarea);

            formTarea.reset();

            notificarExito("Tarea registrada exitosamente.");

            await cargarTareasServidor(usuarioActual().id);

        } catch (error) {

            console.error("Error al crear tarea:", error);
            notificarError("Error al registrar la tarea.");

        }

    }

    );

}