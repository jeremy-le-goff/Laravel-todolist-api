// on découpe notre code JS en "composants" en "modules"
// app => la page globale
// taskList => la liste des tâches
// task => gestion d'une tâche
// taskForm => formulaire gestion tâche

// objet app
const app = {

    // initialisation de l'app
    init: function () {
        console.log('app started');
        // init de taskList
        taskList.init();
        // init taskForm
        taskForm.init();
        // init categories
        categoryList.init();
    },
}

// initialisation de l'app dès que le DOM est chargé
// document.addEventListener('DOMContentLoaded', app.init);
app.init();