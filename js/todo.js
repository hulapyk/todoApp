import Dialog from "./dialog.js";
import Localstorage from "./localStorage.js";

const localStorage = new Localstorage();

export default class Todo{

    constructor(){
        this.enterButton = document.querySelector("#inputArea button");
        this.input = document.querySelector("#inputArea input");
        this.ul = document.querySelector("ul#toDoList");

        if(localStorage.items.length > 0){
            this.loadJSON();
        }

        this.enterButton.addEventListener( "click", (e) => this.addListItem(e) );
        this.input.addEventListener( "keypress", (e) => this.addListItem(e) );
    }

    addListItem(e){
        if( this.input.value.length > 0 && (e.key === "Enter" || e.key === undefined) ){
            this.createListItem();
        }
        // localStorage.updateItems(this.ul);
    }

    createListItem(){
        const li = document.createElement("li");
        li.innerHTML = `${this.input.value} <i class="far fa-trash-alt"></i>`;
        this.ul.appendChild(li);
        this.input.value = "";

        li.addEventListener( "click", (e) => this.crossOut(e) );
        li.querySelector("i").addEventListener( "click", (e) => this.deleteListItem(e) );

        localStorage.updateItems(this.ul);
    }

    crossOut(e){
        e.currentTarget.classList.toggle( "done");
        localStorage.updateItems(this.ul);
    }

    async deleteListItem(e){
        e.stopPropagation();

        const listItem = e.currentTarget.parentNode;
        const dialog = new Dialog({
            questionText:"<h2>Are you rizzle bizzle for shizzle?</h2>",
            trueButtonText:"Yay",
            falseButtonText:"Nay"
        });
        const deleteItem = await dialog.confirm();

        if(deleteItem){
            listItem.remove();
            localStorage.updateItems(this.ul);
        }

    }

    loadJSON(){
        let listItems = "";
        localStorage.items.forEach(item => {
            listItems += item;
        });
        this.ul.innerHTML = listItems;
        this.ul.querySelectorAll("li").forEach(li => {
            li.addEventListener( "click", (e) => this.crossOut(e) );
            li.querySelector("i").addEventListener( "click", (e) => this.deleteListItem(e) );
        });
    }

}