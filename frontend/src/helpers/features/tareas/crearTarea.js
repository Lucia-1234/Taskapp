import { post } from '../../api/index.js';
import { cargarTareasServidor } from './listarTareas.js';

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
            completed: estadoInput.value === "completada"
        };

        if (!nuevaTarea.title) {
            alert("El título está vacío.");
            return;
        }

        if (!nuevaTarea.description) {
            alert("La descripción está vacía.");
            return;
        }

        try {

            await post("task", nuevaTarea);

            formTarea.reset();

            await cargarTareasServidor(usuarioActual().id);

        } catch (error) {

            console.error("Error al crear tarea:", error);

        }

    }

    );

}