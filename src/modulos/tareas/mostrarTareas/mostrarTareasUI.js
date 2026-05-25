export const mostrarSeccionTareas = () => {
    const taskSection = document.querySelector("#taskSection");
    const tasksListSection = document.querySelector("#tasksListSection");

    if (taskSection) taskSection.classList.remove("hidden");
    if (tasksListSection) tasksListSection.classList.remove("hidden");
};

export const ocultarSeccionTareas = () => {
    const taskSection = document.querySelector("#taskSection");
    const tasksListSection = document.querySelector("#tasksListSection");

    if (taskSection) taskSection.classList.add("hidden");
    if (tasksListSection) tasksListSection.classList.add("hidden");
};
