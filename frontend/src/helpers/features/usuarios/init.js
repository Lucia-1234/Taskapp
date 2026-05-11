import { inicializarBusquedaUsuario } from './buscarUsuario.js';

import { mostrarUsuario } from './mostrarUsuarios.js';

// Este módulo es una versión alternativa de la búsqueda de usuario.
// No está integrada en la aplicación principal `frontend/src/app/index.js`.
export const inicializarUsuarios = (alEncontrarUsuario) => {

    if (!document.querySelector("#formUsuario")) return;

    inicializarBusquedaUsuario((usuario) => {
        mostrarUsuario(usuario);
        alEncontrarUsuario(usuario);
    });

}