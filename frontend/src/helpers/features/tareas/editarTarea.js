import { update } from '../../api/index.js';
import { cargarTareasServidor } from './listarTareas.js';

// Edita una tarea existente y actualiza la lista de tareas.
export const editarTarea = async(tarea) => {

    const nuevoTitulo = prompt("Nuevo título:", tarea.title);

    if (nuevoTitulo === null) return;

    const descripcionActual = tarea.description || tarea.Tarea || "";
    const nuevaDescripcion = prompt("Nueva descripción:", descripcionActual);

    if (nuevaDescripcion === null) return;

    if (!nuevoTitulo.trim()) {
        alert("El título no puede estar vacío.");
        return;
    }

    if (!nuevaDescripcion.trim()) {
        alert("La descripción no puede estar vacía.");
        return;
    }

    const tareaActualizada = {
        ...tarea,
        title: nuevoTitulo.trim(),
        description: nuevaDescripcion.trim(),
        Tarea: nuevaDescripcion.trim()
    };

    await update(`task/${tarea.id}`, tareaActualizada);

    await cargarTareasServidor(tarea.userId);

}