class Store {
    constructor() {
        // object to hold items in cart
        this.itemsInCart = {
            itemCount: 0,
            subTotal: 0
        }

        // object hold inventory
        this.inventory = {
            item1: {
                id: 1,
                img: 'media/banner1.jpg',
                alt: 'bacon hotdog',
                price: 10.00,
                qty: 0,
                name: 'baconhotdog'
            },

            item2: {
                id: 2,
                img: 'media/banner2.jpg',
                alt: 'ribs',
                price: 20.00,
                qty: 0,
                name: 'ribs'
            },

            item3: {
                id: 3,
                img: 'media/banner3.jpg',
                alt: 'steak',
                price: 15.00,
                qty: 0,
                name: 'steak'
            },

            item4: {
                id: 4,
                img: 'media/banner4.jpg',
                alt: 'kebab',
                price: 12.00,
                qty: 0,
                name: 'kebab'
            },

            item5: {
                id: 5,
                img: 'media/banner5.jpg',
                alt: 'chicken',
                price: 12.00,
                qty: 0,
                name: 'chicken'
            },

            item6: {
                id: 6,
                img: 'media/banner6.jpg',
                alt: 'bbq porkchop',
                price: 11.00,
                qty: 0,
                name: 'bbqporkchop'
            },

            item7: {
                id: 7,
                img: 'media/banner1.jpg',
                alt: 'bacon hotdog deluxe',
                price: 19.00,
                qty: 0,
                name: 'baconhotdogdeluxe'
            },

            item8: {
                id: 8,
                img: 'media/banner2.jpg',
                price: 25.00,
                qty: 0,
                name: 'ribsdeluxe'
            }
        }

        init() {
            this.loadItems();
            this.addToCart();
            this.checkout();
            this.homeSwitch();
            this.confirmOrder();
        }
    
        loadItems() {
            let itemDiv = document.getElementById('itemDiv');
    
            for (const key in this.menu) {
                const item = this.menu[key];
                const product = document.createElement('div');
                product.className = 'col-md-3';
                product.innerHTML = `
                    <figure class="item-figure">
                        <img src="${item.img}" alt="${item.alt}" class="img-fluid item-img" />
                        <figcaption class="item-caption" id="itemCaption">${item.dish} <span class="item-price" id="itemPrice">${item.price}</span></figcaption>
                        <p class="item-desc" id="itemDesc">${item.desc}</p>
                        <button class="btn menu-btn" id="menuBtn" data-id="${item.id}">add to cart</button>
                    </figure>`;
                // console.log(product)
                itemDiv.append(product);
            }
        }
    
        addToCart() {
            // variable & access html nodes
            let buttons = document.querySelectorAll('.menu-btn');
            let cartItems = document.getElementById('cartItems');
            let cartSubtotal = document.getElementById('cartSubtotal');
            let itemCount = 0;
            let price = 0;
            let subTimesQty = 0;
            let subtotalValue = document.getElementById('subtotalValue');
            let taxValue = document.getElementById('taxValue');
            let tax = 0;
            let deliveryValue = document.getElementById('deliveryValue');
            let checkoutItemCount = document.getElementById('checkoutItemCount');
            let deliveryFee = 4.99; 
            let total = 0;
            let totalValue = document.getElementById('totalValue');
    
            
            for (const key in this.menu) {
                const item = this.menu[key];
                buttons.forEach(button => {
                    button.addEventListener('click', ()=> {
                        if (button.dataset['id'] == item.id) {
                            itemCount++;
                            price+= item.price;
                            this.itemsInCart.itemCount = itemCount;
                            this.itemsInCart.subtotal = price;
    
                            item.qty++;
                            subTimesQty = (item.price * item.qty).toFixed(2);
                            tax = this.itemsInCart.subtotal * .07;
                            total = (this.itemsInCart.subtotal + tax + deliveryFee).toFixed(2);
    
                        }
                        
                        // send back to DOM
                        cartItems.innerText = itemCount;
                        cartSubtotal.innerText = price.toFixed(2);
                        subtotalValue.innerText = this.itemsInCart.subtotal.Fixed(2);
                        deliveryValue.innerText = deliveryFee.Fixed(2);
                        taxValue.innerText = tax.Fixed(2)
                        totalValue.innerText = total;
                        
                        if (this.itemsInCart.itemCount == 1) {
                            checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`
                        } else {
                            checkoutItemCount.innerText = `${this.itemsInCart.itemCount} items`
                        }
                    })
                })            
            }
        }
    
        checkout() {
            const cartBtn = document.getElementById('cartBtn');
            const checkoutPage = document.getElementById('checkoutPage');
            const menuSection = document.getElementById('menuSection');
            const table = document.getElementById('tbody');
            let subTimesQty = 0;
    
            cartBtn.addEventListener('click', ()=> {
                if (menuSection.classList.contains('d-none')) return 
                checkoutPage.classList.remove('d-none'); 
                menuSection.classList.add('d-none')        
    
                for (const key in this.menu) {
                    const item = this.menu[key];
    
                    if(item.qty > 0) {
                        // console.log(item.dish)
                        subTimesQty = (item.qty * item.price).toFixed(2);
                        // console.log(item.dish, subTimesQty);
                        const tableRow = document.createElement('tr');
                        tableRow.className = 'item-checkout'
                        tableRow.innerHTML += `
                            <td id="itemImg">
                                <img src="${item.img}" alt="${item.alt}" class="img-fluid item-img">
                            </td>
                            <td class="unit-price">${item.price.toFixed(2)}</td>
                            <td class="item-quantity">${item.qty}</td>
                            <td class="item-subtotal">${subTimesQty}</td>
                        `;
                        table.append(tableRow);
                    }
                }
            })
        }
    
        homeSwitch() {
            const homeSwitch = document.querySelector('.home-switch');
            const checkoutPage = document.getElementById('checkoutPage');
            const menuSection = document.getElementById('menuSection');
    
            homeSwitch.addEventListener('click', ()=> {
                menuSection.classList.remove('d-none');
                checkoutPage.classList.add('d-none');
            })
    
        }
    
        confirmOrder() {
            const confirmBtn = document.getElementById('confirmButton');
            const table = document.getElementById('tbody');
            const cartItems = document.getElementById('cartItems');
            const cartSubtotal = document.getElementById('cartSubtotal');
    
            confirmButton.addEventListener('click', ()=> {
                this.itemsInCart.itemCount = 0;
                this.itemsInCart.subtotal = 0;
                table.innerHTML = `<h1>thank you for ordering</h1>`
                cartItems.innerText = this.itemsInCart.itemCount;
                cartSubtotal.innerText = this.itemsInCart.subtotal.toFixed(2);
    
                for (const key in this.menu) {
                    const item = this.menu[key];
                    item.qty = 0;
                }
    
            })  
        }
    }
    
    let restaurant = new Store();
    restaurant.init();