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

		// Activate the link corresponding to the current URL path
		this.selectActiveLink();
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
			let link = document.createElement('a');
			link.href = item.to;
			link.classList.add('nav-link');
			link.innerText = item.value;

			// event click => clear
			link.addEventListener('click', (e) => {
				this._navBar?.querySelectorAll('a').forEach((o) => o.classList.remove('active'));

				// add class active
				e.target.classList.add('active');

				this.dispatchEvent(
					new CustomEvent('change', {
						bubbles: true,
						composed: true,

						// @ts-ignore
						detail: {
							index: 2,
							value: item.value,
							to: item.to
						}
					})
				);
			});

			this._navBar?.appendChild(link);
		});
		this.selectActiveLink();
	}

	selectActiveLink() {
		// Get the current URL path
		const path = window.location.pathname;
		// Find the link with an "href" attribute matching the current path
		const activeLink = this._navBar.querySelector(`a[href='${path}']`);

		// If a link was found, activate it
		if (activeLink) {
			activeLink.classList.add('active');
		}
	}

	setTo(hrefValue) {
		this._navBar?.querySelectorAll('a').forEach((o) => o.classList.remove('active'));
		const activeLink = this._navBar?.querySelector(`a[href='${hrefValue}']`);
		if (activeLink) {
			activeLink.classList.add('active');
			const item = {
				value: activeLink.textContent,
				to: activeLink.getAttribute('href')
			};
			this.dispatchEvent(
				new CustomEvent('change', {
					bubbles: true,
					composed: true,
					detail: { index, ...item }
				})
			);
		}
	}

	setActiveLink(index) {
		this._navBar?.querySelectorAll('a').forEach((o) => o.classList.remove('active'));
		const activeLink = this._navBar?.querySelectorAll('a')[index];
		if (activeLink) {
			activeLink.classList.add('active');
			const item = {
				value: activeLink.textContent,
				to: activeLink.getAttribute('href')
			};
			this.dispatchEvent(
				new CustomEvent('change', {
					bubbles: true,
					composed: true,
					detail: { index, ...item }
				})
			);
		}
	}
}

customElements.define('o-navbar', OrangeNavBar);
