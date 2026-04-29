export const taskCard = (task) => {
    const card = document.createElement("div");
    card.classList.add("message-card")
    
    const title = document.createElement("p");
    title.classList.add("message-card__username")
    title.textContent = task.title;
    
    const tarea = document.createElement("p");
    tarea.classList.add("message-card__content")
    tarea.textContent = task.Tarea


    card.append(title,tarea)

    return card
}