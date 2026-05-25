import { cargarTareasServidor } from '@/modulos/tareas/listarTareas/index.js';
import { mostrarSeccionTareas, ocultarSeccionTareas } from './mostrarTareasUI.js';

export const mostrarVistaTareas = (usuario) => {
    if (usuario) {
        mostrarSeccionTareas();
        cargarTareasServidor(Number(usuario.id), true);
    } else {
        ocultarSeccionTareas();
    }
};
