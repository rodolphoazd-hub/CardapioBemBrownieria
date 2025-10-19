const menu =  document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("addres-warn")

let cart =[];

//abrir modal do carrinho
cartBtn.addEventListener("click", function(){
    cartModal.style.display="flex"
    updateCartModal();
})
//fechar modal do carrinho
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal){
        cartModal.style.display ="none"
    }
})
//fechar botão modal do carrinho
closeModalBtn.addEventListener("click",function(){
    cartModal.style.display ="none"
})





menu.addEventListener("click", function(event){

    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})


//função para add carrinho
function addToCart(name, price){
  
    const existingItem = cart.find(item => item.name === name)
    
    if(existingItem){
        
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
    })
    
}
//atualizar o carrinho

updateCartModal()

}

function updateCartModal(){
cartItemsContainer.innerHTML="";
let total = 0;
cart.forEach(item =>{
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")


cartItemElement.innerHTML =`
<div class = "flex items-center justify-between">
   <div>
      <p class= "font-bold">${item.name}</p>
      <p>Qtd: ${item.quantity}</p>
      <p class= "font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
    </div>
    <div>
        <button class="remove-from-card-btn" data-name="${item.name}">
        Remover
        </button>
    </div>
</div>
`
total += item.price *item.quantity;

cartItemsContainer.appendChild(cartItemElement)

})
cartTotal.textContent = total.toLocaleString("pt-BR",{
    style:"currency",
    currency:"BRL"
});
cartCounter.innerHTML = cart.length;
}

//função para remover o item do carrinho
cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-card-btn")){
    const name = event.target.getAttribute("data-name")
    removeItemCart(name);
    }
})

function removeItemCart(name){
    const index =cart.findIndex(item => item.name === name);
    if(index !== -1){
        const item = cart[index];
        if(item.quantity > 1){
            item.quantity -=1;
            updateCartModal();
            return;
        }
        cart.splice(index, 1);
        updateCartModal();

    }
}
addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;
    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
       addressWarn.classList.add("hidden")
    }
})
checkoutBtn.addEventListener("click", function(){

    const isOpen = chckDoceriaOpen();
    if(!isOpen){
        // alert("Bem Brownieria esta fechada no momento!")
        // return;
        Toastify({
        text: "Bem Brownieria esta fechada no momento!",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
    background: "linear-gradient(to right, #ef4444, #96c93d)",
    },
   // Callback after click
    }).showToast();
    return;
}

   

    if(cart.length === 0) return;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
         addressInput.classList.add("border-red-500")
         return;
    }

    const cartItens = cart.map((item) => {
        return (
             `${item.name} Quantidade:(${item.quantity}) Preço: R$${item.price} |`

        )
        
    }).join("")
        const message = encodeURIComponent(cartItens)
        const phone = "21965501182"

        window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank")

        cart =[];
        updateCartModal();

    })

// verificar a hora e manipular o card do horario

function chckDoceriaOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 9 && hora < 16;
}

const spanItem = document.getElementById("date-span")
const isOpen = chckDoceriaOpen();
if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600")}
    else{
    spanItem.classList.remove("bg-green-600");
    spanItem.classList.add("bg-red-500")}

    

