/**
 * @file mostrarNotificacionUI.js
 * @description Maneja la creación e inserción en el DOM de las notificaciones emergentes (toasts) de la aplicación,
 * controlando sus animaciones de entrada, salida y auto-eliminación.
 */

/**
 * Crea y renderiza un elemento de notificación flotante (toast) en la pantalla.
 * 
 * @param {string} mensaje - Texto descriptivo que se mostrará al usuario.
 * @param {'info'|'exito'|'error'} [tipo='info'] - Tipo visual de la notificación que define la paleta de colores.
 * @returns {void}
 */
export const mostrarNotificacionDOM = (mensaje, tipo = 'info') => {
    // Intenta obtener el contenedor general de notificaciones existente en el DOM.
    let container = document.getElementById('notificationContainer');
    
    // Si no existe el contenedor de notificaciones, lo crea para agrupar los toasts.
    if (!container) {
        // Crea un nuevo elemento div que servirá como contenedor flotante.
        container = document.createElement('div');
        // Le asigna un id único para identificarlo en futuras llamadas.
        container.id = 'notificationContainer';
        // Agrega la clase CSS que define su posición absoluta/fija en la pantalla.
        container.className = 'notification-container';
        // Adjunta el contenedor directamente al cuerpo del documento (body).
        document.body.appendChild(container);
    }

    // Crea el elemento individual de tipo toast (caja de la notificación).
    const toast = document.createElement('div');
    // Le asigna las clases base del toast y el modificador del tipo específico (ej. toast--exito, toast--error).
    toast.className = `toast toast--${tipo}`;

    // Crea un elemento span para contener el texto del mensaje.
    const messageText = document.createElement('span');
    // Le asigna la clase CSS específica para dar estilo al texto del mensaje.
    messageText.className = 'toast__message';
    // Define el contenido textual de la notificación.
    messageText.textContent = mensaje;

    // Crea el botón de cierre manual (la equis) para que el usuario pueda ocultar el mensaje de inmediato.
    const closeBtn = document.createElement('button');
    // Asigna la clase de diseño para el botón de cierre.
    closeBtn.className = 'toast__close';
    // Define el símbolo de la cruz (multiplicación) como texto del botón.
    closeBtn.textContent = '×';
    // Establece el atributo de accesibilidad para lectores de pantalla.
    closeBtn.setAttribute('aria-label', 'Cerrar notificación');

    // Agrega el evento click al botón de cierre.
    closeBtn.addEventListener('click', () => {
        // Añade la clase CSS de salida que inicia la transición de desvanecimiento (fade-out).
        toast.classList.add('toast--fade-out');
        // Escucha el fin de la animación de transición CSS antes de eliminar el nodo del DOM.
        toast.addEventListener('transitionend', () => {
            // Elimina la notificación del DOM.
            toast.remove();
            // Comprueba si ya no quedan notificaciones hijas dentro del contenedor flotante.
            if (container.children.length === 0) {
                // Remueve el contenedor del DOM para evitar nodos vacíos y limpiar el árbol HTML.
                container.remove();
            }
        });
    });

    // Adjunta el texto del mensaje y el botón de cierre dentro del elemento de la notificación individual.
    toast.append(messageText, closeBtn);
    // Inserta la nueva notificación creada en la parte superior o inferior del contenedor general.
    container.appendChild(toast);

    // Configura un temporizador para ocultar automáticamente la notificación después de 4 segundos.
    setTimeout(() => {
        // Verifica que la notificación siga existiendo en el DOM (que el usuario no la haya cerrado manualmente antes).
        if (toast.parentNode) {
            // Activa la clase CSS de transición para desvanecer la notificación.
            toast.classList.add('toast--fade-out');
            // Escucha el evento de fin de la transición antes de limpiar el DOM.
            toast.addEventListener('transitionend', () => {
                // Remueve la notificación expirada del documento.
                toast.remove();
                // Verifica si el contenedor se ha quedado sin notificaciones visibles.
                if (container.children.length === 0) {
                    // Remueve el contenedor de notificaciones para dejar el DOM limpio.
                    container.remove();
                }
            });
        }
    }, 4000); // 4000 milisegundos = 4 segundos de visibilidad en pantalla antes de desaparecer.
};
