import { get } from '../../api/index.js';
import { taskCard } from '../../../components/taskCard.js';

import { eliminarTarea } from './eliminarTarea.js';
import { editarTarea } from './editarTarea.js';

export const cargarTareasServidor = async(userId) => {

    const tareaContainer = document.querySelector("#tasksContainer");

    if (!tareaContainer) return;

    while (tareaContainer.firstChild) {
        tareaContainer.removeChild(tareaContainer.firstChild);
    }

    try {

        const tareas = await get(`task?userId=${userId}`);

        tareas.forEach(tarea => {
            const tarjeta = taskCard(tarea,eliminarTarea,editarTarea);
            tareaContainer.append(tarjeta);
        });

        const taskCount = document.querySelector('#taskCount');
        if (taskCount) {
            taskCount.textContent = `${tareas.length} tarea${tareas.length === 1 ? '' : 's'}`;
        }

    } catch(error) {

        console.error("Error al cargar tareas:", error);

    }

}