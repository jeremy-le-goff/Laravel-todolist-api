// gestion du formulaire
const taskForm = {

    /**
     * initialisation du composant/module formulaire
     */
    init: function()
    {
        // écoute le bouton d'affichage du form
        document.querySelector('.create-task-container').addEventListener('click', taskForm.handleDisplayModal);
        // écoute la soumission du formulaire
        // /!\ on a ajouté une class .task-form sur la balise form dans le code HTML !
        document.querySelector('.task-form').addEventListener('submit', taskForm.handleFormSubmit);
    },

    /**
     * prise en charge du bouton "nouvelle tâche"
     */
    handleDisplayModal: function(event)
    {
        // On va d'abord masquer les éléments tel qu'indiqué dans le README.md du frontend

        // Mode formulaire (ajout/édition d'une tâche), quand on clique sur le bouton nouvelle tâche.
        // <header> est grisé, grâce à l'ajout d'une classe muted :<header class="muted">
        document.querySelector('header').classList.add('muted');
        // le bouton nouvelle tâche est caché, grâce à l'ajout d'un attribut hidden : <div class="create-task-container" hidden>
        document.querySelector('.create-task-container').setAttribute('hidden', true);
        // la liste de tâche est cachée, de la même manière : <ul class="tasklist" hidden>
        document.querySelector('.tasklist').setAttribute('hidden', true);

        // le formulaire d'ajout/édition de tâche est affiché, grâce à l'ajout d'une classe show : <div class="modal-dialog show"></div>
        document.querySelector('.modal-dialog').classList.add('show');
    },

    /**
     * prise en charge soumission du form
     */
    handleFormSubmit: async function(event)
    {
        // console.log(event);
        // /!\ on stoppe la soumission du formulaire (pour ne pas recharger la page)
        event.preventDefault();

        // on pourrait cibler directement l'élément input depuis l'origine du DOM
        // const title = document.getElementById('task-title').value;
        // /!\ mais pour des raisons de bonnes pratiques et de perfs
        // on peut également partir de l'élément à l'origine de l'écouteur (ici, le formulaire)

        // on récupère le form depuis l'event
        const formElement = event.currentTarget;
        // on récupère la valeur saisie dans le champ input
        // depuis le form (perso j'ai ajouté une class .task-title dessus)
        const inputElement = formElement.querySelector('.task-title');
        const taskTitle = inputElement.value;
        // console.log(title);
        
        // catégorie depuis le champ de formulaire associé
        // ici .value sur un select retourne la valeur de l'option sélectionnée
        const categoryId = formElement.querySelector('.category-id').value;

        // on émet la requête API vers le endpoint CREATE
        // avec la donnée à transmettre en JSON
        
        try {

            // l'objet à convertir en JSON
            const taskData = {
                title: taskTitle,
                category_id: categoryId,
            };

            // possibilité d'utiliser FormData, mais attention de base cela n'envoie pas de JSON
            // @see https://bobbyhadz.com/blog/post-form-data-using-javascript-fetch-api

            // options pour la méthode fetch() / second argument de fetch(URL, options)
            const options = {
                // on souhaite envoyer en méthode HTTP POST
                method: 'POST',
                // la donnée à transmettre en JSON (on convertit un objet JS en JSON)
                // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
                body: JSON.stringify(taskData),
                // de type JSON,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const response = await fetch('http://localhost:8000/api/tasks', options);
            const taskCreated = await response.json();
            // on masque la modale et on réaffiche le bouton et la liste
            taskForm.hideModal();
            // on crée les 4 éléments qui constituent une tâche
            // console.log(taskCreated);
            const taskElement = task.createElement(taskCreated);
            // on l'ajoute au DOM
            taskList.addTaskToDom(taskElement);
        } catch (error) {
            console.error('Erreur : ' + error);
            alert('Erreur d\'accès au serveur');
        }
    },

    /**
     * masque modale
     */
    hideModal: function()
    {
        // on remet les classes CSS pour revenir à l'affichage par défaut
        document.querySelector('header').classList.remove('muted');
        document.querySelector('.create-task-container').removeAttribute('hidden');
        document.querySelector('.tasklist').removeAttribute('hidden');
        document.querySelector('.modal-dialog').classList.remove('show');
    }

}