export const taskCard = (task, onEliminar, onEditar) => {
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
    
    const buttons = document.createElement("div");
    buttons.classList.add("buttons-card");
    
    const botonEliminar = document.createElement("button");
    botonEliminar.className = ("btn btn--primary");
    botonEliminar.textContent = "Eliminar";
    
    
    const botonEditar = document.createElement("button");
    botonEditar.className = ("btn btn--primary");
    botonEditar.textContent = "Editar";
    
    
    buttons.append(botonEditar, botonEliminar);
    
    card.append(card_contenedor, buttons);



    botonEliminar.addEventListener("click", e => {
        onEliminar(task);
    })

    botonEditar.addEventListener("click", e => {
        onEditar(task);
    })


    return card
}