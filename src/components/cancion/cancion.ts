import styles from './cancion.css';

export enum CancionAttribute {
	'image' = 'image',
	'name' = 'name',
	'album' = 'album',
	'stock' = 'stock',
	'price' = 'price',
}

export default class Cancion extends HTMLElement {
	image?: string;
	name?: string;
	autor?: string;
	album?: string;
	stock?: string;
	price?: string;

	static get observedAttributes() {
		const attrs: Record<CancionAttribute, null> = {
			image: null,
			name: null,
			album: null,
			stock: null,
			price: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propname: CancionAttribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propname) {
			default:
				this[propname] = newValue;
				break;
		}
	}
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
        <section>
        <div>
        <img src="${this.image}">
        <b>${this.name}</b>
        <p>Album: ${this.album}</p>
        <p>Date added: ${this.stock}</p>
        <p>Duration: ${this.price}</p>
    </div>
    </section>
`;
		}
		const cssProfile = this.ownerDocument.createElement('style');
		cssProfile.innerHTML = styles;
		this.shadowRoot?.appendChild(cssProfile);
	}
}

customElements.define('comp-cancion', Cancion);