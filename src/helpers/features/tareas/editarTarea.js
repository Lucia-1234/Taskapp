// Carga los datos de una tarea en el formulario HTML y muestra la vista de edición.
export const editarTarea = (tarea) => {
    // 1. Obtener las referencias a los campos de edición del DOM
    const inputId = document.querySelector("#editTareaId");
    const inputTitulo = document.querySelector("#editTareaTitulo");
    const inputDescripcion = document.querySelector("#editTareaDescripcion");
    const inputEstado = document.querySelector("#editTareaEstado");
    const inputUsuario = document.querySelector("#editTareaUsuario");

    // 2. Obtener las referencias a las secciones de la interfaz para alternar visibilidad
    const seccionEdicion = document.querySelector("#editTaskSection");
    const seccionCreacion = document.querySelector("#taskSection");

    // Validar que todos los elementos del DOM existan en la página antes de manipularlos
    if (inputId && inputTitulo && inputDescripcion && inputEstado && inputUsuario && seccionEdicion && seccionCreacion) {
        // 3. Poblar los campos del formulario con los atributos actuales de la tarea seleccionada
        inputId.value = tarea.id;
        inputTitulo.value = tarea.title || "";
        inputDescripcion.value = tarea.description || tarea.Tarea || "";
        inputEstado.value = tarea.status || "pendiente";
        inputUsuario.value = tarea.userId || "";

        // 4. Mostrar la vista de edición y ocultar la de creación en el documento
        seccionEdicion.classList.remove("hidden");
        seccionCreacion.classList.add("hidden");

        // 5. Desplazar la pantalla suavemente hasta el formulario de edición para centrar la atención del usuario
        seccionEdicion.scrollIntoView({ behavior: "smooth" });
    }
};