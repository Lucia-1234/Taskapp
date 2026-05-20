import { update } from '../../api/index.js';
import { cargarTareasServidor } from './listarTareas.js';
import { notificarExito, notificarError } from '../notificaciones/mostrarNotificacion.js';

// Edita una tarea existente y actualiza la lista de tareas.
export const editarTarea = async(tarea) => {

    const nuevoTitulo = prompt("Nuevo título:", tarea.title);

    if (nuevoTitulo === null) return;

    const descripcionActual = tarea.description || tarea.Tarea || "";
    const nuevaDescripcion = prompt("Nueva descripción:", descripcionActual);

    if (nuevaDescripcion === null) return;

    // Pedir estado nuevo
    const nuevoEstado = prompt("Nuevo estado (pendiente, en-progreso, completada):", tarea.status || "pendiente");
    if (nuevoEstado === null) return;
    const estadoLimpio = nuevoEstado.trim().toLowerCase();
    if (estadoLimpio !== "pendiente" && estadoLimpio !== "en-progreso" && estadoLimpio !== "completada") {
        notificarError("Estado inválido. Debe ser 'pendiente', 'en-progreso' o 'completada'.");
        return;
    }

    // Pedir ID de usuario asignado nuevo
    const nuevoUsuarioId = prompt("Nuevo ID de usuario asignado:", tarea.userId);
    if (nuevoUsuarioId === null) return;
    const usuarioIdNum = Number(nuevoUsuarioId);
    if (isNaN(usuarioIdNum) || usuarioIdNum <= 0) {
        notificarError("ID de usuario inválido.");
        return;
    }

    if (!nuevoTitulo.trim()) {
        notificarError("El título no puede estar vacío.");
        return;
    }

    if (!nuevaDescripcion.trim()) {
        notificarError("La descripción no puede estar vacía.");
        return;
    }

    const tareaActualizada = {
        ...tarea,
        title: nuevoTitulo.trim(),
        description: nuevaDescripcion.trim(),
        Tarea: nuevaDescripcion.trim(),
        status: estadoLimpio,
        userId: usuarioIdNum,
        completed: estadoLimpio === "completada",
        createdAt: tarea.createdAt || new Date().toISOString().split('T')[0]
    };

    try {
        await update(`task/${tarea.id}`, tareaActualizada);
        notificarExito("Tarea actualizada exitosamente.");
        await cargarTareasServidor(tarea.userId);
    } catch (error) {
        console.error("Error al actualizar tarea:", error);
        notificarError("Error al actualizar la tarea.");
    }

}