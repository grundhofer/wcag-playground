// TechFlow Digital - Main JavaScript

// Smooth scrolling for CTA button
function scrollToServices() {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Newsletter subscription (auto-submit issue)
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Issue: No validation or confirmation
    alert('Subscribed successfully!');
    event.target.querySelector('input[type="email"]').value = '';
}

// Social media links (onclick without keyboard support)
function openSocial(platform) {
    const urls = {
        twitter: 'https://twitter.com/techflow',
        linkedin: 'https://linkedin.com/company/techflow',
        github: 'https://github.com/techflow'
    };
    window.open(urls[platform], '_blank');
}

// Testimonial slider with auto-advance (timing issue)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-advance testimonials every 4 seconds (no pause control)
setInterval(nextTestimonial, 4000);

// Mobile menu toggle (missing ARIA)
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('mobile-open');
}

// Form validation without proper error announcements
function validateContactForm(formElement) {
    let isValid = true;
    const inputs = formElement.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            // Issue: Error not properly announced to screen readers
            input.style.borderColor = '#e74c3c';
            input.parentElement.style.backgroundColor = '#ffebee';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
            input.parentElement.style.backgroundColor = 'transparent';
        }
    });
    
    return isValid;
}

// Modal functionality with focus management issues
let activeModal = null;

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        activeModal = modal;
        // Issue: No focus management or keyboard trap
        // Issue: No ARIA attributes set
    }
}

function closeModal(modalId = null) {
    const modal = modalId ? document.getElementById(modalId) : activeModal;
    if (modal) {
        modal.style.display = 'none';
        activeModal = null;
        // Issue: Focus not returned to triggering element
    }
}

// Close modal on outside click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
});

// Project portfolio filtering (keyboard accessibility issues)
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-item');
    
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = 'flex';
        } else {
            project.style.display = 'none';
        }
    });
    
    // Issue: Filter state not announced to screen readers
    console.log(`Showing ${category} projects`);
}

// Search functionality (issues with live region updates)
function searchContent(query) {
    const results = document.getElementById('searchResults');
    
    if (query.length < 3) {
        results.innerHTML = '';
        return;
    }
    
    // Simulated search
    const mockResults = [
        'Web Development Services',
        'Mobile App Development',
        'Digital Strategy Consulting',
        'Portfolio Case Studies'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));
    
    // Issue: Results not announced to screen readers
    results.innerHTML = mockResults.map(result => 
        `<div onclick="selectResult('${result}')" style="cursor: pointer; padding: 8px; border-bottom: 1px solid #eee;">${result}</div>`
    ).join('');
}

function selectResult(result) {
    document.getElementById('searchInput').value = result;
    document.getElementById('searchResults').innerHTML = '';
}

// Custom dropdown implementation (missing ARIA)
function toggleDropdown(element) {
    const dropdown = element.nextElementSibling;
    const isOpen = dropdown.style.display === 'block';
    
    // Close all dropdowns first
    document.querySelectorAll('.dropdown-content').forEach(d => {
        d.style.display = 'none';
    });
    
    if (!isOpen) {
        dropdown.style.display = 'block';
    }
    
    // Issue: State not communicated to assistive technology
    // Issue: No keyboard navigation support
}

