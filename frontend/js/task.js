const task = {

    /**
     * Crée un élément du DOM qui représente une tâche
     * 
     * @param {object} taskData l'objet qui contient les données de la tâche
     * @returns {HTMLElement} une tâche du DOM
     */
    createElement: function(taskData)
    {
        // on créé un nouvel élément li
        const taskElement = document.createElement('li');
        // création du paragraphe titre
        const taskTitleElement = document.createElement('p');
        // création du paragraphe catégorie
        const categoryElement = document.createElement('p');
        // création du btn delete
        // on pourrait tout à fait attacher l'écouteur de suppression ici
        // mais on va l'attacher plus tard avec les autres écouteurs
        const deleteElement = document.createElement('div');
        deleteElement.classList.add('delete');

        // création du btn edit
        const editElement = document.createElement('div');
        editElement.classList.add('edit');

        // Création du data-id attaché au li
        // => ce "dataset" contient l'id de la tâche qui vient du back via l'API
        // il va nous servir pour les requêtes futures qui ont besoin de l'id en back (DELETE, PUT/PATCH)
        taskElement.dataset.id = taskData.id;

        // on met le titre de la tâche dans le textContent du p
        taskTitleElement.textContent = taskData.title;
        // on met le nom de la catégorie dans le textContent du p
        // si existante
        if (taskData.category !== null && taskData.category !== undefined) {
            categoryElement.textContent = taskData.category.name;
        }

        // assemble les éléments entre eux (hiérarchie)
        taskElement.appendChild(taskTitleElement);
        taskElement.appendChild(categoryElement);
        taskElement.appendChild(deleteElement);
        taskElement.appendChild(editElement);

        // ajout des écouteurs
        const taskElementWithEvents = task.addListeners(taskElement);
        const modifyTaskElement = task.modifyListeners(taskElement);

        return taskElementWithEvents;
    },

    /**
     * Ajoute des écouteurs d'événements sur une tâche donnée
     * 
     * @param {HTMLElement} taskElement
     * @returns {HTMLElement} la tâche du DOM avec ses écouteurs
     */
    addListeners: function(taskElement)
    {
        // écouteur supression
        // on "descend" dans l'élément taskElement pour cibler le bouton delete
        taskElement.querySelector('.delete').addEventListener('click', task.handleRemove);
        // écouteur modification

        // on retourne la tâche modifiée
        return taskElement;
    },
    modifyListeners : function (taskElement)
    {
      taskElement.querySelector('.edit').addEventListener('click',task.handleTaskEdit);
    },
 
    //modifie une tache

    handleTaskEdit : function (event)
    {
    document.querySelector('.modal-dialog').classList.add('show');
       
       
       
    },

     /**
     * Supprime une tâche
     */
    handleRemove: function(event)
    {
        // event.currentTarget contient l'élément sur lequel on a attaché l'écouteur
        // dans notre cas, chaque bouton ".delete"
        console.log(event.currentTarget);
        // le bouton sélectionné
        const buttonClicked = event.currentTarget;
        // l'élément tâche parent à supprimer
        // @see https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode
        // @see https://developer.mozilla.org/fr/docs/Web/API/Node/parentElement
        // pour remonter jusqu'à un parent via un sélecteur
        // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
        // [i] closest est l'équivalent de querySelector, mais en remontant vers les parents
        const parentTask = buttonClicked.closest('li');
        // @todo : ajouter la class '.list' à la création et cibler .closest('.task')

        // suppression d'une tâche avec un id "en dur"
        // @todo dynamiser l'id (via le dataset de la tâche)
        // @see https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/dataset
        const taskId = parentTask.dataset.id;
        // fetch
        // 1. URL à requêter (endpoint de l'API)
        // 2. les options de fetch() un objet JS
        fetch('http://127.0.0.1:8000/api/tasks/' + taskId, { method: 'DELETE' })
            .then(function (response) {
                return response.json();
            })
            .then(function (message) {
                console.log(message);
                // @todo supprimer l'élément à partir d'ici
                // on supprime du DOM
                parentTask.remove();
            })
            .catch(function () {
                alert('requête échouée.');
            });
    }

}