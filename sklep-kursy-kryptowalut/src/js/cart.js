//IIFE
(function () {
    const cart = {
      price: 0,
      getPrice(callback) {
        this.price = callback(this.items, this.getDiscountIfEnabled())
        if(this.price < 0) this.price = 0
        return this.price;
      },
      getDiscount() {
        return this.discount.amount;
      },
      getDiscountIfEnabled() {
        if (this.discount.enabled) {
          return this.getDiscount();
        } else {
          return 0;
        }
      },
      removeCourse(id){
        const index = this.items.findIndex(item => item.id === id);
        if(index >= 0) this.items.splice(index, 1)
        localStorage.setItem('items', JSON.stringify(this.items))
      },
      discount: {
        amount: 10,
        enabled: false,
      },
      items: [],
    }
    //wczytam dane 
    cart.items = JSON.parse(localStorage.getItem('items') )
    // definicja elementow
    const discountElement = document.querySelector('#discount');
    const discountCheckbox = document.querySelector('#add-discount');
    const itemsContainer = document.querySelector('#items');
    
    // cart.items.sort((a,b) => a.price - b.price)

    // for (const item of cart.items) {
    //   addItem(item);
    // }
    
    // // dodaj produkty do tabeli
    // function addItem(item) {
    //   itemsContainer.innerHTML += `<tr data-id="${item.id}">
    //           <td><button class="delete">x</button></td>
    //           <td>${item.title}</td>
    //           <td><input class="quantity" type="number" value="1"></td>
    //           <td>${item.price}</td>
    //         </tr>`
    // }

    itemsContainer.innerHTML = cart.items.map(item => `<tr data-id="${item.id}">
    <td><button class="delete">x</button></td>
    <td>${item.title}</td>
    <td><input class="quantity" type="number" value="1"></td>
    <td>${item.price}</td>
  </tr>`).join("")
    
    // usuwanie wierszy
    const removeRow = (e) => {
      if (e.target.tagName === 'BUTTON') {
        const row = e.target.closest('tr');
        cart.removeCourse(Number(row.dataset.id))
        row.remove();
        calculatePrice()
      }
    }
    const removeRowFromQuantity = (e) => {
      if (Number(e.target.value) === 0) {
        const row = e.target.closest('tr');
        cart.removeCourse(Number(row.dataset.id))
        row.remove();
        calculatePrice()
      }
    }
    
    // zmień kolo tła wiersza
    const markBg = (e) => {
      if (e.target.tagName === 'TD') {
        e.target.closest('tr').classList.toggle('marked');
      }
    }
    
    // dodaj zniżke
    const addDiscount = function(e) {
      this.discount.enabled = e.target.checked;
      if (this.getDiscount() > 0) {
        document
          .querySelector('#discount-amount')
          .innerHTML = -this.getDiscount();
        discountElement.classList.toggle('hidden');
      }
      calculatePrice(false);
    }
    
    //sposoby
    const getPriceRegular = (items, discount) => {
      const price = items.reduce((acc, item) => acc + item.price, -discount)
      return +price 
    }

    const superKlient = (items, discount) => {
      const price = items.reduce((acc, item) => acc + item.price-1, -discount)
      return +price
    }


    // cena całkowita
    const calculatePrice = (ifSuper) => {
      const sKlient = ifSuper
      let callback = getPriceRegular
      if(sKlient) callback = superKlient
      let total = cart.getPrice(callback);
      document.querySelector('#total-price').innerHTML = total;
    }




    
    // listenery
    discountCheckbox.addEventListener('click', addDiscount.bind(cart));
    itemsContainer.addEventListener('click', markBg);
    itemsContainer.addEventListener('click', removeRow);
    itemsContainer.addEventListener('change', removeRowFromQuantity);
    
    // zaznacz checkbox na początku jeśli trzeba
    const discountShouldBeEnabled = +discountElement
      .dataset
      .discountShouldBeEnabled;
    
    if (discountShouldBeEnabled) {
      discountCheckbox.click();
    }

    const savePriceToStore = () => {
      localStorage.setItem('totalPrice', cart.price)
    }

    const nextButton = document.querySelector("#goToSummary")
    nextButton.addEventListener("click", savePriceToStore)
  })();