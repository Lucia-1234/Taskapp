import { cargarTareasServidor } from './listarTareas.js';

// Muestra u oculta la sección de creación y listado de tareas según el usuario.
export const mostrarVistaTareas = (usuario) => {

    const taskSection = document.querySelector("#taskSection");

    const tasksListSection = document.querySelector("#tasksListSection");

    if (usuario) {

        taskSection.classList.remove("hidden");

        tasksListSection.classList.remove("hidden");

        cargarTareasServidor(Number(usuario.id), true);

    } else {

        taskSection.classList.add("hidden");

        tasksListSection.classList.add("hidden");

    }

}