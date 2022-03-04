//contador de productos
const counter_cart = document.querySelector('#counter_cart');
//cuerpo de la tabla donde estan los productos
const bodyCart = document.querySelector('#tbody_cart')

const btn_add = document.querySelector('#btn_add');

//creacion de arreglos de productos
let products_array = [
    {
        "id": "1",
        "title": "Montaña Rusa Yipe",
        "img": "./img/jeep.jpg",
        "description": "Descripcion 1",
        "price": "60000"
    },
    {
        "id": "2",
        "title": "La rueda",
        "img": "./img/rueda.jpg",
        "description": "Descripcion 2",
        "price": "50000"
    },
    {
        "id": "3",
        "title": "El krater",
        "img": "./img/krater.jpg",
        "description": "Descripcion 3",
        "price": "20000"
    },
    {
        "id": "4",
        "title": "Pexels",
        "img": "./img/pexels.jpg",
        "description": "Descripcion 4",
        "price": "90000"
    },
    {
        "id": "5",
        "title": "Montaña Rusa",
        "img": "./img/Montana.jpg",
        "description": "Descripcion 5",
        "price": "80000"
    },
    {
        "id": "6",
        "title": "El castillo Del Terror",
        "img": "./img/castillo.jpg",
        "description": "Descripcion 6",
        "price": "67000"
    },
    {
        "id": "7",
        "title": "El Barco Pirata",
        "img": "./img/barcopirata.jpg",
        "description": "Descripcion 7",
        "price": "10000"
    }
]; 
CreateCard();

function CreateCard(){
    let div_card = document.getElementById('productos');
    products_array.forEach(i => {
        div_card.innerHTML +=
        `
        <div class="card_product" id="card_product">
        <h3 class="p_title" id="p_title-${i.id}">${i.title}</h3>
        <img src="${i.img}" id="p_img-${i.id}" alt="" class="p_img">
        <p class="p_description" id="p_description-${i.id}">${i.description}</p>
        <p class="p_price" id="p_price-${i.id}">${i.price}</p>
        <button class="btn_add" id="btn_add-${i.id}">Añadir</button>
        </div>
        `
        let btn_e = document.getElementById(`productos`)
        btn_e.addEventListener('click', AddCart)
    });
    // console.log(div_card)
}

function AddCart(e){
    let button;
    if(e.target.tagName == 'BUTTON'){
        button = e.target.getAttribute('id');
        let p_title = "p_title-"
        let p_img = "p_img-"
        let p_description = "p_description-"
        let p_price = "p_price-"

        let current_id_split = button.split('-'); // se divide el atributo id que tiene el boton en 2 para separar el texto del id
        // console.log(current_id_split) // Valido el split
        current_id = current_id_split[1] // Se obtine la posicion 1, la cual solo tiene el numero del id

        let title = document.getElementById(`${p_title + current_id}`).textContent
        let img = document.getElementById(`${p_img + current_id}`).getAttribute('src')
        let description = document.getElementById(`${p_description + current_id}`).textContent
        let price = document.getElementById(`${p_price + current_id}`).textContent

        let item_cart_body = bodyCart.getElementsByClassName(`title-item-cart`)
        // console.log(item_cart_body)
        for (let i = 0; i < item_cart_body.length; i++){
            if (item_cart_body[i].innerText.trim() === title){
                console.log(item_cart_body[i])
                let elementQuantity =  item_cart_body[i].parentElement.querySelector(`#quantityNumber-${current_id}`)
                // console.log(elementQuantity)
                elementQuantity.value ++
                // console.log(elementQuantity.value)
                UpdateTotal()
                return;
            }
        }

        let div_added = document.getElementById('tbody_cart');
        div_added.innerHTML +=
        `
        <tr class="item_cart">
            <td class="title-item-cart" id="title-item-cart-${current_id}">
                ${title}
            </td>
            <td class="item_quantity">
                <input class="quantityNumber form-control" type="number" value="1" id="quantityNumber-${current_id}">
            </td>
            <td class="item_price">
                ${price}
            </td>
            <td>
                <button class="btn btn-danger" id="btndelete-${current_id}">Eliminar</button>
            </td>
        </tr>
        `
        
        // onchange="ChangeQuantity()"
        let addEvent = document.getElementById(`added`)
        addEvent.addEventListener('click', DeleteProduct)
        addEvent.addEventListener('change', QuantityChangedItem)
    }
    UpdateTotal()
}

function DeleteProduct(e){
    let buttondelete;
    if(e.target.tagName == 'BUTTON'){
        buttondelete = e.target;
        buttondelete.closest('.item_cart').remove();
        UpdateTotal();
    }
}

function QuantityChangedItem(e) {
    if (e.target.tagName === 'INPUT') {
        const input = e.target
        if (input.value <= 0){
            input.value = 1
        }
        UpdateTotal()
    }
}

function UpdateTotal(){
    let totalcart = 0;
    let sumQuantity = 0
    const total = document.querySelector('.total');
    const items = document.querySelectorAll('.item_cart'); // Se seleccionan todo los item a traves de la clase

    items.forEach((item_cart) => {
        let priceElement = item_cart.querySelector('.item_price');
        let quantityElement = item_cart.querySelector(`.quantityNumber`);
        // console.log(quantityElement)
        const price_list = Number(priceElement.textContent);
        const quantity = quantityElement.value;
        totalcart = totalcart + (price_list * Number(quantity))
        sumQuantity = sumQuantity + Number(quantity)
        console.log(sumQuantity)
    });
    counter_cart.textContent = sumQuantity
    total.textContent = totalcart
}









