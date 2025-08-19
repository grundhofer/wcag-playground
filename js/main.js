


const GreenLeaf = {
    
    cart: JSON.parse(localStorage.getItem('greenleaf-cart')) || [],
    
    
    preferences: JSON.parse(localStorage.getItem('greenleaf-preferences')) || {
        language: 'de',
        currency: 'EUR',
        reducedMotion: false
    },
    
    
    currentLanguage: 'de',
    
    
    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.updateCartBadge();
        this.initLanguage();
    },
    
    
    setupEventListeners() {
        
        document.addEventListener('submit', this.handleFormSubmit.bind(this));
        
        
        document.addEventListener('click', this.handleClick.bind(this));
        
        
        document.addEventListener('keydown', this.handleKeydown.bind(this));
        
        
        document.addEventListener('focusin', this.handleFocusIn.bind(this));
        document.addEventListener('focusout', this.handleFocusOut.bind(this));
    },
    
    
    initializeComponents() {
        this.initDropdowns();
        this.initModals();
        this.initCarousels();
        this.initTabs();
        this.initAccordions();
        this.initTooltips();
    },
    
    
    handleFormSubmit(event) {
        const form = event.target;
        
        
        if (form.classList.contains('newsletter-form')) {
            event.preventDefault();
            this.handleNewsletterSignup(form);
        }
        
        
        if (form.classList.contains('contact-form')) {
            event.preventDefault();
            this.handleContactSubmission(form);
        }
        
        
        if (form.classList.contains('search-form')) {
            event.preventDefault();
            this.handleSearch(form);
        }
    },
    
    
    handleClick(event) {
        const target = event.target;
        
        
        if (target.tagName === 'A' && this.isDemoLink(target.href)) {
            event.preventDefault();
            this.showDemoDialog();
            return;
        }
        
        
        if (target.classList.contains('add-to-cart')) {
            event.preventDefault();
            this.addToCart(target.dataset.productId);
        }
        
        
        if (target.classList.contains('qty-btn')) {
            event.preventDefault();
            this.handleQuantityChange(target);
        }
        
        
        if (target.classList.contains('filter-btn')) {
            event.preventDefault();
            this.handleFilterChange(target);
        }
        
        
        if (target.id === 'apply-filters') {
            event.preventDefault();
            this.applyProductFilters();
        }
        
        
        if (target.classList.contains('mobile-menu-toggle')) {
            event.preventDefault();
            this.toggleMobileMenu();
        }
        
        
        if (target.classList.contains('language-btn')) {
            event.preventDefault();
            this.switchLanguage(target.dataset.lang);
        }
    },
    
    
    handleKeydown(event) {
        
        if (event.key === 'Escape') {
            this.closeActiveModal();
            this.closeActiveDropdown();
        }
        
        
        if (event.target.closest('.carousel')) {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                this.handleCarouselNavigation(event);
            }
        }
    },
    
    
    handleFocusIn(event) {
        
        event.target.classList.add('focused');
    },
    
    handleFocusOut(event) {
        
        event.target.classList.remove('focused');
    },
    
    
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
    
    
    handleNewsletterSignup(form) {
        const email = form.querySelector('input[type="email"]').value;
        const formData = new FormData(form);
        
        
        setTimeout(() => {
            this.showNotification('Vielen Dank für Ihr Abonnement!', 'success');
            form.reset();
        }, 1000);
    },
    
    
    handleContactSubmission(form) {
        const formData = new FormData(form);
        
        
        if (!this.validateForm(form)) {
            this.showNotification('Bitte füllen Sie alle Pflichtfelder aus', 'error');
            return;
        }
        
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Wird gesendet...';
        submitBtn.disabled = true;
        
        
        setTimeout(() => {
            this.showNotification('Nachricht erfolgreich gesendet!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    },
    
    
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
    
    
    handleSearch(form) {
        const query = form.querySelector('input[name="q"]').value;
        if (query.trim()) {
            
            window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
        }
    },
    
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Benachrichtigung schließen">&times;</button>
        `;
        
        
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(notification);
        
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
        
        
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    },
    
    
    initModals() {
        const modalTriggers = document.querySelectorAll('[data-modal]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.dataset.modal;
                this.openModal(modalId);
            });
        });
        
        
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
    
    
    initDropdowns() {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleDropdown(toggle);
            });
        });
        
        
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
        
        
        showSlide(0);
        
        
        if (isPlaying) {
            startAutoplay();
        }
    },
    
    
    initTabs() {
        const tabContainers = document.querySelectorAll('.tab-container');
        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll('.tab-button');
            const panels = container.querySelectorAll('.tab-panel');
            
            tabs.forEach((tab, index) => {
                tab.addEventListener('click', () => {
                    
                    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
                    tab.setAttribute('aria-selected', 'true');
                    
                    
                    panels.forEach(panel => panel.style.display = 'none');
                    if (panels[index]) {
                        panels[index].style.display = 'block';
                    }
                });
            });
        });
    },
    
    
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
    
    
    applyProductFilters() {
        const category = document.getElementById('category-filter')?.value || 'all';
        const priceRange = document.getElementById('price-range')?.value || 'all';
        const sortBy = document.getElementById('sort-by')?.value || 'featured';
        
        
        let filterMessage = 'Filter angewendet: ';
        const filters = [];
        
        if (category !== 'all') {
            const categoryNames = {
                'furniture': 'Möbel',
                'supplies': 'Material', 
                'technology': 'Technologie'
            };
            filters.push(`Kategorie: ${categoryNames[category] || category}`);
        }
        
        if (priceRange !== 'all') {
            const priceNames = {
                '0-50': 'Unter €50',
                '50-150': '€50 - €150',
                '150-300': '€150 - €300',
                '300+': 'Über €300'
            };
            filters.push(`Preis: ${priceNames[priceRange] || priceRange}`);
        }
        
        if (sortBy !== 'featured') {
            const sortNames = {
                'price-low': 'Preis: Niedrig zu Hoch',
                'price-high': 'Preis: Hoch zu Niedrig',
                'newest': 'Neueste zuerst'
            };
            filters.push(`Sortierung: ${sortNames[sortBy] || sortBy}`);
        }
        
        if (filters.length === 0) {
            filterMessage += 'Alle Filter zurückgesetzt';
        } else {
            filterMessage += filters.join(', ');
        }
        
        this.showNotification(filterMessage, 'info');
        
        
        
    },
    
    
    isDemoLink(href) {
        const demoPatterns = [
            '/products/',
            '/services/',
            '/resources/',
            '/account/',
            'products/',
            'services/',
            'resources/',
            'account/',
            'privacy.html',
            'terms.html',
            'accessibility.html'
        ];
        
        return demoPatterns.some(pattern => href.includes(pattern));
    },
    
    
    showDemoDialog() {
        const dialog = document.createElement('div');
        dialog.className = 'demo-dialog';
        dialog.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 8px;
            max-width: 500px;
            margin: 1rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        `;
        
        content.innerHTML = `
            <h3 style="margin-top: 0; color: var(--primary-green);">🧪 Demo-Seite</h3>
            <p>Diese Seite existiert nur zu Testzwecken und ist nicht implementiert.</p>
            <p>Dies ist ein WCAG 2.2 Testing Playground zur Demonstration von Barrierefreiheitsproblemen.</p>
            <button class="btn btn-primary" onclick="this.closest('.demo-dialog').remove()" style="margin-top: 1rem;">Verstanden</button>
        `;
        
        dialog.appendChild(content);
        document.body.appendChild(dialog);
        
        
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                dialog.remove();
            }
        });
        
        
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                dialog.remove();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    },
    
    
    initLanguage() {
        
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
        
        
        const placeholderElements = document.querySelectorAll('[data-en-placeholder], [data-de-placeholder]');
        placeholderElements.forEach(element => {
            const placeholder = element.getAttribute(`data-${this.currentLanguage}-placeholder`);
            if (placeholder) {
                element.placeholder = placeholder;
            }
        });
        
        
        document.documentElement.lang = this.currentLanguage;
    },
    
    updateLanguageButtons() {
        const languageButtons = document.querySelectorAll('.language-btn');
        languageButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
        });
    }
};


document.addEventListener('DOMContentLoaded', () => {
    GreenLeaf.init();
});


window.GreenLeaf = GreenLeaf;