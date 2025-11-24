// ========== 輪播功能 ==========
const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (slides.length > 0 && dotsContainer) {
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoPlayInterval;

    // 建立指示點
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    });

    function updateCarousel() {
        slides.forEach((slide, i) => {
            slide.className = 'carousel-slide';
            
            if (i === currentIndex) {
                slide.classList.add('center');
            } else if (i === (currentIndex - 1 + totalSlides) % totalSlides) {
                slide.classList.add('left');
            } else if (i === (currentIndex + 1) % totalSlides) {
                slide.classList.add('right');
            } else {
                slide.classList.add('hidden');
            }
        });

        // 更新指示點
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
        resetAutoPlay();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
        resetAutoPlay();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoPlay();
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 2000);
    }

    // 綁定按鈕事件
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // 初始化
    updateCarousel();
    autoPlayInterval = setInterval(nextSlide, 2000);
}

// ========== 商品卡片互動 ==========
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function() {
        if (!this.classList.contains('empty')) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        }
    });
});

// ========== 導航連結 ==========
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const text = e.target.textContent;
        console.log(`導航到: ${text}`);
    });
});