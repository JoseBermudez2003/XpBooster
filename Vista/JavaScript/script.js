// Script mejorado con funcionalidades profesionales
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar loader al cargar la página
    const loader = document.getElementById('page-loader');
    loader.style.display = 'flex';
    
    // Simular tiempo de carga
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1500);
    
    // Menú móvil - solución simplificada y funcional
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('open');
        menuToggle.classList.toggle('active');
        
        // Cambiar ícono
        if (mobileMenu.classList.contains('open')) {
            menuIcon.classList.remove('bi-list');
            menuIcon.classList.add('bi-x');
        } else {
            menuIcon.classList.remove('bi-x');
            menuIcon.classList.add('bi-list');
        }
    }
    
    // Evento para el botón del menú
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('open') && 
            !mobileMenu.contains(e.target) && 
            e.target !== menuToggle) {
            toggleMobileMenu();
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });
    
    // Carrusel de testimonios
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    const carousel = document.getElementById('carousel');
    const indicators = document.querySelectorAll('.indicator-btn');
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('bg-yellow-500');
                indicator.classList.remove('bg-gray-600');
            } else {
                indicator.classList.remove('bg-yellow-500');
                indicator.classList.add('bg-gray-600');
            }
        });
    }
    
    // Botones de navegación
    document.getElementById('next-btn').addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    });
    
    document.getElementById('prev-btn').addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Auto-play para el carrusel
    let carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }, 6000);
    
    // Pausar el carrusel al pasar el mouse
    const carouselContainer = document.querySelector('.relative.max-w-4xl.mx-auto');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 6000);
    });
    
    // Scroll reveal animation
    function revealElements() {
        const elements = document.querySelectorAll('.reveal');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', revealElements);
    // Ejecutar una vez al cargar
    revealElements();
    
    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Mostrar loader durante la navegación
                loader.style.display = 'flex';
                
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Ocultar loader después de la navegación
                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 500);
                    
                    // Si el objetivo es la sección de contacto, aplicar efectos
                    if (targetId === '#contact') {
                        highlightContactSection();
                    }
                }, 300);
            }
        });
    });
    
    // Efectos de hover mejorados para tarjetas de servicio
    const serviceCards = document.querySelectorAll('.card-service');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Animación para botones de "Order Service"
    const orderButtons = document.querySelectorAll('.btn-primary');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto de pulso
            this.classList.add('animate-pulse');
            
            // Redirigir a la sección de contacto después de la animación
            setTimeout(() => {
                this.classList.remove('animate-pulse');
                document.getElementById('contact').scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Aplicar efecto de iluminación a toda la sección
                highlightContactSection('full');
            }, 500);
        });
    });
    
    // Función para resaltar la sección de contacto
    function highlightContactSection(type = 'info') {
        const contactCard = document.getElementById('contact-card');
        const contactInfoSection = document.getElementById('contact-info-section');
        
        // Remover clases de animación previas
        contactCard.classList.remove('contact-highlight');
        contactInfoSection.classList.remove('contact-info-highlight');
        
        // Forzar reflow para reiniciar la animación
        void contactCard.offsetWidth;
        void contactInfoSection.offsetWidth;
        
        // Aplicar la animación según el tipo
        if (type === 'full') {
            // Iluminar toda la sección
            contactCard.classList.add('contact-highlight');
        } else {
            // Iluminar solo la sección de información de contacto
            contactInfoSection.classList.add('contact-info-highlight');
        }
        
        // Remover las clases después de que termine la animación
        setTimeout(() => {
            contactCard.classList.remove('contact-highlight');
            contactInfoSection.classList.remove('contact-info-highlight');
        }, 2000);
    }
    
    // Asignar eventos a los enlaces específicos de contacto
    document.getElementById('header-contact-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => highlightContactSection('info'), 500);
    });
    
    document.getElementById('mobile-contact-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => highlightContactSection('info'), 500);
    });
    
    document.getElementById('header-order-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => highlightContactSection('full'), 500);
    });
    
    document.getElementById('mobile-order-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => highlightContactSection('full'), 500);
    });
});