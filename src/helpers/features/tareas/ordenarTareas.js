const prioridadesEstado = {
    "pendiente": 1,
    "en-progreso": 2,
    "completada": 3
};

export const ordenarTareas = (tareas, criterio, direccion) => {
    // Clonar el arreglo original para evitar efectos colaterales de mutación (función pura)
    const tareasOrdenadas = [...tareas];

    // Aplicar el método de ordenamiento sort nativo
    tareasOrdenadas.sort((a, b) => {
        // Inicializar el coeficiente de comparación en neutro
        let comparacion = 0;

        // Comprobar si el criterio seleccionado es ordenar por nombre
        if (criterio === "nombre") {
            // Obtener títulos o cadena vacía si no existe para evitar errores
            const tituloA = a.title || "";
            const tituloB = b.title || "";
            // Comparar strings usando localeCompare en idioma español de forma insensible a mayúsculas
            comparacion = tituloA.localeCompare(tituloB, 'es', { sensitivity: 'base' });
        // Comprobar si el criterio seleccionado es ordenar por estado
        } else if (criterio === "estado") {
            // Traducir los nombres de estados a sus prioridades numéricas definidas arriba
            const ordenA = prioridadesEstado[a.status] || 0;
            const ordenB = prioridadesEstado[b.status] || 0;
            // Comparar las prioridades numéricas de los estados
            comparacion = ordenA - ordenB;
        // Por defecto, se ordena por fecha de creación o ID único
        } else {
            // Convertir la fecha o usar el ID numérico si no posee fecha registrada
            const fechaA = a.createdAt ? new Date(a.createdAt).getTime() : (a.id || 0);
            const fechaB = b.createdAt ? new Date(b.createdAt).getTime() : (b.id || 0);
            // Comparar los timestamps o identificadores de las tareas
            comparacion = fechaA - fechaB;
        }

        // Invertir el signo de comparación en caso de orden descendente
        return direccion === "desc" ? -comparacion : comparacion;
    });

    // Retornar la lista ordenada resultante
    return tareasOrdenadas;
};
