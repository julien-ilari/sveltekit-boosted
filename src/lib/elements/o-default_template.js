export class WcTabPanel extends HTMLElement {
	static observedAttributes = [];
	constructor() {
		super();
		this.bind(this);
	}
	bind(element) {
		element.render = element.render.bind(element);
		element.cacheDom = element.cacheDom.bind(element);
		element.attachEvents = element.attachEvents.bind(element);
	}
	connectedCallback() {
		this.render();
		this.cacheDom();
		this.attachEvents();
	}
	render() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = ``;
	}
	cacheDom() {
		this.dom = {};
	}
	attachEvents() {}
	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue) {
			this[name] = newValue;
		}
	}
}

customElements.define('wc-tab-panel', WcTabPanel);
