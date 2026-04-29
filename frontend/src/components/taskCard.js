export const taskCard = (task, onEliminar) => {
    const card = document.createElement("div");
    card.classList.add("message-card")
    
    const title = document.createElement("p");
    title.classList.add("message-card__username")
    title.textContent = task.title;
    
    const tarea = document.createElement("p");
    tarea.classList.add("message-card__content")
    tarea.textContent = task.Tarea

    const botonEliminar = document.createElement("button");
    botonEliminar.className = ("btn btn--primary");
    botonEliminar.textContent = "Eliminar";

    card.append(title,tarea,botonEliminar)


    botonEliminar.addEventListener("click", e => {
        onEliminar(task);
    })


    return card
}