// Live chat widget (auto-popup timing issue)
function initializeLiveChat() {
    setTimeout(() => {
        const chatWidget = document.createElement('div');
        chatWidget.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; background: #3498db; color: white; padding: 15px; border-radius: 8px; cursor: pointer; z-index: 1000;" onclick="openChat()">
                💬 Need help? Chat with us!
            </div>
        `;
        document.body.appendChild(chatWidget);
    }, 5000); // Auto-appears after 5 seconds without user control
}

function openChat() {
    // Issue: Chat opens without proper focus management
    alert('Chat feature would open here');
}

// Cookie banner (timing and control issues)
function showCookieBanner() {
    if (!localStorage.getItem('cookies-accepted')) {
        setTimeout(() => {
            const banner = document.createElement('div');
            banner.innerHTML = `
                <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #2c3e50; color: white; padding: 20px; z-index: 2000;">
                    <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                    <button onclick="acceptCookies()" style="margin-left: 15px; background: #3498db; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Accept</button>
                </div>
            `;
            document.body.appendChild(banner);
        }, 3000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookies-accepted', 'true');
    const banner = event.target.closest('div');
    banner.remove();
}

// Auto-updating content (no pause mechanism)
function startLiveUpdates() {
    const updateElement = document.getElementById('liveUpdates');
    if (!updateElement) return;
    
    let counter = 0;
    setInterval(() => {
        counter++;
        // Issue: Updates not announced to screen readers
        updateElement.textContent = `Live data updated ${counter} times`;
    }, 3000);
}

// Drag and drop functionality (no keyboard alternative)
function initDragAndDrop() {
    const draggables = document.querySelectorAll('[draggable="true"]');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        // Issue: No keyboard equivalent provided
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    if (draggedElement && this !== draggedElement) {
        this.appendChild(draggedElement);
    }
}

// Form auto-advance (context change on input)
function setupFormAutoAdvance() {
    const inputs = document.querySelectorAll('.auto-advance');
    
    inputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            if (this.value.length === this.maxLength) {
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    // Issue: Unexpected context change
                    nextInput.focus();
                }
            }
        });
    });
}

// Notification system (poor timing and dismissal)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px;
        border-radius: 4px;
        z-index: 1000;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Issue: Auto-dismisses too quickly, no user control
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Initialize all functionality when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeLiveChat();
    showCookieBanner();
    initDragAndDrop();
    setupFormAutoAdvance();
    startLiveUpdates();
    
    // Add click handlers to elements that should have been buttons
    document.querySelectorAll('[onclick]').forEach(element => {
        if (element.tagName !== 'BUTTON' && element.tagName !== 'A') {
            // Issue: Interactive elements not properly implemented
            element.style.cursor = 'pointer';
        }
    });
    
    // Remove focus indicators globally (accessibility issue)
    const style = document.createElement('style');
    style.textContent = `
        *:focus {
            outline: none !important;
        }
    `;
    document.head.appendChild(style);
});

// Session timeout (no warning or user control)
setTimeout(() => {
    // Issue: Timeout without warning
    alert('Your session has expired. Please refresh the page.');
    window.location.reload();
}, 1800000); // 30 minutes

// Performance monitoring (flashing content)
function startPerformanceMonitoring() {
    setInterval(() => {
        const perfIndicator = document.querySelector('.perf-indicator');
        if (perfIndicator) {
            // Issue: Rapidly flashing content
            perfIndicator.style.opacity = perfIndicator.style.opacity === '0' ? '1' : '0';
        }
    }, 100);
}

// Error handling without proper user feedback
window.addEventListener('error', function(event) {
    // Issue: Errors not properly communicated to users
    console.error('An error occurred:', event.error);
});

// Utility functions for realistic business functionality
const TechFlow = {
    // Contact form submission
    submitContactForm: function(form) {
        if (validateContactForm(form)) {
            // Issue: Success state not announced
            showNotification('Message sent successfully!', 'success');
            form.reset();
        } else {
            // Issue: Error state not properly communicated
            showNotification('Please fill in all required fields.', 'error');
        }
        return false; // Prevent actual form submission
    },
    
    // Project inquiry
    requestQuote: function(service) {
        const modal = document.getElementById('quoteModal');
        if (modal) {
            openModal('quoteModal');
            // Pre-populate service field without announcement
            const serviceField = modal.querySelector('select[name="service"]');
            if (serviceField) {
                serviceField.value = service;
            }
        }
    },
    
    // Newsletter signup
    subscribeNewsletter: function(email) {
        if (email && email.includes('@')) {
            showNotification('Thank you for subscribing!', 'success');
            return true;
        } else {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }
    }
};

// Expose global functions for inline event handlers
window.scrollToServices = scrollToServices;
window.subscribeNewsletter = subscribeNewsletter;
window.openSocial = openSocial;
window.toggleMobileMenu = toggleMobileMenu;
window.openModal = openModal;
window.closeModal = closeModal;
window.filterProjects = filterProjects;
window.searchContent = searchContent;
window.selectResult = selectResult;
window.toggleDropdown = toggleDropdown;
window.openChat = openChat;
window.acceptCookies = acceptCookies;
window.TechFlow = TechFlow;