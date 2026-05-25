export const existeFormEdicion = () => !!document.querySelector("#formEditarTarea");

export const mostrarFormEdicion = (tarea) => {
    const inputId = document.querySelector("#editTareaId");
    const inputTitulo = document.querySelector("#editTareaTitulo");
    const inputDescripcion = document.querySelector("#editTareaDescripcion");
    const inputEstado = document.querySelector("#editTareaEstado");
    const inputUsuario = document.querySelector("#editTareaUsuario");

    const seccionEdicion = document.querySelector("#editTaskSection");
    const seccionCreacion = document.querySelector("#taskSection");

    if (inputId && inputTitulo && inputDescripcion && inputEstado && inputUsuario && seccionEdicion && seccionCreacion) {
        inputId.value = tarea.id;
        inputTitulo.value = tarea.title || "";
        inputDescripcion.value = tarea.description || tarea.Tarea || "";
        inputEstado.value = tarea.status || "pendiente";
        inputUsuario.value = tarea.userId || "";

        seccionEdicion.classList.remove("hidden");
        seccionCreacion.classList.add("hidden");

        seccionEdicion.scrollIntoView({ behavior: "smooth" });
    }
};

export const ocultarFormEdicion = () => {
    const seccionEdicion = document.querySelector("#editTaskSection");
    const seccionCreacion = document.querySelector("#taskSection");
    const formEditar = document.querySelector("#formEditarTarea");

    if (seccionEdicion && seccionCreacion) {
        seccionEdicion.classList.add("hidden");
        seccionCreacion.classList.remove("hidden");
        if (formEditar) formEditar.reset();
    }
};

export const configurarCancelarEdicion = (onCancel) => {
    const btnCancelar = document.querySelector("#btnCancelarEdicion");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", () => {
            onCancel();
        });
    }
};

export const configurarSubmitEdicion = (onSubmit) => {
    const formEditar = document.querySelector("#formEditarTarea");
    if (formEditar) {
        formEditar.addEventListener("submit", (e) => {
            e.preventDefault();
            onSubmit();
        });
    }
};

export const obtenerDatosEdicion = () => {
    const inputId = document.querySelector("#editTareaId");
    const inputTitulo = document.querySelector("#editTareaTitulo");
    const inputDescripcion = document.querySelector("#editTareaDescripcion");
    const inputEstado = document.querySelector("#editTareaEstado");
    const inputUsuario = document.querySelector("#editTareaUsuario");

    if (!inputId || !inputTitulo || !inputDescripcion || !inputEstado || !inputUsuario) return null;

    return {
        id: Number(inputId.value),
        title: inputTitulo.value.trim(),
        description: inputDescripcion.value.trim(),
        status: inputEstado.value,
        userId: Number(inputUsuario.value)
    };
};
