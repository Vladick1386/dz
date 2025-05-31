document.addEventListener('DOMContentLoaded', function () {
    // Search
    const searchIcon = document.querySelector('a[href="index.html"] img[alt="search"]');
    const searchOverlay = document.getElementById('searchOverlay');

    // Открытие поиска
    searchIcon.closest('a').addEventListener('click', function (e) {
        e.preventDefault();
        searchOverlay.style.display = 'flex';
    });

    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchOverlay.style.display = 'none';
        }
    });

    // Enter
    document.getElementById('searchInput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            performSearch();
        }
    });
    
    // выполнения поиска
    function performSearch() {
        const query = document.getElementById('searchInput').value.trim().toLowerCase();
    
        if (!query) {
            alert('Введите запрос для поиска.');
            return;
        }
    
        // Фильтрация товаров
        const results = originalProductData.filter(product => {
            return (
                product.title.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query)
            );
        });
    
        displaySearchResults(results);
    }
    document.getElementById('searchInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
          e.preventDefault();
          performSearch(); 
      }
  });

document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.trim().toLowerCase();

  if (!query) {
      alert('Введите запрос для поиска.');
      return;
  }

  // Фильтрация товаров
  const results = originalProductData.filter(product => {
      return (
          product.title.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
      );
  });

  displaySearchResults(results);
});

// отображения результатов поиска
function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById('searchResults');
  searchResultsContainer.innerHTML = '';

  if (results.length === 0) {
      searchResultsContainer.innerHTML = '<p>Товары не найдены.</p>';
      return;
  }

  results.forEach(item => {
      const productItem = document.createElement('div');
      productItem.className = 'product-item';
      productItem.innerHTML = `
          <a href="product.html?id=${item.id}" class="product-link">
              <img src="${item.image}" alt="${item.title}" class="dropdown-item-image">
              <div class="product-info">
                  <p>${item.title}</p>
                  <p>${item.price.toLocaleString()} ₽</p>
              </div>
          </a>
      `;
      searchResultsContainer.appendChild(productItem);
  });
}


// User
const userIcon = document.querySelector('a[href="index.html"] img[alt="user"]');
const authOverlay = document.getElementById('authOverlay');
const closeBtn = document.querySelector('.close-btn');
const authForm = document.getElementById('authForm');

// Проверка user
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
if (isLoggedIn) {
    updateUserIcon();
}


userIcon.closest('a').addEventListener('click', function (e) {
    e.preventDefault();
    if (!isLoggedIn) {
        authOverlay.style.display = 'flex';
    } else {
        logoutUser();
    }
});


closeBtn.addEventListener('click', () => {
    authOverlay.style.display = 'none';
});


authOverlay.addEventListener('click', (e) => {
    if (e.target === authOverlay) {
        authOverlay.style.display = 'none';
    }
});

// ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        authOverlay.style.display = 'none';
    }
});

// авторизация
authForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Проверка учетных данных
    if (email === 'gamedisya@gmail.com' && password === 'Zaqe1357') {
        // Сохраняем состояние
        localStorage.setItem('isLoggedIn', 'true');
        isLoggedIn = true;
        updateUserIcon();
        authOverlay.style.display = 'none';
        alert('Вы успешно вошли!');
    } else {
        alert('Неверный email или пароль.');
    }
});

// выход пользователя
function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    isLoggedIn = false;
    updateUserIcon();
    alert('Вы вышли из аккаунта.');
}


