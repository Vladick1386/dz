document.addEventListener("DOMContentLoaded", () => {
    const isProductPage = window.location.pathname.includes("product.html");
  
    if (isProductPage) {
      initProductPage();
    }
  });
  
  function initProductPage() {
    function getQueryParam(param) {
      const params = new URLSearchParams(window.location.search);
      return params.get(param);
    }
  
    const productId = parseInt(getQueryParam("id"));
  
    // Ищем товар
    const product = originalProductData.find(item => item.id === productId);
    const productDetail = document.getElementById("product-detail");
  
    if (!product) {
      productDetail.innerHTML = "<p>Товар не найден.</p>";
      return;
    }
  
    // Формируем строку с характеристиками
    let specText = `${product.specs.screen}''`;
    if (product.specs.gpu) {
      specText += `, ${product.specs.gpu}`;
    }
    specText += `, ${product.specs.cpu}, ${product.specs.ram}GB RAM, ${product.specs.storage}`;
  
    // Подставляем данные товара
    productDetail.innerHTML = `
      <div class="product-detail-card">
        <img src="${product.image}" alt="${product.title}" class="product-detail-image">
        <div class="product-detail-info">
          <h1>${product.title}</h1>
          <p>${specText}</p>
          <p class="product-detail-price">${product.price.toLocaleString()} ₽</p>
          <button id="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
          <button id="add-to-favorite" data-id="${product.id}">Добавить в избранное</button>
        </div>
      </div>
    `;
  
    // детальные характеристики товара
    const productSpecsContainer = document.getElementById("specss");
    if (product.specs) {
      let specsHtml = `<h2>Характеристики</h2><ul class="Specs-ul">`;
      for (const [key, value] of Object.entries(product.specs)) {
        let label;
        switch (key) {
          case 'screen':
            label = 'Диагональ экрана';
            break;
          case 'gpu':
            label = 'Видеокарта';
            break;
          case 'cpu':
            label = 'Процессор';
            break;
          case 'ram':
            label = 'Оперативная память';
            break;
          case 'storage':
            label = 'Накопитель';
            break;
          default:
            label = key;
        }
        specsHtml += `<li class="Specs"><strong>${label}:</strong> ${value}</li>`;
      }
      specsHtml += `</ul>`;
      productSpecsContainer.innerHTML = specsHtml;
    }
  
    const addToCartButton = document.getElementById("add-to-cart");
    const addToFavoriteButton = document.getElementById("add-to-favorite");
  
    addToCartButton.addEventListener('click', () => addToCart(productId));
    addToFavoriteButton.addEventListener('click', () => addToFavorite(productId));
  }