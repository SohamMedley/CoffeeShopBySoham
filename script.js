document.addEventListener('DOMContentLoaded', function() {
    // Loader Animation
    setTimeout(() => {
        document.querySelector('.loader').classList.add('hidden');
        document.body.style.overflow = 'visible';
        animateHeroElements();
    }, 2000);

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        const spans = menuToggle.querySelectorAll('span');
        spans[0].classList.toggle('rotate-45');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('rotate-neg-45');
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                navLinks.classList.remove('active');
                
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal-text, .fade-in');
    const revealOnScroll = function() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('visible');
            }
        }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load

    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax-element');
    window.addEventListener('scroll', function() {
        for (let i = 0; i < parallaxElements.length; i++) {
            const position = parallaxElements[i].getBoundingClientRect().top;
            const scrollPosition = window.scrollY;
            
            if (position < window.innerHeight && position > -parallaxElements[i].offsetHeight) {
                parallaxElements[i].style.transform = `translateY(${(position / 10)}px)`;
            }
        }
    });

    // Menu Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = `${button.dataset.tab}-tab`;
            document.getElementById(tabId).classList.add('active');
            
            // Load menu items if they don't exist yet
            if (button.dataset.tab !== 'coffee' && !document.getElementById(tabId).innerHTML.trim()) {
                loadMenuItems(button.dataset.tab, tabId);
            }
        });
    });

    // Load Menu Items Function
    function loadMenuItems(category, tabId) {
        const menuData = {
            espresso: [
                { name: 'Espresso', description: 'Pure and intense coffee experience', price: '$3.50' },
                { name: 'Americano', description: 'Espresso diluted with hot water', price: '$4.00' },
                { name: 'Cappuccino', description: 'Equal parts espresso, steamed milk, and foam', price: '$4.75' }
            ],
            specialty: [
                { name: 'Caramel Macchiato', description: 'Espresso with vanilla and caramel', price: '$5.50' },
                { name: 'Mocha', description: 'Espresso with chocolate and steamed milk', price: '$5.25' },
                { name: 'Affogato', description: 'Espresso poured over vanilla ice cream', price: '$6.00' }
            ],
            food: [
                { name: 'Avocado Toast', description: 'Sourdough bread with avocado and toppings', price: '$8.50' },
                { name: 'Croissant', description: 'Buttery, flaky pastry', price: '$3.75' },
                { name: 'Blueberry Muffin', description: 'Freshly baked with organic blueberries', price: '$4.25' }
            ]
        };
        
        const tabContent = document.getElementById(tabId);
        let html = '';
        
        menuData[category].forEach((item, index) => {
            html += `
                <div class="menu-item fade-in" style="animation-delay: ${index * 0.2}s">
                    <div class="menu-item-info">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                    <span class="menu-item-price">${item.price}</span>
                </div>
            `;
        });
        
        tabContent.innerHTML = html;
        
        // Trigger animation for newly added items
        setTimeout(() => {
            tabContent.querySelectorAll('.fade-in').forEach(item => {
                item.classList.add('visible');
            });
        }, 100);
    }

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentSlide = index;
    }
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    });
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto slide testimonials
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);

    // Product Carousel
    const productCarousel = document.querySelector('.product-carousel');
    const productCards = document.querySelectorAll('.product-card');
    const carouselDots = document.querySelectorAll('.carousel-dots .dot');
    const carouselPrev = document.querySelector('.prev-btn');
    const carouselNext = document.querySelector('.next-btn');
    let currentCard = 0;
    
    function showCard(index) {
        if (window.innerWidth <= 768) {
            productCarousel.style.transform = `translateX(-${index * 100}%)`;
        } else if (window.innerWidth <= 1024) {
            productCarousel.style.transform = `translateX(-${index * 50}%)`;
        } else {
            productCarousel.style.transform = `translateX(-${index * 33.333}%)`;
        }
        
        carouselDots.forEach(dot => dot.classList.remove('active'));
        carouselDots[index].classList.add('active');
        currentCard = index;
    }
    
    carouselPrev.addEventListener('click', () => {
        currentCard = (currentCard - 1 + carouselDots.length) % carouselDots.length;
        showCard(currentCard);
    });
    
    carouselNext.addEventListener('click', () => {
        currentCard = (currentCard + 1) % carouselDots.length;
        showCard(currentCard);
    });
    
    carouselDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showCard(index);
        });
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    const formSuccess = document.querySelector('.form-success');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value) {
            // Show success message
            formSuccess.style.display = 'block';
            emailInput.value = '';
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 3000);
        }
    });

    // Shopping Cart Functionality
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCart = document.querySelector('.close-cart');
    const continueShopping = document.querySelector('.continue-shopping');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const totalAmount = document.querySelector('.total-amount');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    let cart = [];
    
    // Open Cart
    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    // Close Cart
    function closeCartFunc() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
        document.body.style.overflow = 'visible';
    }
    
    cartIcon.addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartFunc);
    cartOverlay.addEventListener('click', closeCartFunc);
    continueShopping.addEventListener('click', closeCartFunc);
    
    // Add to Cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.product-card');
            const title = card.querySelector('h3').textContent;
            const price = parseFloat(card.dataset.price);
            const image = card.querySelector('img').src;
            
            // Check if item already in cart
            const existingItem = cart.find(item => item.title === title);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    title,
                    price,
                    image,
                    quantity: 1
                });
            }
            
            updateCart();
            openCart();
            
            // Add animation to cart icon
            cartIcon.classList.add('bounce');
            setTimeout(() => {
                cartIcon.classList.remove('bounce');
            }, 500);
        });
    });
    
    // Update Cart
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    <p>Your cart is empty</p>
                    <button class="btn secondary continue-shopping">Continue Shopping</button>
                </div>
            `;
            
            document.querySelector('.continue-shopping').addEventListener('click', closeCartFunc);
        } else {
            let html = '';
            
            cart.forEach((item, index) => {
                html += `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.title}">
                        </div>
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.title}</h4>
                            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn decrease" data-index="${index}">-</button>
                                <span class="quantity-value">${item.quantity}</span>
                                <button class="quantity-btn increase" data-index="${index}">+</button>
                            </div>
                            <button class="remove-item" data-index="${index}">Remove</button>
                        </div>
                    </div>
                `;
            });
            
            cartItems.innerHTML = html;
            
            // Add event listeners to quantity buttons
            document.querySelectorAll('.decrease').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                    } else {
                        cart.splice(index, 1);
                    }
                    updateCart();
                });
            });
            
            document.querySelectorAll('.increase').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    cart[index].quantity++;
                    updateCart();
                });
            });
            
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    cart.splice(index, 1);
                    updateCart();
                });
            });
        }
        
        // Update total amount
        const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Thank you for your order! This is where the checkout process would begin.');
            cart = [];
            updateCart();
            closeCartFunc();
        }
    });

    // Animate hero elements on page load
    function animateHeroElements() {
        const heroElements = document.querySelectorAll('.hero .reveal-text');
        heroElements.forEach(element => {
            element.classList.add('visible');
        });
    }

    // Intersection Observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.reveal-text, .fade-in').forEach(element => {
            observer.observe(element);
        });
    }

    // Add smooth hover effect to all buttons
    const allButtons = document.querySelectorAll('button, .btn');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });

    // Add animation class to cart icon
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .bounce {
                animation: bounce 0.5s;
            }
        </style>
    `);

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});