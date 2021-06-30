const templateSellItem = document.createElement('template');
templateSellItem.innerHTML = `
    <div class="card">
        <img class="image" src="" alt="">
        <hr/>
        <p class="item-name">
            Nombre del producto
        </p>
        <div>
            <span class="discount-price">
                Precio Actual
            </span>
            <span class="discount">
                Descuento
            </span>
        </div>
        <div>
            <span class="label"> Normal:  </span>
            <span class="price">
            Precio
        </span>
        </div>

    </div>
    `;

class SellItem extends HTMLElement {
    constructor() {
        super()
        this.attrName;
        this.price
        this.discount = 0
        this.image;
        const shadowRoot = this.attachShadow({ mode: 'open' })

        shadowRoot.appendChild(templateSellItem.content.cloneNode(true));

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'style.css');
        shadowRoot.appendChild(linkElem);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.image').innerHTML = this.image
        this.shadowRoot.querySelector('.item-name').innerHTML = this.attrName
        if (this.discount > 0) {
            this.shadowRoot.querySelector(".label").innerHTML = `Normal: `;
            this.shadowRoot.querySelector('.price').innerHTML = `$${this.price}`
            this.shadowRoot.querySelector('.discount').innerHTML = `-${this.discount}%`
            this.shadowRoot.querySelector('.discount-price').innerHTML = `$${(1 - this.discount / 100) * this.price}`
            this.shadowRoot.querySelector(".discount").style.backgroundColor = "magenta";
        } else {
            this.shadowRoot.querySelector(".label").innerHTML = ``;
            this.shadowRoot.querySelector('.discount').innerHTML = ``
            this.shadowRoot.querySelector(".discount").style.backgroundColor = "white";
            this.shadowRoot.querySelector('.price').innerHTML = ``
            this.shadowRoot.querySelector('.discount-price').innerHTML = `$${this.price}`
        }
    }
    
    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr == 'item_name') {
            this.attrName = newValue
            this.shadowRoot.querySelector('.item-name').innerHTML = this.attrName
        }

        else if (attr == 'price') {
            this.price = newValue
            this.shadowRoot.querySelector('.price').innerHTML = this.price
        }

        else if (attr == 'discount') {
            this.discount = newValue
            if (this.discount > 0) {
                this.shadowRoot.querySelector(".label").innerHTML = `Normal: `;
                this.shadowRoot.querySelector('.price').innerHTML = `$${this.price}`
                this.shadowRoot.querySelector('.discount').innerHTML = `-${this.discount}%`
                this.shadowRoot.querySelector('.discount-price').innerHTML = `$${(1 - this.discount / 100) * this.price}`
                this.shadowRoot.querySelector(".discount").style.backgroundColor = "magenta";
            } else {
                this.shadowRoot.querySelector(".label").innerHTML = ``;
                this.shadowRoot.querySelector('.discount').innerHTML = ``
                this.shadowRoot.querySelector(".discount").style.backgroundColor = "white";
                this.shadowRoot.querySelector('.price').innerHTML = ``
                this.shadowRoot.querySelector('.discount-price').innerHTML = `$${this.price}`
            }
        }
        else if (attr == 'image') {
            this.image = newValue
            this.shadowRoot.querySelector('.image').src = this.image

        }
    }

    static get observedAttributes() {
        return ['item_name', 'price', 'discount', 'image']
    }


}

window.customElements.define('sell-item', SellItem)