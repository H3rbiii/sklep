export default function createCart(counter) {

    let items = []; 

    const refreshProducts = () => counter.innerText = items.length
    const upDateStorage = () => {
        localStorage.setItem('items', JSON.stringify(items));   
    }

    const setItems = newItems => {
        items = newItems; 
        upDateStorage()
        refreshProducts()
    }

    const add = (id, title, price, quantity = 1) => {
        items.push({id, title,price,quantity,})
        refreshProducts()
        upDateStorage()  
    }   

    const remove = (id) => {
        const index = items.findIndex(item => item.id === id);
        if(index >= 0) items.splice(index, 1)
        refreshProducts();
        upDateStorage()
    }

    const hasItem = (id) => {
        return items.find(item => item.id === id);
    }

    return{
        add,
        remove,
        setItems,
        hasItem,
    }
}   