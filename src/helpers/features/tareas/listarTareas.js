import { get } from '../../api/index.js';
import { taskCard } from '../../../components/taskCard.js';

import { eliminarTarea } from './eliminarTarea.js';
import { editarTarea } from './editarTarea.js';
import { obtenerUsuariosCache } from '../usuarios/buscarUsuario.js';

let cacheTareas = [];
let filtrosInicializados = false;

export const filtrarYRenderizarTareas = () => {
    const tareaContainer = document.querySelector("#tasksContainer");
    if (!tareaContainer) return;

    const selectEstado = document.querySelector("#filterEstado");
    const selectUsuario = document.querySelector("#filterUsuario");

    if (!selectEstado || !selectUsuario) return;

    const estadoSeleccionado = selectEstado.value;
    const usuarioSeleccionado = selectUsuario.value;

    const tareasFiltradas = cacheTareas.filter(tarea => {
        // 1. Filtrar por estado
        let cumpleEstado = true;
        if (estadoSeleccionado !== "todos") {
            cumpleEstado = (tarea.status === estadoSeleccionado);
        }

        // 2. Filtrar por usuario
        let cumpleUsuario = true;
        if (usuarioSeleccionado !== "todos") {
            cumpleUsuario = (Number(tarea.userId) === Number(usuarioSeleccionado));
        }

        return cumpleEstado && cumpleUsuario;
    });

    // Limpiar contenedor
    tareaContainer.innerHTML = "";

    // Renderizar
    tareasFiltradas.forEach(tarea => {
        const tarjeta = taskCard(tarea, eliminarTarea, editarTarea);
        tareaContainer.append(tarjeta);
    });

    // Actualizar contador
    const taskCount = document.querySelector('#taskCount');
    if (taskCount) {
        taskCount.textContent = `${tareasFiltradas.length} tarea${tareasFiltradas.length === 1 ? '' : 's'}`;
    }
};

export const cargarTareasServidor = async (userId, esLogin = false) => {
    const tareaContainer = document.querySelector("#tasksContainer");
    if (!tareaContainer) return;

    try {
        // Obtener todas las tareas de la base de datos (RF01 - Filtro simultáneo)
        const respuesta = await get("task");
        cacheTareas = Array.isArray(respuesta) ? respuesta : [];

        // Resetear filtro de estado si es un nuevo login
        if (esLogin) {
            const selectEstado = document.querySelector("#filterEstado");
            if (selectEstado) {
                selectEstado.value = "todos";
            }
        }

        // Poblar las opciones del filtro de usuarios
        const selectUsuario = document.querySelector("#filterUsuario");
        if (selectUsuario) {
            const valorActual = selectUsuario.value;

            selectUsuario.innerHTML = '<option value="todos">Todos los usuarios</option>';
            const usuarios = obtenerUsuariosCache();
            usuarios.forEach(user => {
                const opt = document.createElement("option");
                opt.value = user.id;
                opt.textContent = user.name;
                selectUsuario.appendChild(opt);
            });

            // Establecer valor por defecto: el usuario logueado en la primera carga/login
            if (esLogin) {
                selectUsuario.value = userId;
            } else if (valorActual && valorActual !== "") {
                selectUsuario.value = valorActual;
            } else if (userId) {
                selectUsuario.value = userId;
            }
        }

        // Inicializar event listeners de filtros solo una vez
        if (!filtrosInicializados) {
            const selectEstado = document.querySelector("#filterEstado");
            const selectUsuario = document.querySelector("#filterUsuario");

            if (selectEstado && selectUsuario) {
                selectEstado.addEventListener("change", filtrarYRenderizarTareas);
                selectUsuario.addEventListener("change", filtrarYRenderizarTareas);
                filtrosInicializados = true;
            }
        }

        // Ejecutar el filtrado y renderizado inicial
        filtrarYRenderizarTareas();

    } catch (error) {
        console.error("Error al cargar tareas:", error);
    }
};