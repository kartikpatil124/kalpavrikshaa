// ==========================================================================
// ForexPro Academy — Main JavaScript Engine & Component Controller
// ==========================================================================

// Global Toast Notification Utility
window.showToast = function(message, type = 'success', duration = 4000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    
    const iconClass = type === 'success' ? 'fa-check-circle' : (type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle');
    toast.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 350);
    }, duration);
};

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link, .nav-cta');
    const backToTopBtn = document.querySelector('.back-to-top');
    const header = document.querySelector('.header');
    const contactForm = document.getElementById('contactForm');
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    // 1. Mobile Menu Toggle & Accessibility
    if (mobileMenuBtn && navLinks) {
        const toggleMenu = (open) => {
            const isOpen = typeof open === 'boolean' ? open : !mobileMenuBtn.classList.contains('active');
            mobileMenuBtn.classList.toggle('active', isOpen);
            navLinks.classList.toggle('active', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('menu-open', isOpen);
        };

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu on link click
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu(false);
                }
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu(false);
                mobileMenuBtn.focus();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    // 2. Sticky Header on Scroll
    if (header) {
        const handleScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 25);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // 3. Back to Top Button
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 350) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Smooth Anchor Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = (header ? header.offsetHeight : 75) + 15;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Contact Form Submission with Validation & Toast
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('#name');
            const emailInput = this.querySelector('#email');
            const messageInput = this.querySelector('#message');

            if (!nameInput || !emailInput || !nameInput.value.trim() || !emailInput.value.trim()) {
                window.showToast('Please fill in all required fields.', 'error');
                return;
            }

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            setTimeout(() => {
                window.showToast(`Thank you, ${nameInput.value.trim()}! Your message has been received. Our team will contact you shortly.`, 'success', 5000);
                this.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            }, 800);
        });
    }

    // 6. Newsletter Subscription Handler
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                window.showToast('Thank you for subscribing to ForexPro Academy updates!', 'success');
                emailInput.value = '';
            } else {
                window.showToast('Please enter a valid email address.', 'error');
            }
        });
    });

    // 7. Policy and Help links notification helper
    document.querySelectorAll('.footer-links a[href="#"], .contact-social a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const label = link.textContent.trim() || 'This link';
            window.showToast(`${label} page is currently in demo mode.`, 'info');
        });
    });

    // 8. Testimonials Glide Slider Initialization
    if (document.querySelector('.testimonials-slider') && typeof Glide !== 'undefined') {
        try {
            new Glide('.testimonials-slider', {
                type: 'carousel',
                perView: 1,
                autoplay: 4500,
                hoverpause: true,
                gap: 30,
                swipeThreshold: 30,
                dragThreshold: 30
            }).mount();
        } catch (err) {
            console.warn('Glide initialization notice:', err);
        }
    }
});

// 9. Animated Counter Engine
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const duration = 1500; // ms
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        if (!target) return;
        
        const startTime = performance.now();
        const startVal = 0;
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quad
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const currentVal = Math.floor(easeProgress * target);
            
            const suffix = target >= 1000 ? '+' : (target <= 100 && target > 50 ? '%' : '+');
            counter.textContent = currentVal.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = target.toLocaleString() + suffix;
            }
        };
        
        requestAnimationFrame(update);
    });
}

// Counter Intersection Observer
const counterSection = document.querySelector('.hero-stats, .stats-grid');
if (counterSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(counterSection);
} else if (counterSection) {
    animateCounters();
}

// 10. Preloader Handler
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 200);
    }
});

// 11. AOS Animation Initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 650,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
}