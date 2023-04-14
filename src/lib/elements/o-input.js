// @ts-ignore
import style from '../../scss/styles.scss?inline';

class OrangeInputTextField extends HTMLElement {
	connectedCallback() {
		// Shadow
		const _shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });

		// initialize the properties
		this.outline = false;
		this.disabled = false;

		const rootDiv = document.createElement('div');
		if (this.hasAttribute('class')) {
			this.setAttribute('style', this.style ? this.style + ';display:block' : 'display:block');
		}
		this.classList.add('mb-2');

		const label = document.createElement('label');
		label.setAttribute('for', 'form-input');
		label.classList.add('form-label');
		label.innerText = this.getAttribute('label') ?? '##label';

		const button = document.createElement('button');
		if (this.hasAttribute('helper')) {
			button.setAttribute('type', 'button');
			button.setAttribute('class', 'form-helper');
			button.setAttribute('data-bs-toggle', 'tooltip');
			button.setAttribute('data-bs-placement', 'top');
			button.setAttribute('data-bs-title', 'Help for text area');

			const span = document.createElement('span');
			span.classList.add('visually-hidden');
			span.innerText = this.getAttribute('helper');
			button.appendChild(span);
		}

		const input = document.createElement('input');
		input.setAttribute('id', 'form-input');
		input.setAttribute('aria-labelledby', 'websiteLabel websiteFeedback');
		input.setAttribute('type', 'text');
		input.classList.add('form-control');
		input.classList.add('form-control-sm');

		// set default value, if any
		if (this.hasAttribute('value')) {
			let val = this.getAttribute('value');
			if (val) input.value = val;
		}
		// check for required attr
		if (this.hasAttribute('required')) {
			// set corresponding input property
			input.required = true;
			// by default, the field is invalid until filled in
			this.setAttribute('invalid', 'true');
			label.classList.add('is-required');
		}

		input.addEventListener('input', (e) => {
			// @ts-ignore
			// sync value with attr
			this.setAttribute('value', input.value);

			// @ts-ignore
			//const clone = new e.constructor(e.type, e); // clone l'événement
			//this.dispatchEvent(clone); // puis le transférer
			this.dispatchEvent(
				new CustomEvent('change', {
					bubbles: true,
					composed: true,
					// @ts-ignore
					detail: { value: e.composedPath()[0].value }
				})
			);
		});

		// Style
		const styleElem = document.createElement('style');
		styleElem.appendChild(document.createTextNode(style));
		_shadowRoot.appendChild(styleElem);

		// Root DIV
		rootDiv.appendChild(label);
		if (this.hasAttribute('helper')) {
			rootDiv.appendChild(button);
		}

		rootDiv.appendChild(input);
		_shadowRoot.appendChild(rootDiv);
	}

	constructor() {
		super();
	}
}

customElements.define('o-input', OrangeInputTextField);
