import { mostrarNombreUsuario, ocultarNombreUsuario } from './mostrarUsuarioUI.js';

export const mostrarUsuario = (usuario) => {
    if (usuario) {
        mostrarNombreUsuario(usuario.name);
    } else {
        ocultarNombreUsuario();
    }
};
