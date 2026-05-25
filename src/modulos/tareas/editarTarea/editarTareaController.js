import { update } from '@/helpers/api/index.js';
import { cargarTareasServidor, obtenerTareasVisibles } from '@/modulos/tareas/index.js';
import { notificarExito, notificarError } from '@/modulos/notificaciones/index.js';
import { validarTarea } from '@/helpers/utils/validaciones.js';
import {
    existeFormEdicion,
    mostrarFormEdicion,
    ocultarFormEdicion,
    configurarCancelarEdicion,
    configurarSubmitEdicion,
    obtenerDatosEdicion
} from './editarTareaUI.js';

// Carga los datos de una tarea en el formulario HTML y muestra la vista de edición.
export const editarTarea = (tarea) => {
    mostrarFormEdicion(tarea);
};

// Registra los event listeners para cancelar y guardar cambios en la edición.
export const inicializarFormEdicion = (usuarioActualGetter) => {
    if (!existeFormEdicion()) return;

    configurarCancelarEdicion(() => {
        ocultarFormEdicion();
    });

    configurarSubmitEdicion(async () => {
        const datos = obtenerDatosEdicion();
        if (!datos) return;

        const { id, title, description, status, userId } = datos;

        // Validar título y descripción con la utilidad compartida para evitar redundancia
        const errorValidacion = validarTarea(title, description);
        if (errorValidacion) {
            notificarError(errorValidacion);
            return;
        }

        // Validar que el ID de usuario asignado sea válido y positivo
        if (isNaN(userId) || userId <= 0) {
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
            title,
            description,
            status,
            userId,
            completed: status === "completada",
            createdAt: fechaOriginal
        };

        // Enviar la actualización a la API
        try {
            await update(`task/${id}`, tareaActualizada);
            notificarExito("Tarea actualizada exitosamente.");
            
            const userActual = usuarioActualGetter();
            await cargarTareasServidor(userActual ? userActual.id : userId);
            
            ocultarFormEdicion();
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
            notificarError("Error al actualizar la tarea.");
        }
    });
};
