import { get } from '../../api/index.js';
import { taskCard } from '../../../components/taskCard.js';

import { eliminarTarea } from './eliminarTarea.js';
import { editarTarea } from './editarTarea.js';
import { obtenerUsuariosCache } from '../usuarios/buscarUsuario.js';
import { ordenarTareas } from './ordenarTareas.js';

let cacheTareas = [];
let tareasVisiblesCache = [];
let filtrosInicializados = false;

export const filtrarYRenderizarTareas = () => {
    // Buscar el contenedor donde se pintarán las tareas en el DOM
    const tareaContainer = document.querySelector("#tasksContainer");
    // Detener la ejecución si el contenedor no existe en la interfaz
    if (!tareaContainer) return;

    // Obtener los selectores HTML para los filtros y criterios de ordenamiento
    const selectEstado = document.querySelector("#filterEstado");
    const selectUsuario = document.querySelector("#filterUsuario");
    const selectCriterio = document.querySelector("#sortCriterio");
    const selectDireccion = document.querySelector("#sortDireccion");

    // Detener la ejecución si alguno de los selectores del DOM no está disponible
    if (!selectEstado || !selectUsuario || !selectCriterio || !selectDireccion) return;

    // Obtener los valores seleccionados actualmente por el usuario
    const estadoSeleccionado = selectEstado.value;
    const usuarioSeleccionado = selectUsuario.value;
    const criterioSeleccionado = selectCriterio.value;
    const direccionSeleccionada = selectDireccion.value;

    // 1. Filtrar las tareas combinando ambos criterios en memoria 
    const tareasFiltradas = cacheTareas.filter(tarea => {
        // Inicializar indicador de estado en verdadero
        let cumpleEstado = true;
        // Validar si hay un filtro de estado específico seleccionado
        if (estadoSeleccionado !== "todos") {
            // Comparar si el estado de la tarea coincide con el filtro seleccionado
            cumpleEstado = (tarea.status === estadoSeleccionado);
        }

        // Inicializar indicador de usuario asignado en verdadero
        let cumpleUsuario = true;
        // Validar si hay un filtro de usuario específico seleccionado
        if (usuarioSeleccionado !== "todos") {
            // Comparar si el ID de usuario asignado coincide con el del filtro
            cumpleUsuario = (Number(tarea.userId) === Number(usuarioSeleccionado));
        }

        // Devolver verdadero únicamente si cumple con ambos filtros de manera simultánea
        return cumpleEstado && cumpleUsuario;
    });

    // 2. Ordenar las tareas filtradas utilizando el módulo de ordenamiento dinámico (RF02)
    const tareasOrdenadas = ordenarTareas(tareasFiltradas, criterioSeleccionado, direccionSeleccionada);

    // Almacenar las tareas visibles ordenadas en la caché para posibilitar su exportación (RF04)
    tareasVisiblesCache = tareasOrdenadas;

    // Vaciar el contenedor del DOM para evitar duplicar las tareas al repintar
    tareaContainer.innerHTML = "";

    // Iterar sobre cada tarea ordenada y filtrada
    tareasOrdenadas.forEach(tarea => {
        // Crear el elemento HTML de la tarjeta de tarea usando el componente funcional
        const tarjeta = taskCard(tarea, eliminarTarea, editarTarea);
        // Agregar la tarjeta recién creada al contenedor principal
        tareaContainer.append(tarjeta);
    });

    // Buscar el elemento que muestra el contador total de tareas
    const taskCount = document.querySelector('#taskCount');
    // Si el elemento existe, actualizar su texto con la cantidad correspondiente
    if (taskCount) {
        // Configurar el texto formateando el plural en caso de ser necesario
        taskCount.textContent = `${tareasOrdenadas.length} tarea${tareasOrdenadas.length === 1 ? '' : 's'}`;
    }
};

export const cargarTareasServidor = async (userId, esLogin = false) => {
    const tareaContainer = document.querySelector("#tasksContainer");
    if (!tareaContainer) return;

    try {
        // Obtener todas las tareas de la base de datos (RF01 - Filtro simultáneo)
        const respuesta = await get("task");
        cacheTareas = Array.isArray(respuesta) ? respuesta : [];

        // Resetear filtros y ordenamientos si es un nuevo login
        if (esLogin) {
            const selectEstado = document.querySelector("#filterEstado");
            if (selectEstado) {
                selectEstado.value = "todos";
            }
            const selectCriterio = document.querySelector("#sortCriterio");
            if (selectCriterio) {
                selectCriterio.value = "fecha";
            }
            const selectDireccion = document.querySelector("#sortDireccion");
            if (selectDireccion) {
                selectDireccion.value = "desc";
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

        // Inicializar event listeners de filtros y ordenamientos solo una vez
        if (!filtrosInicializados) {
            const selectEstado = document.querySelector("#filterEstado");
            const selectUsuario = document.querySelector("#filterUsuario");
            const selectCriterio = document.querySelector("#sortCriterio");
            const selectDireccion = document.querySelector("#sortDireccion");

            if (selectEstado && selectUsuario && selectCriterio && selectDireccion) {
                selectEstado.addEventListener("change", filtrarYRenderizarTareas);
                selectUsuario.addEventListener("change", filtrarYRenderizarTareas);
                selectCriterio.addEventListener("change", filtrarYRenderizarTareas);
                selectDireccion.addEventListener("change", filtrarYRenderizarTareas);
                filtrosInicializados = true;
            }
        }

        // Ejecutar el filtrado y renderizado inicial
        filtrarYRenderizarTareas();

    } catch (error) {
        console.error("Error al cargar tareas:", error);
    }
};

// Exportar la función getter para obtener el listado de tareas visibles (RF04)
export const obtenerTareasVisibles = () => tareasVisiblesCache;
