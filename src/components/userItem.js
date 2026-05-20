/**
 * Componente que representa un item de usuario dentro de la lista de selección.
 * Retorna un elemento del DOM completamente estructurado.
 */
export const userItem = (user, onSelect) => {
    // 1. Crear el contenedor principal para el item de usuario
    const item = document.createElement("div");
    // Asignar el nombre de la clase CSS para el contenedor
    item.className = "user-item";

    // 2. Crear la etiqueta span que mostrará la información de ID y Nombre
    const info = document.createElement("span");
    // Asignar la clase CSS para el span
    info.className = "user-item__info";
    // Inyectar el texto formateado de forma segura sin usar innerHTML
    info.textContent = `ID: ${user.id} - ${user.name} (${user.active ? 'Activo' : 'Inactivo'})`;

    // 3. Crear el botón de acción para seleccionar el usuario
    const btn = document.createElement("button");
    // Asignar el tipo de elemento HTML
    btn.type = "button";
    // Agregar la clase del botón definida en styles.css
    btn.className = "user-item__btn";
    // Asignar el texto visible
    btn.textContent = "Seleccionar";
    
    // 4. Asignar el escuchador de eventos click al botón
    btn.addEventListener("click", () => {
        // Ejecutar el callback de retorno con la información del usuario
        onSelect(user);
    });

    // 5. Agregar el texto de información y el botón al contenedor principal
    item.append(info, btn);

    // Retornar el elemento DOM del componente listo para ser renderizado
    return item;
};
