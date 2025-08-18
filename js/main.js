// GreenLeaf Office Solutions - Main JavaScript

// Global utilities and state management
const GreenLeaf = {
    // Shopping cart state
    cart: JSON.parse(localStorage.getItem('greenleaf-cart')) || [],
    
    // User preferences
    preferences: JSON.parse(localStorage.getItem('greenleaf-preferences')) || {
        language: 'de',
        currency: 'EUR',
        reducedMotion: false
    },
    
    // Current language
    currentLanguage: 'de',
    
    // Initialize the application
    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.updateCartBadge();
        this.initLanguage();
    },
    
    // Set up global event listeners
    setupEventListeners() {
        // Handle form submissions
        document.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        // Handle clicks
        document.addEventListener('click', this.handleClick.bind(this));
        
        // Handle keyboard navigation
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        // Handle focus management
        document.addEventListener('focusin', this.handleFocusIn.bind(this));
        document.addEventListener('focusout', this.handleFocusOut.bind(this));
    },
    
    // Initialize components
    initializeComponents() {
        this.initDropdowns();
        this.initModals();
        this.initCarousels();
        this.initTabs();
        this.initAccordions();
        this.initTooltips();
    },
    
    // Handle form submissions
    handleFormSubmit(event) {
        const form = event.target;
        
        // Newsletter signup
        if (form.classList.contains('newsletter-form')) {
            event.preventDefault();
            this.handleNewsletterSignup(form);
        }
        
        // Contact form
        if (form.classList.contains('contact-form')) {
            event.preventDefault();
            this.handleContactSubmission(form);
        }
        
        // Search form
        if (form.classList.contains('search-form')) {
            event.preventDefault();
            this.handleSearch(form);
        }
    },
    
    // Handle clicks
    handleClick(event) {
        const target = event.target;
        
        // Add to cart buttons
        if (target.classList.contains('add-to-cart')) {
            event.preventDefault();
            this.addToCart(target.dataset.productId);
        }
        
        // Quantity selectors
        if (target.classList.contains('qty-btn')) {
            event.preventDefault();
            this.handleQuantityChange(target);
        }
        
        // Filter buttons
        if (target.classList.contains('filter-btn')) {
            event.preventDefault();
            this.handleFilterChange(target);
        }
        
        // Mobile menu toggle
        if (target.classList.contains('mobile-menu-toggle')) {
            event.preventDefault();
            this.toggleMobileMenu();
        }
        
        // Language switcher
        if (target.classList.contains('language-btn')) {
            event.preventDefault();
            this.switchLanguage(target.dataset.lang);
        }
    },
    
    // Handle keyboard navigation
    handleKeydown(event) {
        // Escape key to close modals/overlays
        if (event.key === 'Escape') {
            this.closeActiveModal();
            this.closeActiveDropdown();
        }
        
        // Arrow key navigation for carousels
        if (event.target.closest('.carousel')) {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                this.handleCarouselNavigation(event);
            }
        }
    },
    
    // Handle focus events
    handleFocusIn(event) {
        // Add focus class for styling
        event.target.classList.add('focused');
    },
    
    handleFocusOut(event) {
        // Remove focus class
        event.target.classList.remove('focused');
    },
    
    // Shopping cart functionality
    addToCart(productId, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: productId,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        this.saveCart();
        this.updateCartBadge();
        this.showNotification('Produkt zum Warenkorb hinzugefügt', 'success');
    },
    
    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartBadge();
        this.showNotification('Produkt aus Warenkorb entfernt', 'info');
    },
    
    updateCartBadge() {
        const badge = document.querySelector('.cart-badge');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (badge) {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'inline' : 'none';
        }
    },
    
    saveCart() {
        localStorage.setItem('greenleaf-cart', JSON.stringify(this.cart));
    },
    
    // Newsletter signup
    handleNewsletterSignup(form) {
        const email = form.querySelector('input[type="email"]').value;
        const formData = new FormData(form);
        
        // Simulate API call
        setTimeout(() => {
            this.showNotification('Vielen Dank für Ihr Abonnement!', 'success');
            form.reset();
        }, 1000);
    },
    
    // Contact form submission
    handleContactSubmission(form) {
        const formData = new FormData(form);
        
        // Basic validation
        if (!this.validateForm(form)) {
            this.showNotification('Bitte füllen Sie alle Pflichtfelder aus', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Wird gesendet...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            this.showNotification('Nachricht erfolgreich gesendet!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    },
    
    // Form validation
    validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });
        
        return isValid;
    },
    
    // Search functionality
    handleSearch(form) {
        const query = form.querySelector('input[name="q"]').value;
        if (query.trim()) {
            // Redirect to search results
            window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
        }
    },
    
    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Benachrichtigung schließen">&times;</button>
        `;
        
        // Add to container
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        // Handle close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    },
    
    // Modal functionality
    initModals() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.dataset.modal;
                this.openModal(modalId);
            });
        });
        
        // Close modals on backdrop click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                this.closeActiveModal();
            }
        });
    },
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            modal.setAttribute('aria-hidden', 'false');
            
            // Focus first focusable element
            const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable) {
                focusable.focus();
            }
        }
    },
    
    closeActiveModal() {
        const activeModal = document.querySelector('.modal[style*="block"]');
        if (activeModal) {
            activeModal.style.display = 'none';
            activeModal.setAttribute('aria-hidden', 'true');
        }
    },
    
    // Dropdown functionality
    initDropdowns() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown(toggle);
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            this.closeAllDropdowns();
        });
    },
    
    toggleDropdown(toggle) {
        const dropdown = toggle.nextElementSibling;
        const isOpen = dropdown.style.display === 'block';
        
        this.closeAllDropdowns();
        
        if (!isOpen) {
            dropdown.style.display = 'block';
            toggle.setAttribute('aria-expanded', 'true');
        }
    },
    
    closeAllDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            dropdown.style.display = 'none';
            const toggle = dropdown.previousElementSibling;
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    },
    
    closeActiveDropdown() {
        this.closeAllDropdowns();
    },
    
    // Carousel functionality
    initCarousels() {
        const carousels = document.querySelectorAll('.carousel');
        carousels.forEach(carousel => {
            this.setupCarousel(carousel);
        });
    },
    
    setupCarousel(carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const pauseBtn = carousel.querySelector('.carousel-pause');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        
        let currentSlide = 0;
        let autoplayInterval = null;
        let isPlaying = carousel.dataset.autoplay === 'true';
        
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
                slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
            });
            
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        };
        
        const startAutoplay = () => {
            if (autoplayInterval) clearInterval(autoplayInterval);
            autoplayInterval = setInterval(() => {
                const newIndex = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
                showSlide(newIndex);
            }, 5000);
        };
        
        const stopAutoplay = () => {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        };
        
        const toggleAutoplay = () => {
            if (isPlaying) {
                stopAutoplay();
                pauseBtn.textContent = '▶';
                pauseBtn.setAttribute('aria-label', 'Karussell abspielen');
                isPlaying = false;
            } else {
                startAutoplay();
                pauseBtn.textContent = '⏸';
                pauseBtn.setAttribute('aria-label', 'Karussell pausieren');
                isPlaying = true;
            }
        };
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                const newIndex = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
                showSlide(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const newIndex = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
                showSlide(newIndex);
            });
        }
        
        if (pauseBtn) {
            pauseBtn.addEventListener('click', toggleAutoplay);
        }
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Initialize first slide
        showSlide(0);
        
        // Start autoplay if enabled
        if (isPlaying) {
            startAutoplay();
        }
    },
    
    // Tab functionality
    initTabs() {
        const tabContainers = document.querySelectorAll('.tab-container');
        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll('.tab-button');
            const panels = container.querySelectorAll('.tab-panel');
            
            tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    // Update tabs
                    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
                    tab.setAttribute('aria-selected', 'true');
                    
                    // Update panels
                    panels.forEach(panel => panel.style.display = 'none');
                    if (panels[index]) {
                        panels[index].style.display = 'block';
                    }
                });
            });
        });
    },
    
    // Accordion functionality
    initAccordions() {
        const accordionButtons = document.querySelectorAll('.accordion-button');
        accordionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const isExpanded = button.getAttribute('aria-expanded') === 'true';
                const panel = document.getElementById(button.getAttribute('aria-controls'));
                
                button.setAttribute('aria-expanded', !isExpanded);
                if (panel) {
                    panel.style.display = isExpanded ? 'none' : 'block';
                }
            });
        });
    },
    
    // Tooltip functionality
    initTooltips() {
        const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
        tooltipTriggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', () => {
                this.showTooltip(trigger);
            });
            
            trigger.addEventListener('mouseleave', () => {
                this.hideTooltip(trigger);
            });
            
            trigger.addEventListener('focus', () => {
                this.showTooltip(trigger);
            });
            
            trigger.addEventListener('blur', () => {
                this.hideTooltip(trigger);
            });
        });
    },
    
    showTooltip(trigger) {
        const text = trigger.dataset.tooltip;
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.id = 'tooltip-' + Date.now();
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = trigger.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
        
        trigger.setAttribute('aria-describedby', tooltip.id);
    },
    
    hideTooltip(trigger) {
        const tooltipId = trigger.getAttribute('aria-describedby');
        if (tooltipId) {
            const tooltip = document.getElementById(tooltipId);
            if (tooltip) {
                tooltip.remove();
            }
            trigger.removeAttribute('aria-describedby');
        }
    },
    
    // Language functionality
    initLanguage() {
        // Load saved language preference
        this.currentLanguage = this.preferences.language || 'en';
        this.updateLanguageDisplay();
        this.updateLanguageButtons();
    },
    
    switchLanguage(lang) {
        this.currentLanguage = lang;
        this.preferences.language = lang;
        localStorage.setItem('greenleaf-preferences', JSON.stringify(this.preferences));
        
        this.updateLanguageDisplay();
        this.updateLanguageButtons();
        this.showNotification(`Sprache zu ${lang.toUpperCase()} gewechselt`, 'info');
    },
    
    updateLanguageDisplay() {
        const elements = document.querySelectorAll('[data-en], [data-de]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLanguage}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update placeholders
        const placeholderElements = document.querySelectorAll('[data-en-placeholder], [data-de-placeholder]');
        placeholderElements.forEach(element => {
            const placeholder = element.getAttribute(`data-${this.currentLanguage}-placeholder`);
            if (placeholder) {
                element.placeholder = placeholder;
            }
        });
        
        // Update document language
        document.documentElement.lang = this.currentLanguage;
    },
    
    updateLanguageButtons() {
        const languageButtons = document.querySelectorAll('.language-btn');
        languageButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
        });
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    GreenLeaf.init();
});

// Export for global access
window.GreenLeaf = GreenLeaf;