function updateUserIcon() {
    if (isLoggedIn) {
        userIcon.src = 'img/user-l.png';
        userIcon.alt = 'Выйти';
    } else {
        userIcon.src = 'img/user.png';
        userIcon.alt = 'Войти';
    }
}

    const menuUl = document.querySelector('.menu-ul');


    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        const adminLink = document.createElement('p');
        adminLink.innerHTML = '<a href="Admin.html">Админ</a>';

        menuUl.appendChild(adminLink);
    }


    // Мобильное меню
    const burgerMenu = document.querySelector('.burger-menu');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (burgerMenu && dropdownContent) {
        burgerMenu.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdownContent.style.display = 'block';
            }
        });

      document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            const isDropdownVisible = window.getComputedStyle(dropdownContent).display === 'block';
        
            if (!e.target.closest('.catalog-menu') && isDropdownVisible) {
                dropdownContent.style.display = 'none';
            }
        }
      });
    }


    
}); 


  const originalProductData = [
    {
      "id": 1,
      "title": "Acer aspire am12",
      "price": 159990,
      "image": "img/1.png",
      "brand": "Acer",
      "specs": {
        "screen": 14.6,
        "gpu": "RTX 4070",
        "cpu": "i5 12400h",
        "ram": 8,
        "storage": "960GB SSD"
      }
    },
    {
      "id": 2,
      "title": "Apple MacBook Air M2",
      "price": 129990,
      "image": "img/2.png",
      "brand": "Apple",
      "specs": {
        "screen": 13.6,
        "cpu": "Apple M2",
        "ram": 8,
        "storage": "256GB SSD"
      }
    },
    {
      "id": 3,
      "title": "HP Envy x360",
      "price": 109990,
      "image": "img/3.png",
      "brand": "HP",
      "specs": {
        "screen": 15.6,
        "cpu": "Ryzen 5 5600H",
        "ram": 16,
        "storage": "512GB SSD"
      }
    },
    {
      "id": 4,
      "title": "Dell XPS 13",
      "price": 149990,
      "image": "img/4.png",
      "brand": "Dell",
      "specs": {
        "screen": 13.4,
        "cpu": "i5 1230U",
        "ram": 8,
        "storage": "512GB SSD"
      }
    },
    {
      "id": 5,
      "title": "Lenovo ThinkPad E14",
      "price": 89990,
      "image": "img/5.png",
      "brand": "Lenovo",
      "specs": {
        "screen": 14.0,
        "cpu": "i3 1005G1",
        "ram": 8,
        "storage": "256GB SSD"
      }
    },
    {
      "id": 6,
      "title": "Asus Vivobook X512FA",
      "price": 59990,
      "image": "img/6.png",
      "brand": "Asus",
      "specs": {
        "screen": 15.6,
        "cpu": "Pentium Silver N5000",
        "ram": 4,
        "storage": "128GB SSD"
      }
    },
    {
      "id": 7,
      "title": "Microsoft Surface Laptop 4",
      "price": 139990,
      "image": "img/7.png",
      "brand": "Microsoft",
      "specs": {
        "screen": 13.5,
        "cpu": "i5 1140P",
        "ram": 8,
        "storage": "256GB SSD"
      }
    },
    {
      "id": 8,
      "title": "Asus ROG Zephyrus G14",
      "price": 199990,
      "image": "img/8.png",
      "brand": "Asus",
      "specs": {
        "screen": 14.0,
        "cpu": "Ryzen 7 4800HS",
        "ram": 16,
        "storage": "1TB SSD"
      }
    },
    {
      "id": 9,
      "title": "HP Pavilion Gaming 15",
      "price": 109990,
      "image": "img/9.png",
      "brand": "HP",
      "specs": {
        "screen": 15.6,
        "cpu": "i5 10300H",
        "ram": 8,
        "storage": "512GB SSD"
      }
    },
    {
      "id": 10,
      "title": "Apple MacBook Pro M1",
      "price": 149990,
      "image": "img/10.png",
      "brand": "Apple",
      "specs": {
        "screen": 13.0,
        "cpu": "Apple M1",
        "ram": 8,
        "storage": "512GB SSD"
      }
    },
    {
      "id": 11,
      "title": "Acer Nitro 5",
      "price": 119990,
      "image": "img/11.png",
      "brand": "Acer",
      "specs": {
        "screen": 15.6,
        "cpu": "i5 11400H",
        "ram": 16,
        "storage": "512GB SSD"
      }
    },
    {
      "id": 12,
      "title": "Lenovo Yoga 7i",
      "price": 99990,
      "image": "img/12.png",
      "brand": "Lenovo",
      "specs": {
        "screen": 14.0,
        "cpu": "i5 1135G7",
        "ram": 8,
        "storage": "256GB SSD"
      }
    },
    {
      "id": 13,
      "title": "Dell Inspiron 15 5000",
      "price": 89990,
      "image": "img/13.png",
      "brand": "Dell",
      "specs": {
        "screen": 15.6,
        "cpu": "i3 1005G1",
        "ram": 8,
        "storage": "256GB SSD"
      }
    },
    {
      "id": 14,
      "title": "Asus ZenBook Flip 14",
      "price": 119990,
      "image": "img/14.png",
      "brand": "Asus",
      "specs": {
        "screen": 14.0,
        "cpu": "Ryzen 5 4500U",
        "ram": 8,
        "storage": "512GB SSD"
      }
    },
    {
      "id": 15,
      "title": "HP Spectre x360",
      "price": 159990,
      "image": "img/15.png",
      "brand": "HP",
      "specs": {
        "screen": 13.5,
        "cpu": "i5 1130P",
        "ram": 8,
        "storage": "512GB SSD"
      }
    },
    {
      "id": 16,
      "title": "Acer Swift 3",
      "price": 99990,
      "image": "img/16.png",
      "brand": "Acer",
      "specs": {
        "screen": 14.0,
        "cpu": "Ryzen 5 5500U",
        "ram": 8,
        "storage": "512GB SSD"
      }
    },
    {
      "id": 17,
      "title": "Dell G3 15",
      "price": 109990,
      "image": "img/17.png",
      "brand": "Dell",
      "specs": {
        "screen": 15.6,
        "cpu": "i5 10300H",
        "ram": 8,
        "storage": "512GB SSD"
      }
    },
    {
      "id": 18,
      "title": "Asus TUF Gaming FX505DT",
      "price": 89990,
      "image": "img/18.png",
      "brand": "Asus",
      "specs": {
        "screen": 15.6,
        "cpu": "Ryzen 5 3550H",
        "ram": 8,
        "storage": "512GB SSD"
      }
    },
    {
      "id": 19,
      "title": "HP Envy 13",
      "price": 129990,
      "image": "img/19.png",
      "brand": "HP",
      "specs": {
        "screen": 13.3,
        "cpu": "i5 1135G7",
        "ram": 8,
        "storage": "512GB SSD"
      }
    },
    {
      "id": 20,
      "title": "Lenovo Legion Y540",
      "price": 149990,
      "image": "img/20.png",
      "brand": "Lenovo",
      "specs": {
        "screen": 15.6,
        "cpu": "i5 11400H",
        "ram": 16,
        "storage": "1TB SSD"
      }
    }
  ];

