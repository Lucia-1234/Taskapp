import { get } from '@/helpers/api/index.js';
import { ordenarTareas } from '@/helpers/utils/ordenarTareas.js';
import { eliminarTarea } from '@/modulos/tareas/eliminarTarea/index.js';
import { editarTarea } from '@/modulos/tareas/editarTarea/index.js';
import {
    existeContenedorTareas,
    existenFiltros,
    obtenerValoresFiltros,
    establecerValoresFiltrosPredeterminados,
    renderizarListaTareas,
    poblarFiltroUsuarios,
    configurarListenersFiltros,
    mostrarLoading,
    ocultarLoading
} from './listarTareasUI.js';

let cacheTareas = [];
let tareasVisiblesCache = [];
let filtrosInicializados = false;

export const filtrarYRenderizarTareas = () => {
    if (!existeContenedorTareas() || !existenFiltros()) return;

    const filtros = obtenerValoresFiltros();
    if (!filtros) return;

    const { estado, usuario, criterio, direccion } = filtros;

    const tareasFiltradas = cacheTareas.filter(tarea => {
        const cumpleEstado = estado === "todos" || tarea.status === estado;
        const cumpleUsuario = usuario === "todos" || Number(tarea.userId) === Number(usuario);
        return cumpleEstado && cumpleUsuario;
    });

    const tareasOrdenadas = ordenarTareas(tareasFiltradas, criterio, direccion);
    tareasVisiblesCache = tareasOrdenadas;

    renderizarListaTareas(tareasOrdenadas, eliminarTarea, editarTarea);
};

export const cargarTareasServidor = async (userId, esLogin = false) => {
    if (!existeContenedorTareas()) return;

    mostrarLoading();
    try {
        const respuesta = await get("task");
        cacheTareas = Array.isArray(respuesta) ? respuesta : [];

        establecerValoresFiltrosPredeterminados(esLogin, userId);
        poblarFiltroUsuarios(userId, esLogin);

        if (!filtrosInicializados) {
            configurarListenersFiltros(filtrarYRenderizarTareas);
            filtrosInicializados = true;
        }

        filtrarYRenderizarTareas();
    } catch (error) {
        console.error("Error al cargar tareas:", error);
    } finally {
        ocultarLoading();
    }
};

export const obtenerTareasVisibles = () => tareasVisiblesCache;
