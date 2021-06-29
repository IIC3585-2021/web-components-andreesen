const templateTodo = document.createElement('template');
templateTodo.innerHTML = `
    
        <h2 class='_title'></h2>
        <div class='container'>
         
        </div>

        <div class="form">
            <label class='prompt'></label>
            <input id="input" class='input' type="text"></input>
            <button class="button" id="form-button">+</button>
        </div>    
    
`;


class Todo extends HTMLElement {
    constructor() {
        super();
        this._list = []
        this.item1;
        this.item2;
        this.item3;
        this._title;
        this.prompt;
        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.appendChild(templateTodo.content.cloneNode(true));

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'style.css');
        shadowRoot.appendChild(linkElem);
    }

    connectedCallback() {
        this.$input = this.shadowRoot.querySelector('.input');
        this.$listContainer = this.shadowRoot.querySelector('.container');
        this.$form = this.shadowRoot.querySelector('.form')
        this.$addButton = this.shadowRoot.querySelector('.button')
        this.$addButton.addEventListener('click', () => this.addItem(this.$input))
        //this.$input.addEventListener('change', () => this.addItem(this.$input));
        this._render()
    }

    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr == 'item1') {
            this.item1 = newValue
            this._list.push(this.item1)
        }
        else if (attr == 'item2') {
            this.item2 = newValue
            this._list.push(this.item2)
        }
        else if (attr == 'item3') {
            this.item3 = newValue
            this._list.push(this.item3)
        }

        else if (attr == '_title') {
            this._title = newValue
            this.shadowRoot.querySelector('._title').innerHTML = this._title

        }
        else if (attr == 'prompt') {
            this.prompt = newValue
            this.shadowRoot.querySelector('.prompt').innerHTML = this.prompt

        }


    }

    static get observedAttributes() {
        return ['item1', 'item2', 'item3', 'prompt', '_title']
    }

    addItem(e) {
        console.log(e.value)
        this._list.push(e.value)
        this._render()
    }

    removeItem(e) {
        this._list.splice(e.detail, 1);
        this._render();
    }

    disconnectedCallback() { }

    _render() {
        if (!this.$listContainer) return;
        this.$listContainer.innerHTML = '';
        this.$input.value = ''
        this._list.forEach((item, index) => {
            let $item = document.createElement('todo-item');
            $item.setAttribute('text', item);
            $item.index = index;
            $item.addEventListener('onRemove', this.removeItem.bind(this));
            this.$listContainer.appendChild($item)
        });



    }
}

window.customElements.define('todo-list', Todo);