// Глобальные массивы для корзины и избранного
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let favoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];

// добавление товара в корзину
function addToCart(productId) {
  const productToAdd = originalProductData.find(item => item.id === productId);
  if (!cartItems.some(item => item.id === productId)) {
    cartItems.push(productToAdd);
    saveToLocalStorage();
    console.log(`Товар "${productToAdd.title}" добавлен в корзину.`);
  } else {
    console.log(`Товар "${productToAdd.title}" уже в корзине.`);
  }

  updateCounters(); 
  updateDropdownContent('.cart-dropdown-content', cartItems);
}

// добавления товара в избранное
function addToFavorite(productId) {
  const productToAdd = originalProductData.find(item => item.id === productId);
  if (!favoriteItems.some(item => item.id === productId)) {
    favoriteItems.push(productToAdd);
    saveToLocalStorage();
    console.log(`Товар "${productToAdd.title}" добавлен в избранное.`);
  } else {
    console.log(`Товар "${productToAdd.title}" уже в избранном.`);
  }
  updateCounters();
  updateDropdownContent('.favorite-dropdown-content', favoriteItems);
}

// удаления товара из корзины
function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  saveToLocalStorage();
  console.log(`Товар с ID "${productId}" удален из корзины.`);
  // Обновляем интерфейс
  updateCounters();
  updateDropdownContent('.cart-dropdown-content', cartItems);
}

