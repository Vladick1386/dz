document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slider-container .slide');
    const radioInputs = document.querySelectorAll('.slider-container .radio-input');

    if (slides.length === 0 || radioInputs.length === 0) {
        console.error('Не найдены элементы слайдера. Проверьте HTML.');
        return;
    }
  
    let currentSlide = 0;
  
    function changeSlide(n) {
        currentSlide = n;
        updateSlide();
    }
  
    function updateSlide() {
        radioInputs.forEach((input, index) => {
            input.checked = index === currentSlide;
        });
    }
  
    function autoSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }
  
    let interval = setInterval(autoSlide, 5000);
  

    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(interval)); 
    sliderContainer.addEventListener('mouseleave', () => interval = setInterval(autoSlide, 3000));
  
    radioInputs.forEach((input, index) => {
        input.addEventListener('change', () => {
            if (input.checked) {
                changeSlide(index);
            }
        });
    });
  });