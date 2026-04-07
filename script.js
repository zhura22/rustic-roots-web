// script.js - Rustic Roots

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Set active menu based on current page
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
setActiveMenu();

// Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih, pesan Anda telah terkirim. Tim Rustic Roots akan menghubungi Anda segera.');
        contactForm.reset();
    });
}

// Lightbox for galeri.html
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');

    if (galleryItems.length && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.classList.add('active');
            });
        });

        closeLightbox.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }
}

// Floating WhatsApp & Back to Top
function addWhatsAppFloat() {
    if (!document.querySelector('.whatsapp-float')) {
        const waFloat = document.createElement('a');
        waFloat.href = 'https://wa.me/6281210166425?text=Halo%20Rustic%20Roots%2C%20saya%20tertarik%20dengan%20produk%20Anda.';
        waFloat.className = 'whatsapp-float';
        waFloat.target = '_blank';
        waFloat.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(waFloat);
    }
}

function addBackToTop() {
    if (!document.querySelector('.back-to-top')) {
        const backBtn = document.createElement('div');
        backBtn.className = 'back-to-top';
        backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.body.appendChild(backBtn);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backBtn.classList.add('show');
            } else {
                backBtn.classList.remove('show');
            }
        });
    }
}

// Filter function (untuk kayu.html & batu.html)
function initFilter(productsArray, containerId, renderFunction) {
    const searchInput = document.getElementById('searchInput');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const sortSelect = document.getElementById('sortSelect');
    const resetBtn = document.getElementById('resetFilter');

    if (!searchInput) return;

    function filterAndRender() {
        let filtered = [...productsArray];
        const keyword = searchInput.value.toLowerCase();
        if (keyword) filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword));
        const min = minPrice.value ? parseInt(minPrice.value) : 0;
        const max = maxPrice.value ? parseInt(maxPrice.value) : Infinity;
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
        const sort = sortSelect.value;
        if (sort === 'price_asc') filtered.sort((a,b) => a.price - b.price);
        else if (sort === 'price_desc') filtered.sort((a,b) => b.price - a.price);
        else if (sort === 'name_asc') filtered.sort((a,b) => a.name.localeCompare(b.name));
        renderFunction(filtered);
    }

    searchInput.addEventListener('input', filterAndRender);
    minPrice.addEventListener('input', filterAndRender);
    maxPrice.addEventListener('input', filterAndRender);
    sortSelect.addEventListener('change', filterAndRender);
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            searchInput.value = '';
            minPrice.value = '';
            maxPrice.value = '';
            sortSelect.value = 'default';
            filterAndRender();
        });
    }
    filterAndRender();
}

document.addEventListener('DOMContentLoaded', () => {
    addWhatsAppFloat();
    addBackToTop();
    initLightbox();
});
