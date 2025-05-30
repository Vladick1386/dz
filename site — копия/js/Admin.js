document.addEventListener("DOMContentLoaded", () => {
    // исходные данные о товарах
    let productData = [...originalProductData];
    let currentProductId = null;

    const productList = document.getElementById("product-list");
    const editForm = document.getElementById("editForm");
    const editProductForm = document.getElementById("edit-product-form");

    /**
     * отображения списка товаров
     */
    function renderProductList() {
        productList.innerHTML = "";
        productData.forEach((product) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span>${product.title} - ${product.price} ₽</span>
                <div class="actions">
                    <button onclick="editProduct(${product.id})">Редактировать</button>
                    <button onclick="deleteProduct(${product.id})">Удалить</button>
                </div>
            `;
            productList.appendChild(listItem);
        });
    }

    /**
     * редактирования товара
     */
    window.editProduct = (id) => {
        const product = productData.find((item) => item.id === id);
        if (!product) return;

        currentProductId = id;
        document.getElementById("edit-title").value = product.title;
        document.getElementById("edit-price").value = product.price;
        document.getElementById("edit-image").value = product.image;
        document.getElementById("edit-brand").value = product.brand;
        document.getElementById("edit-screen").value = product.specs.screen;
        document.getElementById("edit-gpu").value = product.specs.gpu || "";
        document.getElementById("edit-cpu").value = product.specs.cpu;
        document.getElementById("edit-ram").value = product.specs.ram;
        document.getElementById("edit-storage").value = product.specs.storage;

        editProductForm.style.display = "block";
    };

    /**
     * удаления товара
     */
    window.deleteProduct = (id) => {
        const index = productData.findIndex((item) => item.id === id);
        if (index !== -1) {
            productData.splice(index, 1);
            renderProductList();
        }
    };

    /**
     * отправки формы редактирования
     */
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const updatedProduct = {
            id: currentProductId,
            title: document.getElementById("edit-title").value,
            price: parseFloat(document.getElementById("edit-price").value),
            image: document.getElementById("edit-image").value,
            brand: document.getElementById("edit-brand").value,
            specs: {
                screen: parseFloat(document.getElementById("edit-screen").value),
                gpu: document.getElementById("edit-gpu").value || null,
                cpu: document.getElementById("edit-cpu").value,
                ram: parseInt(document.getElementById("edit-ram").value),
                storage: document.getElementById("edit-storage").value,
            },
        };

        const index = productData.findIndex((item) => item.id === currentProductId);
        if (index !== -1) {
            productData[index] = updatedProduct;
        }

        editProductForm.style.display = "none";
        renderProductList();
    });

    /**
     * Отмена в форме редактирования
     */
    document.getElementById("cancel-edit").addEventListener("click", () => {
        editProductForm.style.display = "none";
    });

    // Инициализация
    renderProductList();
});

document.addEventListener("DOMContentLoaded", () => {
    // все ссылки навигации и секции
    const navLinks = document.querySelectorAll("#admin-nav a");
    const sections = document.querySelectorAll(".admin-section");
  
    // скрытия всех секций
    function hideAllSections() {
      sections.forEach((section) => {
        section.classList.remove("active");
      });
    }
  
    // показ конкретной секции
    function showSection(targetId) {
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        hideAllSections();
        targetSection.classList.add("active");
      }
    }
  
    // обработчики событий для ссылок навигации
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); 
        const targetId = link.getAttribute("data-target");
        showSection(targetId);
      });
    });
  
    // секция по умолчанию
    if (sections.length > 0) {
      showSection(sections[0].id);
    }
  });