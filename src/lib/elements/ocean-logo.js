// template
const _template = document.createElement('template');
_template.innerHTML = /*html*/ `
<img src="../assets/brand/ocean-logo.svg" 
          width="146" alt="Boosted - Back to Home"
          loading="lazy" />`;

// Web Component
export class OrangeFooter extends HTMLElement {
	constructor() {
		super();
	}
	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(_template.content.cloneNode(true));
	}
}
customElements.define('ocean-logo', OrangeFooter);
