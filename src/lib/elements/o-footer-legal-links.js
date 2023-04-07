// @ts-nocheck
const template = document.createElement("template");
template.innerHTML = /*html*/`
<style>

  *, ::after, ::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    vertical-align: initial;
   
  }

  .footer > * {
    --bs-footer-gap: 0;
    --bs-footer-title-margin-bottom: 0;
    --bs-footer-title-font-size: 1rem;
    --bs-footer-title-font-weight: 700;
    --bs-footer-title-line-height: 1.125;
    --bs-footer-title-letter-spacing: -0.00625rem;
    --bs-navbar-nav-font-size: 0.875rem;
    --bs-navbar-nav-line-height: 1.1428571429;
    --bs-navbar-nav-letter-spacing: -0.00625rem;
    padding-top: var(--bs-footer-padding-top);
    padding-bottom: var(--bs-footer-padding-bottom);
  }

  a {
    color: var(--bs-nav-link-color);
    text-decoration: none;
    background: 0 0;
  }

  a:hover {
    color: none;
    text-decoration: underline;
  }

  .visually-hidden {
    display: none;
  }

  .bg-dark {
    --bs-bg-opacity: 1;
    background-color: rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))!important;
    color: #fff;
  }

  @media (max-width: 767px) {
    nav {
      display: flex;
      gap: 0.5em;
      justify-content: center;
      align-content: center;
      flex-direction: column;
    }

    .point 
    {
      display : none;
    }
  }

  @media (min-width: 768px) {
    nav {
      display: flex;
      gap: 0.5em;
      justify-content: center;
      align-content: center;
      flex-direction: row;
    }
  }
</style>
<footer class="footer bg-dark navbar-dark">
  <slot></slot>
  <h2 class="visually-hidden">Sitemap and information</h2>
  <nav id="navbar" class="container-xxl footer-terms">
      
  </nav>
</footer>`;

export class OrangeLegalLinks extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._shadowRoot = this.shadowRoot.append(template.content.cloneNode(true));


    // Create a reference to the list element in the Shadow DOM
    this._navBar = this.shadowRoot.querySelector('#navbar');
    this.copyright = this.getAttribute("copyright");

    
  }

  connectedCallback() {
    this.classList.add("footer-fixed");
  }

  set items(value) {
    // Loop through the params array and add each item to the list
    value.forEach(item => {
      let li = document.createElement('span');
      li.innerHTML = item.to
        ? `<a href="${item.to}" class="nav-link">${item.value}</a>`
        : `<span class="fw-bold">${item.value}</span>`;

      this._navBar.appendChild(li);

      let cop = document.createElement('span');
      cop.innerHTML += `•`
      cop.classList.add("point");
      this._navBar.appendChild(cop);

    });

    let copyright = document.createElement('span');
    copyright.innerHTML += `© ${this.copyright}`
    this._navBar.appendChild(copyright);
  }

}

customElements.define("o-footer-legal-links", OrangeLegalLinks);