// удаления товара из избранного
function removeFromFavorite(productId) {
  favoriteItems = favoriteItems.filter(item => item.id !== productId);
  saveToLocalStorage();
  console.log(`Товар с ID "${productId}" удален из избранного.`);
  // Обновляем интерфейс
  updateCounters();
  updateDropdownContent('.favorite-dropdown-content', favoriteItems);
}

// сохранения данных в localStorage
function saveToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
}

// обновления счетчиков корзины и избранного
function updateCounters() {
  const cartCountElem = document.querySelector('.cart-count');
  const favoriteCountElem = document.querySelector('.favorite-count');

  if (cartCountElem) {
    cartCountElem.textContent = cartItems.length;
  }

  if (favoriteCountElem) {
    favoriteCountElem.textContent = favoriteItems.length;
  }
}

// обновления содержимого выпадающего окна
function updateDropdownContent(selector, items) {
  const dropdownContent = document.querySelector(selector);
  if (dropdownContent) {
    dropdownContent.innerHTML = '';
    if (items.length === 0) {
      dropdownContent.innerHTML = '<p>Пока ничего нет.</p>';
    } else {
      items.forEach(item => {
        const dropdownItem = document.createElement('div');
        dropdownItem.className = 'dropdown-item';
        dropdownItem.innerHTML = `
          <a href="product.html?id=${item.id}" class="product-link">
            <img src="${item.image}" alt="${item.title}" class="dropdown-item-image">
            <div class="dropdown-item-info">
              <p>${item.title}</p>
              <p>${item.price.toLocaleString()} ₽</p>
            </div>
          </a>
          <button class="remove-item" data-id="${item.id}" data-type="${selector.includes('cart') ? 'cart' : 'favorite'}">Удалить</button>
        `;
        dropdownContent.appendChild(dropdownItem);

        // Удалить
        const removeButton = dropdownItem.querySelector('.remove-item');
        removeButton.addEventListener('click', (e) => {
          e.preventDefault();
          const productId = parseInt(e.target.dataset.id);
          const type = e.target.dataset.type;
          if (type === 'cart') {
            removeFromCart(productId);
          } else if (type === 'favorite') {
            removeFromFavorite(productId);
          }
        });
      });

      // Купить
      if (selector.includes('cart')) {
        const buyButton = document.createElement('button');
        buyButton.className = 'buy-button';
        buyButton.textContent = 'Купить';
        buyButton.addEventListener('click', () => {
          window.location.href = 'Zakaz.html'; 
        });
        dropdownContent.appendChild(buyButton);
      }
    }
  }
}

// Инициализация глобальных элементов
document.addEventListener("DOMContentLoaded", () => {
  updateCounters();
  updateDropdownContent('.cart-dropdown-content', cartItems);
  updateDropdownContent('.favorite-dropdown-content', favoriteItems);

  // Удалить
  document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
    const icon = dropdown.querySelector('.favorite-icon, .cart-icon');
    const content = dropdown.querySelector('.favorite-dropdown-content, .cart-dropdown-content');

    icon.addEventListener('click', (e) => {
      e.stopPropagation();

      // Закрываем все
      document.querySelectorAll('[data-dropdown]').forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('dropdown-active');
        }
      });

      dropdown.classList.toggle('dropdown-active');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !icon.contains(e.target)) {
        dropdown.classList.remove('dropdown-active');
      }
    });
  });
});

