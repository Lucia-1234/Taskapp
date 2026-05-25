/**
 * @file userItem.js
 * @description Componente funcional de UI que genera dinámicamente un nodo del DOM para representar un ítem de usuario seleccionable.
 */

/**
 * Crea y retorna el elemento HTML para un usuario de la lista, con un botón para seleccionarlo.
 * 
 * @param {Object} user - Datos del usuario a representar.
 * @param {string} user.id - Identificador único del usuario.
 * @param {string} user.name - Nombre del usuario.
 * @param {boolean} user.active - Estado de actividad del usuario (activo o inactivo).
 * @param {function} onSelect - Callback que se ejecuta cuando el usuario es seleccionado.
 * @returns {HTMLDivElement} El nodo div contenedor del ítem del usuario.
 */
export const userItem = (user, onSelect) => {
    // Crea el elemento div que servirá como contenedor principal del ítem de usuario.
    const item = document.createElement("div");
    // Agrega la clase CSS encargada de dar formato de fila y diseño al ítem de usuario.
    item.className = "user-item";

    // Crea el elemento span para mostrar la información del usuario en texto.
    const info = document.createElement("span");
    // Agrega la clase encargada de definir el tamaño y color del texto del usuario.
    info.className = "user-item__info";
    // Construye y asigna el texto descriptivo incluyendo ID, nombre y una traducción legible de su estado activo.
    info.textContent = `ID: ${user.id} - ${user.name} (${user.active ? 'Activo' : 'Inactivo'})`;

    // Crea el elemento botón para realizar la selección del usuario.
    const btn = document.createElement("button");
    // Especifica explícitamente el tipo de botón como 'button' para prevenir el envío accidental de formularios.
    btn.type = "button";
    // Aplica la clase correspondiente a los botones internos de ítems de la lista.
    btn.className = "user-item__btn";
    // Define el texto visible del botón.
    btn.textContent = "Seleccionar";
    
    // Añade el escuchador de eventos de clic al botón para disparar la selección.
    btn.addEventListener("click", () => {
        // Ejecuta el callback de selección pasando el objeto de usuario como argumento.
        onSelect(user);
    });

    // Añade el span de información y el botón de selección al contenedor principal del ítem.
    item.append(info, btn);

    // Retorna el elemento del DOM completamente construido y enlazado a eventos.
    return item;
};
