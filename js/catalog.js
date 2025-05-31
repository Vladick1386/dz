document.addEventListener("DOMContentLoaded", () => {
    const isProductPage = window.location.pathname.includes("product.html");

    if (isProductPage) {
        initProductPage();
    } else {
        initCatalogPage();
    }
});

// инициализации страницы
function initCatalogPage() {
    let productData = [...originalProductData];
    const productContainer = document.getElementById("product-container");
    let displayedProducts = 0;
    const productsPerPage = 10;

    // Глобальные массивы
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

    // Счетчики
    const favoriteCountElem = document.querySelector('.favorite-count');
    const cartCountElem = document.querySelector('.cart-count');

    // создания карточки товара
    function createProductCard(product) {
        const card = document.createElement("div");
        card.className = "product-card";
        const specs = product.specs;
        let specText = `${specs.screen}''`;
        if (specs.gpu) {
            specText += `, ${specs.gpu}`;
        }
        specText += `, ${specs.cpu}, ${specs.ram}GB RAM, ${specs.storage}`;

        card.innerHTML = `
            <a href="product.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.title}" class="product-image">
            </a>
            <div class="product-txt">
                <a href="product.html?id=${product.id}" class="product-link">
                    <h2 class="product-title">${product.title}</h2>
                </a>
                <p class="product-description">${specText}</p>
                <p class="product-price">${product.price.toLocaleString()} ₽</p>
            </div>
            <div class="product-btn">
                <button class="add-to-cart" data-id="${product.id}">Добавить в корзину</button>
                <button class="add-to-favorite" data-id="${product.id}">Добавить в избранное</button>
            </div>
        `;

        const addToCartButton = card.querySelector('.add-to-cart');
        const addToFavoriteButton = card.querySelector('.add-to-favorite');

        addToCartButton.addEventListener('click', () => addToCart(product));
        addToFavoriteButton.addEventListener('click', () => addToFavorite(product));

        return card;
    }

    // добавления товара в корзину
    function addToCart(product) {
        if (!cartItems.some(item => item.id === product.id)) {
            cartItems.push(product);
            updateCartCount();
            saveToLocalStorage();
            console.log(`Товар "${product.title}" добавлен в корзину.`);
        } else {
            console.log(`Товар "${product.title}" уже в корзине.`);
        }
    }

    // добавления товара в избранное
    function addToFavorite(product) {
        if (!favoriteItems.some(item => item.id === product.id)) {
            favoriteItems.push(product);
            updateFavoriteCount();
            saveToLocalStorage();
            console.log(`Товар "${product.title}" добавлен в избранное.`);
        } else {
            console.log(`Товар "${product.title}" уже в избранном.`);
        }
    }

    // удаления товара из корзины
    function removeFromCart(productId) {
        cartItems = cartItems.filter(item => item.id !== productId);
        updateCartCount();
        saveToLocalStorage();
        console.log(`Товар с ID "${productId}" удален из корзины.`);
    }

    // удаления товара из избранного
    function removeFromFavorite(productId) {
        favoriteItems = favoriteItems.filter(item => item.id !== productId);
        updateFavoriteCount();
        saveToLocalStorage();
        console.log(`Товар с ID "${productId}" удален из избранного.`);
    }

    // обновления счетчика корзины
    function updateCartCount() {
        cartCountElem.textContent = cartItems.length;
        updateDropdownContent('.cart-dropdown-content', cartItems, 'cart');
    }

    // обновления счетчика избранного
    function updateFavoriteCount() {
        favoriteCountElem.textContent = favoriteItems.length;
        updateDropdownContent('.favorite-dropdown-content', favoriteItems, 'favorite');
    }

    // обновления содержимого выпадающего окна
    function updateDropdownContent(selector, items, type) {
        const dropdownContent = document.querySelector(selector);
        if (items.length === 0) {
            dropdownContent.innerHTML = 'Пока ничего нет.';
        } else {
            dropdownContent.innerHTML = items.map(item => `
                <div class="dropdown-item">
                    <a href="product.html?id=${item.id}" class="product-link">
                        <img src="${item.image}" alt="${item.title}" class="dropdown-item-image">
                        <div class="dropdown-item-info">
                            <p>${item.title}</p>
                            <p>${item.price.toLocaleString()} ₽</p>
                        </div>
                    </a>
                    <button class="remove-item" data-id="${item.id}" data-type="${type}">Удалить</button>
                </div>
            `).join('');

            // Удалить
            dropdownContent.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault(); // Предотвращаем переход по ссылке
                    const productId = parseInt(e.target.dataset.id);
                    const type = e.target.dataset.type;
                    if (type === 'cart') {
                        removeFromCart(productId);
                    } else if (type === 'favorite') {
                        removeFromFavorite(productId);
                    }
                });
            });
        }
    }

    // localStorage
    function saveToLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    }

    // отображения товаров
    function displayProducts(filteredData = productData) {
        const end = Math.min(displayedProducts + productsPerPage, filteredData.length);
        const productsToShow = filteredData.slice(displayedProducts, end);

        productsToShow.forEach((product) => {
            productContainer.appendChild(createProductCard(product));
        });

        displayedProducts = end;

        if (displayedProducts >= filteredData.length) {
            document.getElementById("load-more-btn").style.display = "none";
        } else {
            document.getElementById("load-more-btn").style.display = "block";
        }
    }

    // Применение фильтров
    function applyFilters() {
        const priceMin = parseInt(document.getElementById("price-min").value) || 0;
        const priceMax = parseInt(document.getElementById("price-max").value) || Infinity;
    
        // Бренды
        const selectedBrands = Array.from(
            document.querySelectorAll('input[name="brand"]:checked')
        ).map(checkbox => checkbox.value);
    
        // Диагональ экрана
        const selectedScreens = Array.from(
            document.querySelectorAll('input[name="screen"]:checked')
        ).map(checkbox => parseFloat(checkbox.value));
    
        // Проц.
        const selectedCpus = Array.from(
            document.querySelectorAll('input[name="cpu"]:checked')
        ).map(checkbox => checkbox.value);
    
        // озу
        const selectedRams = Array.from(
            document.querySelectorAll('input[name="ram"]:checked')
        ).map(checkbox => parseInt(checkbox.value));
    
        // Накопители
        const selectedStorages = Array.from(
            document.querySelectorAll('input[name="storage"]:checked')
        ).map(checkbox => checkbox.value);
    
        // Фильтрация товаров
        productData = originalProductData.filter((product) => {
            const priceMatch = product.price >= priceMin && product.price <= priceMax;
            const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    
            // диагонали экрана
            const screenMatch = selectedScreens.length === 0 || selectedScreens.some(screen => 
                product.specs.screen >= screen && product.specs.screen < screen + 1
            );
    
            // проц.
            const cpuBrand = getCpuBrand(product.specs.cpu); 
            const cpuMatch = selectedCpus.length === 0 || selectedCpus.includes(cpuBrand);
    
            // озу
            const ramMatch = selectedRams.length === 0 || selectedRams.includes(product.specs.ram);
    
            // накопители
            const storageMatch = selectedStorages.length === 0 || selectedStorages.some(storage => 
                product.specs.storage.includes(storage)
            );
    
            return priceMatch && brandMatch && screenMatch && cpuMatch && ramMatch && storageMatch;
        });
    
        // сортировка
        const sortValue = document.getElementById("sort-price").value;
        if (sortValue === "asc") {
            productData.sort((a, b) => a.price - b.price);
        } else if (sortValue === "desc") {
            productData.sort((a, b) => b.price - a.price);
        }
    
        // отфильтрованные товары
        productContainer.innerHTML = "";
        displayedProducts = 0;
        displayProducts();
    }
    
    // бренд процессора
    function getCpuBrand(cpu) {
        if (cpu.includes("Apple")) return "Apple";
        if (cpu.includes("i5") || cpu.includes("i7") || cpu.includes("i9")) return "Intel";
        if (cpu.includes("Ryzen")) return "AMD";
        return "Other";
    }
    // сортировка "Сначала дешевые"
    document.getElementById("sort-price").value = "asc";

    // сортировки
    productData.sort((a, b) => a.price - b.price);

    // первые товары
    displayProducts();

    document.getElementById("apply-filters").addEventListener("click", applyFilters);
    document.getElementById("load-more-btn").addEventListener("click", () => displayProducts(productData));
    document.getElementById("sort-price").addEventListener("change", () => applyFilters());
}

 

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenuBtn = document.getElementById("burgerMenuBtn");
    const filters = document.querySelector('.filters');

    // открытия/закрытия меню
    function toggleMenu() {
        filters.style.display = 'block';
    }

    burgerMenuBtn.addEventListener("click", toggleMenu);

    // Обработчик свайпа
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    document.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX < -50) {
            // Свайп справа налево
            filters.style.display = 'block';
            burgerMenuBtn.style.display = 'none';
        } else if (touchStartX - touchEndX > 50) {
            // Свайп слева направо
            filters.style.display = 'none';
            burgerMenuBtn.style.display = 'inline-block';
        }
    }
});