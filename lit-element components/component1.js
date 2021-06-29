import { LitElement, html, css } from './node_modules/lit-element/lit-element.js';
class SellItem extends LitElement {
    static get properties(){
        return {
            price: { type: Number },
            attrName: { type: String },
            discount: { type: Number },
            image: { type: String },            
        }
    }
    static get styles(){
        return css`
        .card {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            max-width: 300px;
            margin: auto;
            text-align: left;
            font-family: arial;
            border-style: solid;
            border-color: grey;
            padding-bottom: 10px;
            border-width: thin;
          }
          
          .image {
            height: 100%;
            width: 100%;
          }

          .item-name{
              margin-left: 10px;
              color: grey;
              margin-bottom: 5px;
          }
          
          .price {
            color: grey;
            font-size: 15px;
            text-decoration: line-through;
          }

          .discount-price{
              margin-left: 10px;
              font-size: 25px;
              font-style: bold;
              color: blue;
          }

          .label{
              margin-left: 10px;
              font-size: 15px;
          }

          .discount{
              float:right;
              margin-right: 10px;
              padding: 3px;
              background-color: magenta;
              border-radius: 15%;
              color: white;
          }
        `
    }
    constructor(){
        super();
        this.attrName;
        this.price
        this.discount = 0
        this.image;
    }
    render(){
        return html`
        <div class="card">
        <img class="image" src="${this.image}" alt="">
        <hr/>
        <p class="item-name">
            ${this.attrName}
        </p>
        <div>
        <span class="discount-price">
            $${((1 - this.discount / 100) * this.price).toLocaleString('de-DE')}
        </span>
        <span class="discount">
            -${this.discount}%
        </span>
        </div>
        <div>
        <span class="label"> Normal:  </span>
        <span class="price">
            $${this.price.toLocaleString('de-DE')}
        </span>
        </div>
        
        </div>
        `;
    }
}
customElements.define('sell-item', SellItem)
