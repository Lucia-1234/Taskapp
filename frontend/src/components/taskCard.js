export const taskCard = (task, onEliminar) => {
    const card = document.createElement("div");
    card.classList.add("message-card")
    
    const card_contenedor = document.createElement("div");
    card_contenedor.classList.add("container__card");

    const title = document.createElement("p");
    title.classList.add("message-card__username")
    title.textContent = task.title;
    
    const tarea = document.createElement("p");
    tarea.classList.add("message-card__content")
    tarea.textContent = task.Tarea

    card_contenedor.append(title,tarea)
    const botonEliminar = document.createElement("button");
    botonEliminar.className = ("btn btn--primary");
    botonEliminar.textContent = "Eliminar";

    card.append(card_contenedor,botonEliminar)


    botonEliminar.addEventListener("click", e => {
        onEliminar(task);
    })


    return card
}