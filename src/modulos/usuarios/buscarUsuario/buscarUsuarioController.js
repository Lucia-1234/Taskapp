/**
 * @file buscarUsuarioController.js
 * @description Controlador encargado de la búsqueda y selección de usuarios.
 * Maneja la caché local de usuarios, carga inicial del listado y el envío del formulario de selección.
 */

import { get } from '@/helpers/api/index.js';
import { notificarExito, notificarError } from '@/modulos/notificaciones/index.js';
import {
    existeFormUsuario,
    obtenerIdUsuario,
    establecerIdUsuario,
    dispararSubmitUsuario,
    mostrarEstadoBusqueda,
    renderizarListaUsuarios,
    configurarSubmitUsuario,
    mostrarLoadingUsuario,
    ocultarLoadingUsuario
} from './buscarUsuarioUI.js';

// Variable de ámbito local que actúa como caché para evitar peticiones repetidas del listado general de usuarios.
let usuariosCache = [];

/**
 * Retorna el listado de usuarios almacenado en la caché local.
 * 
 * @returns {Array.<Object>} Arreglo de usuarios en caché.
 */
export const obtenerUsuariosCache = () => {
    // Retorna la variable caché para compartir el listado general con otros módulos de manera directa.
    return usuariosCache;
};

/**
 * Inicializa el flujo de búsqueda de usuarios, asociando los eventos de UI y realizando la carga inicial.
 * 
 * @param {function} alEncontrarUsuario - Callback ejecutado tras encontrar/seleccionar con éxito un usuario.
 * @returns {void}
 */
export const inicializarBusquedaUsuario = (alEncontrarUsuario) => {
    // Si el formulario de usuario no existe en la vista actual, aborta la inicialización para evitar errores de referencias nulas.
    if (!existeFormUsuario()) return;

    // Función interna asíncrona encargada de cargar los usuarios disponibles desde el backend.
    const cargarUsuariosIniciales = async () => {
        try {
            // Solicita al backend la lista general de usuarios registrados.
            const usuarios = await get("users");
            // Verifica que la respuesta sea un arreglo válido con al menos un elemento.
            if (Array.isArray(usuarios) && usuarios.length > 0) {
                // Almacena la lista de usuarios en la caché local del módulo.
                usuariosCache = usuarios;
                // Renderiza los usuarios en la UI, definiendo la acción a ejecutar cuando se selecciona un ítem de la lista.
                renderizarListaUsuarios(usuarios, (user) => {
                    // Establece el ID del usuario seleccionado en el campo de texto input del formulario.
                    establecerIdUsuario(user.id);
                    // Dispara programáticamente el evento 'submit' del formulario de búsqueda para realizar la consulta oficial del usuario.
                    dispararSubmitUsuario();
                });
            }
        } catch (error) {
            // Registra en consola cualquier error de red al intentar descargar los usuarios iniciales.
            console.error("Error al cargar la lista de usuarios:", error);
        }
    };

    // Invoca la carga inicial de usuarios al montar o inicializar el módulo.
    cargarUsuariosIniciales();

    // Configura el escuchador del evento submit del formulario de búsqueda del usuario.
    configurarSubmitUsuario(async () => {
        // Obtiene el ID ingresado o seleccionado en el input de búsqueda.
        const usuarioId = obtenerIdUsuario();
        // Si el campo de ID está vacío, cancela el flujo de búsqueda.
        if (!usuarioId) return;

        // Deshabilita los controles y muestra un indicador visual de carga durante la consulta.
        mostrarLoadingUsuario();

        try {
            // Solicita al servidor los datos específicos del usuario por su ID.
            const usuario = await get(`users/${usuarioId}`);
            // Valida que la respuesta devuelta por el servidor sea un objeto de usuario válido.
            if (usuario && usuario.id) {
                // Muestra un estado de éxito indicando la información y estado de actividad del usuario en pantalla.
                mostrarEstadoBusqueda(
                    `Usuario: ${usuario.name} | Está activo: ${usuario.active}`,
                    "texto--exito"
                );
                // Notifica al usuario de forma flotante dándole la bienvenida.
                notificarExito(`¡Bienvenido/a, ${usuario.name}!`);
                // Ejecuta el callback proporcionado enviando la instancia del usuario encontrado.
                alEncontrarUsuario(usuario);
            }
        } catch (error) {
            // Actualiza la interfaz informando que el usuario no fue hallado.
            mostrarEstadoBusqueda("Usuario no encontrado.", "texto--error");
            // Muestra una notificación emergente visual del error de búsqueda.
            notificarError("Usuario no encontrado.");
            // Ejecuta el callback enviando null para indicar que no hay usuario activo seleccionado.
            alEncontrarUsuario(null);
        } finally {
            // Reactiva el botón y quita los estados de carga de la UI tras completarse la petición.
            ocultarLoadingUsuario();
        }
    });
};
