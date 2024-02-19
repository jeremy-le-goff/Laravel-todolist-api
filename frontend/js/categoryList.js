// gère la liste des catégories
const categoryList = {

    // propriété qui stocke la liste des catégories
    data: null,

    init: function()
    {
        // on charge les catégories depuis l'API
        categoryList.loadFromApi();
    },

    loadFromApi: async function () {

        try {
            // appel à l'API
            const response = await fetch('http://localhost:8000/api/categories');
            // on extait les résulats de la réponse
            const categories = await response.json();

            console.log(categories);
            // on peut stocker les données ici pour usage ultérieur
            categoryList.data = categories;
            // création du select des catégories
            categoryList.addOptionsToSelect(categories);

        } catch (error) {
            // si le serveur ne répond pas ou que l'URL n'est pas correcte, on rentre dans le catch !
            console.error('Erreur rencontrée lors de la récupération des catégories : ' + error);
            alert('Erreur rencontrée lors de la récupération des catégories.');
        }
    },

    /**
     * add options to select element in the form
     */
    addOptionsToSelect: function(categories)
    {
        // on cible le select
        const selectElement = document.querySelector('.category-id');
        // on boucle sur les catégories
        for (const category of categories) {
            // on crée une option par catégorie
            const optionElement = document.createElement('option');
            // on lui donne une value
            optionElement.value = category.id;
            // on lui donne un libellé (texte)
            optionElement.textContent = category.name;
            // on l'ajoute au select
            selectElement.appendChild(optionElement);
        }
    }

}