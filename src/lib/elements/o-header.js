// @ts-nocheck
// template navbar-brand 
const _template = document.createElement('template');
_template.innerHTML = /*html*/ `
<style>
  
  a
  {
    color: var(--bs-link-color);
    text-decoration: none;
    display:flex;
    gap: 0.5em;
    color: var(--bs-link-color);
    align-items: flex-end;
    align-items: center;
    
  }
  a:hover 
  {
    color: var(--bs-navbar-brand-hover-color);
  }
  img 
  {
    width: auto;
    height: var(--bs-navbar-brand-logo-size);
    transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
  }
</style>
<div class="navbar-brand me-auto me-lg-4">
<!-- svelte-ignore a11y-invalid-attribute -->

  <a class="stretched-link" href="#">
    <img src="../assets/brand/orange-logo.svg"
          width="50"
          height="50"
          alt="Boosted - Back to Home"
          loading="lazy" />
  
    <h1 class="title" style="display: contents;">Ocean</h1>
    <slot />
  </a>
</div>`;

// Web Component
export class OceanHeader extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(_template.content.cloneNode(true));
	}
}

customElements.define('o-header', OceanHeader);
