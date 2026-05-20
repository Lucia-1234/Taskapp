
export const mostrarNotificacion = (mensaje, tipo = 'info') => {
    // Buscar si ya existe el contenedor flotante de notificaciones en el DOM por su ID único
    let container = document.getElementById('notificationContainer');
    
    // Si no existe, crearlo dinámicamente y agregarlo al final del cuerpo del documento HTML
    if (!container) {
        // Crear elemento div para alojar todas las notificaciones
        container = document.createElement('div');
        // Asignar el ID único para futuras consultas en el DOM
        container.id = 'notificationContainer';
        // Asignar la clase CSS para aplicar los estilos de posicionamiento flotante
        container.className = 'notification-container';
        // Insertar el contenedor recién creado en el cuerpo del documento HTML
        document.body.appendChild(container);
    }

    // Crear el elemento div principal para la tarjeta (toast) de notificación
    const toast = document.createElement('div');
    // Asignar las clases CSS base y la variante de color correspondiente al tipo de toast
    toast.className = `toast toast--${tipo}`;

    // Crear la etiqueta span para mostrar el texto de la notificación
    const messageText = document.createElement('span');
    // Asignar la clase CSS para los estilos de tipografía y color del texto
    messageText.className = 'toast__message';
    // Asignar el texto de forma segura utilizando textContent para evitar inyección de código
    messageText.textContent = mensaje;

    // Crear el botón de cierre manual representado por el símbolo de multiplicación (×)
    const closeBtn = document.createElement('button');
    // Asignar la clase CSS para dar estilo al botón sin bordes ni fondo
    closeBtn.className = 'toast__close';
    // Colocar el símbolo de cruz como texto del botón
    closeBtn.textContent = '×';
    // Añadir el atributo de accesibilidad para los lectores de pantalla
    closeBtn.setAttribute('aria-label', 'Cerrar notificación');

    // Escuchar el evento click en el botón para cerrar la notificación de forma interactiva
    closeBtn.addEventListener('click', () => {
        // Agregar la clase de animación de desvanecimiento
        toast.classList.add('toast--fade-out');
        // Escuchar el final de la transición de CSS para eliminar físicamente el nodo del DOM
        toast.addEventListener('transitionend', () => {
            // Quitar el elemento toast del árbol de nodos
            toast.remove();
            // Si el contenedor flotante queda completamente vacío, eliminarlo del body
            if (container.children.length === 0) {
                // Quitar el contenedor del árbol de nodos
                container.remove();
            }
        });
    });

    // Ensamblar la tarjeta de notificación agregando el texto y el botón de cierre
    toast.append(messageText, closeBtn);
    
    // Agregar la notificación terminada al contenedor flotante en pantalla
    container.appendChild(toast);

    // Configurar la remoción automática del toast tras transcurrir 4 segundos de exposición
    setTimeout(() => {
        // Validar si el toast sigue acoplado al árbol de nodos antes de proceder
        if (toast.parentNode) {
            // Agregar la clase CSS para activar la animación de desvanecimiento
            toast.classList.add('toast--fade-out');
            // Esperar a que la transición de opacidad termine antes de borrar el nodo
            toast.addEventListener('transitionend', () => {
                // Quitar la notificación del árbol de elementos
                toast.remove();
                // Validar si el contenedor general está vacío para removerlo también
                if (container.children.length === 0) {
                    // Quitar el contenedor de notificaciones del DOM
                    container.remove();
                }
            });
        }
    }, 4000);
};

// Atajos descriptivos de uso para simplificar las llamadas en los módulos del sistema
// Notificar un mensaje de éxito con estilo visual verde
export const notificarExito = (mensaje) => mostrarNotificacion(mensaje, 'exito');
// Notificar un mensaje de error con estilo visual rojo
export const notificarError = (mensaje) => mostrarNotificacion(mensaje, 'error');
// Notificar un mensaje de información con estilo visual azul
export const notificarInfo = (mensaje) => mostrarNotificacion(mensaje, 'info');
