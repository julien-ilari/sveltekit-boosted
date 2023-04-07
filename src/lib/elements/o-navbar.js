const template = document.createElement('template');
template.innerHTML = /*html*/ `
<style>
  @import "https://cdn.jsdelivr.net/npm/boosted@5.2.3/dist/css/orange-helvetica.min.css";
  @import "https://cdn.jsdelivr.net/npm/boosted@5.2.3/dist/css/boosted.min.css";
</style>
<div class="navbar-expand-lg">
  <nav id="navbar" class="navbar-nav" style="flex-direction: row;">
  </nav>
</div>`;

export class OrangeNavBar extends HTMLElement {
	/**
	 * @type {any}
	 */
	static observedAttributes = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		if (this.shadowRoot !== null) {
			this.shadowRoot.append(template.content.cloneNode(true));
			// Create a reference to the list element in the Shadow DOM
			this._navBar = this.shadowRoot.querySelector('#navbar');
		}
	}

	/**
	 * @param {any[]} value
	 */
	// @ts-ignore
	set items(value) {
		// @ts-ignore
		this._navBar.innerHTML = '';

		// Loop through the params array and add each item to the list
		value.forEach((item, index) => {
			let li = document.createElement('span');
			li.classList.add('nav-item');

			let activeClass =this.hasAttribute('index') 
      // @ts-ignore
      && (index == this.getAttribute('index')  ? 'active' : '');

			li.innerHTML = `<a href="${item.to}" class="nav-link ${activeClass}">${item.value}</a>`;

			// event click => clear
			li.addEventListener('click', () => {
				this._navBar?.querySelectorAll('a').forEach((o) => o.classList.remove('active'));

				// add class active
				const link = li.querySelector('a');
				link?.classList.add('active');

				this.dispatchEvent(
					new CustomEvent('change', {
						bubbles: true,
						composed: true,

						// @ts-ignore
						detail: {
							index: index,
							value: item.value,
							to: item.to
						}
					})
				);
			});

			this._navBar?.appendChild(li);
		});
	}
}

customElements.define('o-navbar', OrangeNavBar);
