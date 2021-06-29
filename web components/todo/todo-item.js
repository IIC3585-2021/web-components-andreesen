const templateTodoItem = document.createElement('template');
templateTodoItem.innerHTML = `
    <div id="list">
        <label class='label'></label>
        <button class="button">-</button>
    </div>
`;

class TodoItem extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.appendChild(templateTodoItem.content.cloneNode(true));
        this._text = '';

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'style.css');
        shadowRoot.appendChild(linkElem);
    }

    connectedCallback() {
        this.$item = this.shadowRoot.querySelector('.item');
        this.$removeButton = this.shadowRoot.querySelector('.button');
        this.$text = this.shadowRoot.querySelector('label');
        this.$removeButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('onRemove', { detail: this.index }));
        });

        this._render();

    }

    disconnectedCallback() { }

    static get observedAttributes() {
        return ['text'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this._text = newValue;
    }

    set index(value) {
        this._index = value;
    }

    get index() {
        return this._index;
    }



    _render() {
        //if (!this.$item) return;
        this.$text.textContent = this._text;
    }

}

window.customElements.define('todo-item', TodoItem);