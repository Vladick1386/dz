document.addEventListener("DOMContentLoaded", () => {
    // Получаем данные localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
  
    // товары в корзине
    function displayCartItems() {
      if (cartItems.length === 0) {
        cartList.innerHTML = "<li>Ваша корзина пуста.</li>";
        totalPriceElement.textContent = "Итого: 0 ₽";
        return;
      }
  
      let total = 0;
      cartList.innerHTML = "";
  
      cartItems.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="cart-item-image">
          <div class="cart-item-info">
            <p>${item.title}</p>
            <p>${item.price.toLocaleString()} ₽</p>
          </div>
        `;
        cartList.appendChild(li);
        total += item.price;
      });
  
      totalPriceElement.textContent = `Итого: ${total.toLocaleString()} ₽`;
    }
  
    // Обработка отправки формы
    document.getElementById("checkout-form").addEventListener("submit", (e) => {
      e.preventDefault();
  
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        comment: document.getElementById("comment").value,
        items: cartItems,
      };
  
      console.log("Заказ оформлен:", formData);
  
      // Очищаем корзину после оформления заказа
      localStorage.removeItem("cartItems");
      alert("Спасибо за заказ! Мы свяжемся с вами в ближайшее время.");
      window.location.href = "index.html";
    });
  
    displayCartItems();
  });