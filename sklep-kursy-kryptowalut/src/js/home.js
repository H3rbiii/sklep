import createCart from "./helpers/createCart.js";

const courseList = document.querySelector('.coursesList')
const counter = document.querySelector(".counter")
const buttonCart = document.querySelectorAll(`.cart-button`)
const cart = createCart(counter);
cart.setItems(JSON.parse(localStorage.getItem("items")) || [])

const toggleClass = (className, tekst = element.innerText, mode) => { 
    return (element) => {
        element.classList[mode](className);
        element.innerText = tekst
    }  
}

const addInCartClass = toggleClass("in-cart", "Dodano", "add")

const removeInCartClass = toggleClass("in-cart", "Dodaj do koszyka", "remove")

const addToCartHandler = (e) => {
    if(e.target.tagName !== "BUTTON") return
        const title = e.target.dataset.title
        const price = +e.target.dataset.price
        const id = +e.target.dataset.id

        if(cart.hasItem(id)){ 
            cart.remove(id)
            removeInCartClass(e.target)
        }else{
            cart.add(id, title, price)
            addInCartClass(e.target)
        }
        
}

courseList.addEventListener('click', addToCartHandler);

//ustaw klase buttonow domyslnie

buttonCart.forEach(button => {
    if(cart.hasItem(+ button.dataset.id)) {
        addInCartClass(button)
    }
})