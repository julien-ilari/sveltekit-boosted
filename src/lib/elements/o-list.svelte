<template id="list-template">
  <style>
    /* styles pour les éléments de la liste */
    ul {
      list-style: none;
    }
  </style>
  <ul>
    <li id="list-item"></li>
  </ul>
</template>


<script>
  class ListComponent extends HTMLElement {
    constructor() {
      super();
      // Créer une instance du Shadow DOM
      this.attachShadow({ mode: 'open' });
      // Importer le template
      const template = document.querySelector('#list-template');
      // @ts-ignore
      const templateContent = template.content;
      // Ajouter le template au Shadow DOM
     // @ts-ignore
      this.shadowRoot.appendChild(templateContent.cloneNode(true));
    }

    // Définir une propriété pour la liste
    set list(value) {
      // Stocker la valeur de la liste
      // @ts-ignore
      this._list = value;
      // Mettre à jour l'affichage de la liste
      this.render();
    }

    // Obtenir la valeur de la liste
    // @ts-ignore
    get list() {
      return this._list;
    }

    // Mettre à jour l'affichage de la liste
    render() {
      // Récupérer l'élément de la liste dans le Shadow DOM
      // @ts-ignore
      const listItem = this.shadowRoot.querySelector('#list-item');
      // Générer les éléments de la liste à partir de la valeur de la liste
      // @ts-ignore
      const items = this._list.map(item => {
        const li = document.createElement('li');
        li.textContent = item;
        return li;
      });
      // Remplacer l'élément de la liste par les nouveaux éléments
      // @ts-ignore
      listItem.replaceWith(...items);
    }
  }
  // Enregistrer le composant
  customElements.define('o-list', ListComponent);
</script>