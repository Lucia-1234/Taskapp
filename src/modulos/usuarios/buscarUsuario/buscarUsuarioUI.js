/**
 * @file buscarUsuarioUI.js
 * @description Módulo encargado de la manipulación directa de la interfaz gráfica (DOM) del submódulo de búsqueda de usuarios.
 */

import { userItem } from '@/components/userItem.js';

/**
 * Verifica si existe en el DOM el formulario para buscar usuarios.
 * 
 * @returns {boolean} True si el formulario está en el documento, False de lo contrario.
 */
export const existeFormUsuario = () => {
    // Comprueba la existencia del selector '#formUsuario' y fuerza la conversión a booleano mediante doble negación.
    return !!document.querySelector("#formUsuario");
};

/**
 * Obtiene el valor limpio de ID de usuario ingresado en el input de texto del formulario.
 * 
 * @returns {string} El ID del usuario limpio de espacios, o cadena vacía si no existe el elemento.
 */
export const obtenerIdUsuario = () => {
    // Busca el input de ID de usuario en el documento.
    const input = document.querySelector("#usuarioId");
    // Retorna el valor recortado de espacios en los extremos, o un string vacío si el input no existe.
    return input ? input.value.trim() : "";
};

/**
 * Establece el valor del ID de usuario en el input de texto de búsqueda.
 * 
 * @param {string|number} id - El ID del usuario que se quiere escribir en el input.
 * @returns {void}
 */
export const establecerIdUsuario = (id) => {
    // Busca el input de ID de usuario en el documento.
    const input = document.querySelector("#usuarioId");
    // Si el elemento existe, modifica su propiedad value con el ID proveído.
    if (input) {
        input.value = id;
    }
};

/**
 * Dispara manualmente un evento 'submit' en el formulario de búsqueda de usuario.
 * Se utiliza para simular el click/submit cuando un usuario se selecciona directamente del listado inicial.
 * 
 * @returns {void}
 */
export const dispararSubmitUsuario = () => {
    // Busca el formulario en el DOM.
    const form = document.querySelector("#formUsuario");
    // Si el formulario existe, despacha programáticamente un evento de tipo submit para desencadenar el flujo de búsqueda.
    if (form) {
        form.dispatchEvent(new Event("submit"));
    }
};

/**
 * Muestra el estado o mensaje de resultado de la búsqueda en la sección correspondiente.
 * 
 * @param {string} mensaje - El texto informativo que se va a mostrar.
 * @param {string} tipoClase - Nombre de la clase CSS de estilo (error, exito, etc.) que se aplicará al contenedor.
 * @returns {void}
 */
export const mostrarEstadoBusqueda = (mensaje, tipoClase) => {
    // Localiza el elemento contenedor de resultados de la búsqueda del usuario.
    const resultado = document.querySelector("#resultadoUsuario");
    // Si el elemento existe, configura su clase y su texto visible.
    if (resultado) {
        // Asigna la clase recibida para controlar el color del texto y bordes.
        resultado.className = tipoClase;
        // Coloca el mensaje como el nuevo contenido textual del elemento.
        resultado.textContent = mensaje;
    }
};

/**
 * Renderiza la lista visual de usuarios disponibles para selección rápida.
 * 
 * @param {Array.<Object>} usuarios - El arreglo de usuarios cargados del servidor.
 * @param {function} onSelect - Callback disparado al hacer click en 'Seleccionar' en un usuario.
 * @returns {void}
 */
export const renderizarListaUsuarios = (usuarios, onSelect) => {
    // Obtiene el contenedor de los ítems de usuario individuales.
    const container = document.querySelector("#usuariosItemsContainer");
    // Obtiene el contenedor general de la lista que se puede ocultar o mostrar.
    const listContainer = document.querySelector("#listaUsuariosDisponibles");
    // Si alguno de los elementos de UI necesarios no existe, detiene la ejecución del render.
    if (!container || !listContainer) return;

    // Si existen usuarios disponibles en la lista provista.
    if (Array.isArray(usuarios) && usuarios.length > 0) {
        // Remueve la clase 'hidden' para hacer visible la sección que contiene la lista.
        listContainer.classList.remove("hidden");
        // Limpia el contenido HTML interno anterior para evitar duplicación de elementos.
        container.innerHTML = "";
        // Itera sobre el listado de usuarios construyendo e insertando su representación visual.
        usuarios.forEach(user => {
            // Crea un nuevo componente HTML de tipo item de usuario pasándole sus datos y el callback de selección.
            const item = userItem(user, () => {
                // Ejecuta la función de selección externa cuando el botón sea clickeado.
                onSelect(user);
            });
            // Agrega el nuevo nodo DOM al final del contenedor.
            container.append(item);
        });
    } else {
        // Si no hay usuarios, oculta completamente el contenedor de la lista rápida en la interfaz.
        listContainer.classList.add("hidden");
    }
};

/**
 * Asocia una función callback al envío (submit) del formulario de búsqueda.
 * 
 * @param {function} onSubmit - Función callback que se ejecutará cuando se envíe el formulario.
 * @returns {void}
 */
export const configurarSubmitUsuario = (onSubmit) => {
    // Busca el elemento del formulario en la UI.
    const form = document.querySelector("#formUsuario");
    // Si existe el formulario, agrega el escuchador para interceptar el evento.
    if (form) {
        form.addEventListener("submit", (e) => {
            // Previene el comportamiento predeterminado del navegador de recargar la página completa al enviar.
            e.preventDefault();
            // Ejecuta el callback definido para realizar la petición y búsqueda.
            onSubmit();
        });
    }
};

/**
 * Deshabilita los controles del formulario y muestra un mensaje visual de cargando.
 * 
 * @returns {void}
 */
export const mostrarLoadingUsuario = () => {
    // Busca el botón de submit del formulario de búsqueda de usuario.
    const btn = document.querySelector("#formUsuario button[type='submit']");
    // Busca el input de ID.
    const input = document.querySelector("#usuarioId");
    
    // Deshabilita temporalmente el botón para prevenir llamadas concurrentes del usuario.
    if (btn) {
        btn.disabled = true;
        // Almacena el texto original del botón en un atributo dataset para poder restaurarlo después.
        btn.dataset.originalText = btn.textContent;
        // Cambia el texto visible a un indicador de acción en curso.
        btn.textContent = "Buscando...";
    }
    // Deshabilita el input para impedir que el usuario altere el ID mientras se realiza la consulta.
    if (input) {
        input.disabled = true;
    }
    
    // Muestra un estado visual provisional de búsqueda.
    mostrarEstadoBusqueda("Buscando usuario...", "texto--buscando");
};

/**
 * Habilita de nuevo los controles del formulario y restaura el texto original del botón.
 * 
 * @returns {void}
 */
export const ocultarLoadingUsuario = () => {
    // Busca el botón de envío.
    const btn = document.querySelector("#formUsuario button[type='submit']");
    // Busca el input de texto.
    const input = document.querySelector("#usuarioId");
    
    // Habilita el botón restaurando su estado inicial.
    if (btn) {
        btn.disabled = false;
        // Si hay un texto original guardado, lo asigna nuevamente como texto del botón.
        if (btn.dataset.originalText) {
            btn.textContent = btn.dataset.originalText;
        }
    }
    // Habilita nuevamente el input de ID de usuario.
    if (input) {
        input.disabled = false;
    }
};
