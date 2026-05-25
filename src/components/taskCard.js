/**
 * @file taskCard.js
 * @description Componente funcional de UI que genera dinámicamente un nodo del DOM para representar la tarjeta de una tarea.
 */

/**
 * Crea y retorna el elemento HTML que representa la tarjeta de una tarea con botones de acción para editar y eliminar.
 * 
 * @param {Object} task - Datos de la tarea a representar.
 * @param {string} task.title - Título de la tarea.
 * @param {string} [task.description] - Descripción de la tarea.
 * @param {string} [task.Tarea] - Campo alternativo para la descripción.
 * @param {string} [task.createdAt] - Fecha de creación de la tarea.
 * @param {function} onEliminar - Callback que se ejecuta al presionar el botón de eliminar.
 * @param {function} onEditar - Callback que se ejecuta al presionar el botón de editar.
 * @returns {HTMLDivElement} El elemento contenedor de la tarjeta listo para insertarse en el DOM.
 */
export const taskCard = (task, onEliminar, onEditar) => {
    // Crea el elemento div contenedor principal de la tarjeta.
    const card = document.createElement("div");
    // Agrega la clase CSS que define el estilo y estructura visual de la tarjeta de mensaje.
    card.classList.add("message-card");

    // Crea el contenedor interno que agrupará la información textual de la tarea (título, descripción, fecha).
    const card_contenedor = document.createElement("div");
    // Asigna la clase de contenedor interno de tarjeta para la disposición flex/grid del texto.
    card_contenedor.classList.add("container__card");

    // Crea el elemento párrafo para el título de la tarea.
    const title = document.createElement("p");
    // Asigna la clase correspondiente al nombre de usuario/título en los estilos.
    title.classList.add("message-card__username");
    // Establece el texto del elemento con el título de la tarea recibida.
    title.textContent = task.title;

    // Crea el elemento párrafo para el cuerpo o descripción de la tarea.
    const tarea = document.createElement("p");
    // Asigna la clase de contenido para el formato y legibilidad del texto de descripción.
    tarea.classList.add("message-card__content");
    // Asigna la descripción principal, o el campo alternativo 'Tarea', o un string vacío como salvaguarda contra valores indefinidos.
    tarea.textContent = task.description || task.Tarea || '';

    // Crea el elemento span para mostrar la fecha de creación.
    const fecha = document.createElement("span");
    // Agrega la clase encargada de dar un estilo de marca de tiempo (tipografía pequeña y atenuada).
    fecha.classList.add("message-card__timestamp");
    // Formatea el texto mostrando la fecha si existe, de lo contrario muestra un texto por defecto.
    fecha.textContent = task.createdAt ? `Creado: ${task.createdAt}` : "Sin fecha";

    // Agrega el título, la descripción y la fecha al contenedor interno de información de la tarjeta.
    card_contenedor.append(title, tarea, fecha);

    // Crea el contenedor div que agrupará los botones de acción para la tarjeta.
    const buttons = document.createElement("div");
    // Agrega la clase CSS que posiciona los botones en fila o columna al lado de la información.
    buttons.classList.add("buttons-card");

    // Crea el botón de eliminación de la tarea.
    const botonEliminar = document.createElement("button");
    // Aplica las clases de botón genérico y modificador de peligro (color rojo) definidos en el sistema de diseño.
    botonEliminar.className = "btn btn--danger";
    // Define el texto visible del botón.
    botonEliminar.textContent = "Eliminar";

    // Crea el botón para editar la tarea.
    const botonEditar = document.createElement("button");
    // Aplica las clases de botón genérico y modificador primario (color azul) para destacar la acción de editar.
    botonEditar.className = "btn btn--primary";
    // Define el texto visible del botón.
    botonEditar.textContent = "Editar";

    // Asocia el evento de click en eliminar para ejecutar el callback pasando la tarea seleccionada.
    botonEliminar.addEventListener("click", () => {
        // Llama a la función callback de eliminación recibida como argumento.
        onEliminar(task);
    });

    // Asocia el evento de click en editar para ejecutar el callback pasando la tarea seleccionada.
    botonEditar.addEventListener("click", () => {
        // Llama a la función callback de edición recibida como argumento.
        onEditar(task);
    });

    // Agrega los botones de editar y eliminar al contenedor de botones de la tarjeta.
    buttons.append(botonEditar, botonEliminar);

    // Agrega el bloque de información textual y el bloque de botones al contenedor principal de la tarjeta.
    card.append(card_contenedor, buttons);

    // Retorna el nodo HTML de la tarjeta completamente configurado y estructurado.
    return card;
}