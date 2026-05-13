import { delet } from '../../api/index.js';
import { cargarTareasServidor } from './listarTareas.js';

// Elimina una tarea y recarga la lista actual del usuario.
export const eliminarTarea = async(tarea) => {

    try {
        await delet(`task/${tarea.id}`);

        await cargarTareasServidor(tarea.userId);

    } catch(error) {

        console.error("Error al eliminar tarea:",error);

    }

}