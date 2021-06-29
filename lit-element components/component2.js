import { LitElement, html, css } from './node_modules/lit-element/lit-element.js';
class ToDoList extends LitElement {
    static get properties(){
        return {
            toDo: { type: Array },
            title: { type: String },
            item1: { type: String },
            item2: { type: String },
            item3: { type: String }
        }
    }
    static get styles(){
        return css`
        h2{
            color: black
        }
        #list{
            display: grid !important;
            grid-template-columns: max-content min-content; !important;
            grid-gap: 10px 10px;
        }
        .label{
            margin-left: 50px
        }
        .form{
            margin-top: 5px;
            
        }
        #form-button{
            margin-top: 5px;
        }
        .button{
            font-size: medium;
            border: solid;
            border-width: thin;
            color: black;
            text-align: center;
            border-radius: 50%;
            background-color: white;
            
        }
        `
    }
    constructor(){
        super();
        this.item1 = ""
        this.item2 = ""
        this.item3 = ""
        this.toDo = [];
        this.title = "ToDo List"
    }
    render(){
        this.item1 !== "" && !this.toDo.includes(this.item1)? this.toDo.push(this.item1):{};
        this.item2 !== "" && !this.toDo.includes(this.item2)? this.toDo.push(this.item2):{};
        this.item3 !== "" && !this.toDo.includes(this.item3)? this.toDo.push(this.item3):{};
        return html`
            <h2>${this.title}</h2>
            <div id="list">
                ${this.toDo.map((item, index) => {
                    return html`
                        <label class="label">${item} </label>
                        <button id=${index} @click=${this.removeItem} class="button">-</button>
                `})}
                <div class="form">
                    <label>Add new list item</label>
                    <input id="input" type="text"></input>
                </div>
                <button class="button" id="form-button" @click=${this.addItem}>+</button>
            </div>
            
        `;
    }
    removeItem(e){
        const id = e.target.id;
        const element = this.toDo[id]
        element === this.item1 
            ?this.item1 = ""
            : element === this.item2 
                ? this.item2 = "" 
                : element == this.item3 
                    ? this.item3 = "" 
                    : {};
        const originalList = this.toDo.slice();
        originalList.splice(id, 1)
        this.toDo = originalList;
    }
    addItem(e){
        console.log()
        e.preventDefault()
        const element = this.shadowRoot.querySelector('#input')
        const input = element.value
        if (input !== ""){
            console.log("yeeeees")
            this.toDo = [...this.toDo, input]
            element.value = ""
        }
    }
}
customElements.define('to-do-list', ToDoList)
