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
            <div class='stars'>
            </div>
        
        </div>

    </div>
    `;

class SellItem extends HTMLElement {
    constructor() {
        super()
        this.attrName;
        this.price = 0
        this.discount = 0
        this.image;
        this.valoration = 0
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
            this.shadowRoot.querySelector('.price').innerHTML = `$${this.price.toLocaleString("de-DE")}`
            this.shadowRoot.querySelector('.discount').innerHTML = `-${this.discount}%`
            this.shadowRoot.querySelector('.discount-price').innerHTML = `$${((1 - this.discount / 100) * this.price).toLocaleString("de-DE")}`
            this.shadowRoot.querySelector(".discount").style.backgroundColor = "magenta";
        } else {
            this.shadowRoot.querySelector(".label").innerHTML = ``;
            this.shadowRoot.querySelector('.discount').innerHTML = ``
            this.shadowRoot.querySelector(".discount").style.backgroundColor = "white";
            this.shadowRoot.querySelector('.price').innerHTML = ``
            this.shadowRoot.querySelector('.discount-price').innerHTML = `$${this.price.toLocaleString("de-DE")}`
        }
        this.shadowRoot.querySelector(".stars").innerHTML = ``;
        for (var i = 0; i < this.valoration; i++) {
            const star = document.createElement('img')
            star.src = 'star.svg'
            star.setAttribute('class', 'star')
            this.shadowRoot.querySelector('.stars').appendChild(star)
        }
    }
    
    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr == 'item_name') {
            this.attrName = newValue
            this.shadowRoot.querySelector('.item-name').innerHTML = this.attrName
        }

        else if (attr == 'price') {
            this.price = newValue.toLocaleString("de-DE");
            this.shadowRoot.querySelector('.price').innerHTML = this.price.toLocaleString("de-DE")
        }

        else if (attr == 'discount') {
            this.discount = newValue
            if (this.discount > 0) {
                this.shadowRoot.querySelector(".label").innerHTML = `Normal: `;
                this.shadowRoot.querySelector('.price').innerHTML = `$${this.price.toLocaleString("de-DE")}`
                this.shadowRoot.querySelector('.discount').innerHTML = `-${this.discount}%`
                this.shadowRoot.querySelector('.discount-price').innerHTML = `$${((1 - this.discount / 100) * this.price).toLocaleString("de-DE")}`
                this.shadowRoot.querySelector(".discount").style.backgroundColor = "magenta";
            } else {
                this.shadowRoot.querySelector(".label").innerHTML = ``;
                this.shadowRoot.querySelector('.discount').innerHTML = ``
                this.shadowRoot.querySelector(".discount").style.backgroundColor = "white";
                this.shadowRoot.querySelector('.price').innerHTML = ``
                this.shadowRoot.querySelector('.discount-price').innerHTML = `$${this.price.toLocaleString("de-DE")}`
            }
        }
        else if (attr == 'image') {
            this.image = newValue
            this.shadowRoot.querySelector('.image').src = this.image
        }
        else if (attr == 'valoration') {
            this.valoration = newValue
            this.shadowRoot.querySelector(".stars").innerHTML = ``;
            for (var i = 0; i < this.valoration; i++) {
              const star = document.createElement("img");
              star.src = "star.svg";
              star.setAttribute("class", "star");
              this.shadowRoot.querySelector(".stars").appendChild(star);
            }
        }
    }

    static get observedAttributes() {
        return ['item_name', 'price', 'discount', 'image', 'valoration']
    }


}

window.customElements.define('sell-item', SellItem)