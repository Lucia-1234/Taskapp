import { inicializarBusquedaUsuario } from '@/modulos/usuarios/buscarUsuario/index.js';
import { mostrarUsuario } from '@/modulos/usuarios/mostrarUsuario/index.js';

// Este módulo es una versión alternativa de la búsqueda de usuario.
// No está integrada en la aplicación principal `frontend/src/app/index.js`.
export const inicializarUsuarios = (alEncontrarUsuario) => {
    if (!document.querySelector("#formUsuario")) return;

    inicializarBusquedaUsuario((usuario) => {
        mostrarUsuario(usuario);
        alEncontrarUsuario(usuario);
    });
};
