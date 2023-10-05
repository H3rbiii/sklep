const validateName = (value) => {
    if(!value) return 'Imię i Nazwisko jest wymagane'
    if(value.length<3) return 'Imię i nazwisko jest za krótkie'
}

const validateTel = (value) => {
    if(!value) return 'Telefon jest wymagany'
    if(value.length<9) return 'Telefon jest za niepoprawny'
}

const validateMail = (value) => {
    if(!value) return ("Email jest wymagany");
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!regex.test(value)) return "Wprowadz poprawny adres e-mail"
}

const validateMailConfirm = (value) => {
    if(value!==email) return "Wprowadź poprawny powtórzony email"
}

const validate = (key,value, allValues) => {
    switch (key){
        case "name" : return validateName(value); 
        case "tel" : return validateTel(value); 
        case "email" : return validateMail(value);
        case "e mailconfirm" : return validateMailConfirm(value, allValues.email);
    }
}

const validateValues = (values) => {
    const errors = [];
    Object.entries(values).forEach(([key,value]) => {
       
            const error = validate(key, value, values)
            if(error) errors.push(error)

    })
    document.querySelector("#errors").innerHTML=errors.map(e=>`<li>${e}</li>`).join("")
    return errors.length>0
}


const onBuy = (e) => {
    e.preventDefault();

    const elements = document.querySelector('form').elements
    const values = {
        name: elements['name'].value,
        email: elements['email'].value,
        emailconfirm: elements['emailconfirm'].value,
        tel: elements['tel'].value,
        payment: elements['payment'].value,
    };  
    const haserrors = validateValues(values)


    if(!haserrors){
        document.querySelector("#loading").style.display = "flex";

        localStorage.removeItem("items")

        setTimeout(() => {
            window.location.href = '/podziękowanie.html'
        },3000)
    }
} 

document.querySelector("form").addEventListener("submit", onBuy)

const dateContainer = document.querySelector("#date")

const showOrderDate = (element) => {
    const d = new Date();
    element.innerHTML = d.toLocaleString();
}
showOrderDate(dateContainer)

const itemsContainer = document.querySelector("#items-list")
const items = JSON.parse(localStorage.getItem("items"))

const showProducts = (products, elements) => {
    const html = products.map(products => `<li>${products.quantity} x "${products.title}"</li>`).join("");
    elements.innerHTML = html
}
showProducts(items, itemsContainer)

const priceContainer = document.querySelector("#total-price")
priceContainer.innerText = localStorage.getItem("totalPrice") || 0