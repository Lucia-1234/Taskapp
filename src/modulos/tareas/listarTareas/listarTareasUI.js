import { taskCard } from '@/components/taskCard.js';
import { obtenerUsuariosCache } from '@/modulos/usuarios/index.js';

const getFilterElements = () => ({
    estado: document.querySelector("#filterEstado"),
    usuario: document.querySelector("#filterUsuario"),
    criterio: document.querySelector("#sortCriterio"),
    direccion: document.querySelector("#sortDireccion")
});

export const existeContenedorTareas = () => !!document.querySelector("#tasksContainer");

export const existenFiltros = () => {
    const { estado, usuario, criterio, direccion } = getFilterElements();
    return !!(estado && usuario && criterio && direccion);
};

export const obtenerValoresFiltros = () => {
    const { estado, usuario, criterio, direccion } = getFilterElements();

    if (!estado || !usuario || !criterio || !direccion) {
        return null;
    }

    return {
        estado: estado.value,
        usuario: usuario.value,
        criterio: criterio.value,
        direccion: direccion.value
    };
};

export const establecerValoresFiltrosPredeterminados = (esLogin, userId) => {
    if (esLogin) {
        const { estado, criterio, direccion } = getFilterElements();
        if (estado) estado.value = "todos";
        if (criterio) criterio.value = "fecha";
        if (direccion) direccion.value = "desc";
    }
};

export const renderizarListaTareas = (tareas, onEliminar, onEditar) => {
    const container = document.querySelector("#tasksContainer");
    if (!container) return;

    container.innerHTML = "";

    if (tareas.length === 0) {
        const emptyState = document.createElement("div");
        emptyState.className = "messages-empty";

        const text = document.createElement("p");
        text.className = "messages-empty__text";
        text.textContent = "No hay tareas para mostrar";

        const subtext = document.createElement("p");
        subtext.className = "messages-empty__subtext";
        subtext.textContent = "Crea una nueva tarea o ajusta los filtros";

        emptyState.append(text, subtext);
        container.append(emptyState);
    } else {
        tareas.forEach(tarea => {
            const tarjeta = taskCard(tarea, onEliminar, onEditar);
            container.append(tarjeta);
        });
    }

    const taskCount = document.querySelector('#taskCount');
    if (taskCount) {
        taskCount.textContent = `${tareas.length} tarea${tareas.length === 1 ? '' : 's'}`;
    }
};

export const poblarFiltroUsuarios = (userId, esLogin) => {
    const { usuario: selectUsuario } = getFilterElements();
    if (!selectUsuario) return;

    const valorActual = selectUsuario.value;
    selectUsuario.innerHTML = '<option value="todos">Todos los usuarios</option>';
    
    const usuarios = obtenerUsuariosCache();
    usuarios.forEach(user => {
        const opt = document.createElement("option");
        opt.value = user.id;
        opt.textContent = user.name;
        selectUsuario.appendChild(opt);
    });

    if (esLogin) {
        selectUsuario.value = userId;
    } else if (valorActual && valorActual !== "") {
        selectUsuario.value = valorActual;
    } else if (userId) {
        selectUsuario.value = userId;
    }
};

export const configurarListenersFiltros = (onFiltroChange) => {
    const { estado, usuario, criterio, direccion } = getFilterElements();

    if (estado && usuario && criterio && direccion) {
        estado.addEventListener("change", onFiltroChange);
        usuario.addEventListener("change", onFiltroChange);
        criterio.addEventListener("change", onFiltroChange);
        direccion.addEventListener("change", onFiltroChange);
    }
};

export const mostrarLoading = () => {
    const container = document.querySelector("#tasksContainer");
    if (!container) return;

    container.innerHTML = "";

    const loading = document.createElement("div");
    loading.className = "loading-state";

    const spinner = document.createElement("div");
    spinner.className = "loading-state__spinner";

    const text = document.createElement("p");
    text.className = "loading-state__text";
    text.textContent = "Cargando tareas...";

    loading.append(spinner, text);
    container.append(loading);
};

export const ocultarLoading = () => {
    const container = document.querySelector("#tasksContainer");
    if (!container) return;

    const loading = container.querySelector(".loading-state");
    if (loading) loading.remove();
};
