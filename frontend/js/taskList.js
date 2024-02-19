const taskList = {

    init: function()
    {
        // on vide la liste des tâches présentes dans le HTML/DOM d'origine
        // @see https://dev.to/javascript_jeep/how-to-empty-the-dom-element-in-javascript-nf8
        // 1. via textContent ou innerHTML
        // document.querySelector('.tasklist').textContent = '';
        // 2. via replaceChildren()
        document.querySelector('.tasklist').replaceChildren();

        // 3. on supprime directement les tâches du code HTML :D

        // appelle le chargement des tâches depuis l'API
        taskList.loadTasksFromApi();
    },

    // chargement des tâches
    loadTasksFromApi: async function () {
        // debug des tâches
        console.log('load tasks');

        try {
            // appel à l'API
            const response = await fetch('http://localhost:8000/api/tasks');
            // on extait les résulats de la réponse
            const tasks = await response.json();

            console.log(tasks);
            // on affiche les tâches
            taskList.displayTasks(tasks);

        } catch (error) {
            // si le serveur ne répond pas ou que l'URL n'est pas correcte, on rentre dans le catch !
            console.error('Erreur rencontrée lors de la récupération des tâches : ' + error);
            alert('Erreur rencontrée lors de la récupération des tâches.');
        }
    },

    /**
     * Ajoute les tâches au DOM
     */
    displayTasks: function (tasks) {
        // <li data-id="0">
        //     <p>sortir les poubelles</p>
        //     <div class="delete"></div>
        //     <div class="edit"></div>
        // </li>

        // ici on parcourt le tableau de tasks avec une boucle
        for (const taskData of tasks) {
            // console.log(task);

            // on crée les 4 éléments qui constituent une tâche
            const taskElement = task.createElement(taskData);
            // ajout au DOM
            taskList.addTaskToDom(taskElement);
        }
    },

    /**
     * ajoute un élément tâche au DOM
     */
    addTaskToDom: function(taskElement)
    {
        // on sélectionne le ul
        const taskListElement = document.querySelector('.tasklist');
        // on ajoute la tâche au DOM, en début de liste
        taskListElement.prepend(taskElement);
    }
}