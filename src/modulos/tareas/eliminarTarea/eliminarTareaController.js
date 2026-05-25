import { remove } from '@/helpers/api/index.js';
import { cargarTareasServidor } from '@/modulos/tareas/listarTareas/index.js';
import { notificarExito, notificarError } from '@/modulos/notificaciones/index.js';
import { mostrarLoading, ocultarLoading } from '@/modulos/tareas/listarTareas/listarTareasUI.js';

// Elimina una tarea y recarga la lista actual del usuario.
export const eliminarTarea = async (tarea) => {
    const confirmado = confirm("¿Estás seguro de que deseas eliminar esta tarea?");
    if (!confirmado) return;

    mostrarLoading();
    try {
        await remove(`task/${tarea.id}`);
        notificarExito("Tarea eliminada exitosamente.");
        await cargarTareasServidor(tarea.userId);
    } catch (error) {
        console.error("Error al eliminar tarea:", error);
        notificarError("Error al eliminar la tarea.");
    } finally {
        ocultarLoading();
    }
};
