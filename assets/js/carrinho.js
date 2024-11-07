document.querySelectorAll(".botao-adicionar").forEach((button) => {
    button.addEventListener("click", () => {
      const price = button.getAttribute("data-price");
      const item =
        button.previousElementSibling.previousElementSibling.textContent;
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.push({ item, price });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      alert("Item adicionado ao carrinho!");
    });
  });
  
  const cart = document.getElementById("cart");
  const totalElement = document.getElementById("total");
  const clearCartButton = document.getElementById("clear-cart");
  let total = 0;
  
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.forEach(({ item, price }) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("carrinho-item");
    cartItem.textContent = `${item} - R$ ${parseFloat(price).toFixed(2)}`;
    cart.appendChild(cartItem);
    total += parseFloat(price);
  });
  
  totalElement.textContent = total.toFixed(2);
  
  
  clearCartButton.addEventListener("click", () => {
    localStorage.removeItem("cartItems");
    cart.innerHTML = "";
    total = 0;
    totalElement.textContent = total.toFixed(2);
    alert("Carrinho limpo!");
  });
  