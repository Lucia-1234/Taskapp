import { post } from '@/helpers/api/index.js';
import { cargarTareasServidor } from '@/modulos/tareas/index.js';
import { notificarExito, notificarError } from '@/modulos/notificaciones/index.js';
import { validarTarea } from '@/helpers/utils/validaciones.js';
import {
    existeFormTarea,
    obtenerDatosNuevaTarea,
    limpiarFormTarea,
    configurarSubmitCrearTarea,
    mostrarLoadingCrearTarea,
    ocultarLoadingCrearTarea
} from './crearTareaUI.js';

// Inicializa la lógica de creación de nuevas tareas.
export const inicializarCrearTarea = (usuarioActual) => {
    if (!existeFormTarea()) return;

    configurarSubmitCrearTarea(async () => {
        const user = usuarioActual();
        if (!user) return;

        const nuevaTarea = obtenerDatosNuevaTarea(user.id);
        if (!nuevaTarea) return;

        // Validar la tarea usando la utilidad compartida para evitar redundancia
        const errorValidacion = validarTarea(nuevaTarea.title, nuevaTarea.description);
        if (errorValidacion) {
            notificarError(errorValidacion);
            return;
        }

        mostrarLoadingCrearTarea();
        try {
            await post("task", nuevaTarea);
            limpiarFormTarea();
            notificarExito("Tarea registrada exitosamente.");
            await cargarTareasServidor(user.id);
        } catch (error) {
            console.error("Error al crear tarea:", error);
            notificarError("Error al registrar la tarea.");
        } finally {
            ocultarLoadingCrearTarea();
        }
    });
};
