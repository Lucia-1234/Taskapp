export const existeFormTarea = () => !!document.querySelector("#formTarea");

export const obtenerDatosNuevaTarea = (userId) => {
    const tituloInput = document.querySelector("#tareaTitulo");
    const descInput = document.querySelector("#tareaDescripcion");
    const estadoInput = document.querySelector("#tareaEstado");

    if (!tituloInput || !descInput || !estadoInput) return null;

    const contenidoTarea = descInput.value.trim();

    return {
        title: tituloInput.value.trim(),
        description: contenidoTarea,
        status: estadoInput.value,
        userId: Number(userId),
        completed: estadoInput.value === "completada",
        createdAt: new Date().toISOString().split('T')[0]
    };
};

export const limpiarFormTarea = () => {
    const formTarea = document.querySelector("#formTarea");
    if (formTarea) {
        formTarea.reset();
    }
};

export const configurarSubmitCrearTarea = (onSubmit) => {
    const formTarea = document.querySelector("#formTarea");
    if (formTarea) {
        formTarea.addEventListener("submit", (e) => {
            e.preventDefault();
            onSubmit();
        });
    }
};

export const mostrarLoadingCrearTarea = () => {
    const btn = document.querySelector("#formTarea button[type='submit']");
    const inputs = document.querySelectorAll("#formTarea .form__input");

    if (btn) {
        btn.disabled = true;
        btn.dataset.originalText = btn.textContent;
        btn.textContent = "Registrando...";
    }
    inputs.forEach(input => {
        input.disabled = true;
    });
};

export const ocultarLoadingCrearTarea = () => {
    const btn = document.querySelector("#formTarea button[type='submit']");
    const inputs = document.querySelectorAll("#formTarea .form__input");

    if (btn) {
        btn.disabled = false;
        if (btn.dataset.originalText) {
            btn.textContent = btn.dataset.originalText;
        }
    }
    inputs.forEach(input => {
        input.disabled = false;
    });
};
