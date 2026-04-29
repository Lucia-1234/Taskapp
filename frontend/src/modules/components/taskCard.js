export const taskCard = (task) => {
    const card = document.createElement("div");
    card.classList.add("task-card")
    
    const title = document.createElement("p");
    title.classList.add("task-card__title")
    title.textContent = task.title;
    
    const tarea = document.createElement("p");
    tarea.classList.add("task-card__tarea")
    tarea.textContent = task.Tarea


    card.append(title,tarea)

    return card
}