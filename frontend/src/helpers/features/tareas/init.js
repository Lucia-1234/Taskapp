import { inicializarBusquedaUsuario } from '../usuarios/buscarUsuario.js';

import { inicializarCrearTarea } from './crearTarea.js';

import { mostrarVistaTareas } from './mostrarTareas.js';

let usuarioActual = null;

export const inicializarTareas = () => {

    inicializarBusquedaUsuario((usuario) => {
        usuarioActual = usuario;
        mostrarVistaTareas(usuario);
    }
    );

    inicializarCrearTarea(() => usuarioActual);

}