// template
const _template = document.createElement("template");
_template.innerHTML = /*html*/`
<style>

  :host {
    --bs-bg-opacity: 1;
  }

  #title-bar {
    border-bottom: var(--bs-title-bar-border-width) solid var(--bs-title-bar-border-color);
  }

  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding : 1rem;
  }

  .bg-white {
    background-color: #fff!important;
    color: #000;
  }
</style>
<div id="title-bar" class="bg-white title-bar">
    <div class="flex-box">
        <slot>Titre type H1</slot>
        <img src="../assets/brand/ocean-logo.svg" style="width:146px"
          width="146"
            alt="Boosted - Back to Home"
            loading="lazy" />
    
    </div>
</div>`;

// Web Component
export class OrangeFooter extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(_template.content.cloneNode(true));

    if(this.hasAttribute("show-bar") === false 
      || this.getAttribute("show-bar") === "true" )
    {
      this.classList.add("title-bar");
    }
  
  }

}


customElements.define("o-title-bar", OrangeFooter);