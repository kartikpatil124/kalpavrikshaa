// DOM Elements and Guards
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link, .nav-cta');
    const backToTopBtn = document.querySelector('.back-to-top');
    const header = document.querySelector('.header');
    const contactForm = document.getElementById('contactForm');

    // Mobile Menu Toggle & Accessibility
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

        // Close mobile menu when clicking any nav item
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

    // Sticky Header on Scroll
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    // Back to Top Button
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
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

    // Smooth Scrolling for Same-Page Anchor Links only
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = (header ? header.offsetHeight : 70) + 10;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Ripple effect on buttons without blocking navigation
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });

    // Testimonials Slider
    if (document.querySelector('.testimonials-slider') && typeof Glide !== 'undefined') {
        try {
            new Glide('.testimonials-slider', {
                type: 'carousel',
                perView: 1,
                autoplay: 4000,
                hoverpause: true,
                gap: 30,
                swipeThreshold: 40,
                dragThreshold: 40,
                breakpoints: {
                    768: {
                        perView: 1,
                        gap: 15
                    }
                }
            }).mount();
        } catch (err) {
            console.warn('Glide slider initialization skipped:', err);
        }
    }

    // Text Reveal Animation
    const textRevealElements = document.querySelectorAll('.text-reveal');
    textRevealElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i] === ' ' ? ' ' : text[i];
            span.style.animationDelay = `${i * 0.05}s`;
            element.appendChild(span);
        }
    });

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Send Message';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }

            setTimeout(() => {
                alert('Thank you for reaching out to ForexPro Academy! We will get back to you shortly.');
                this.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }, 600);
        });
    }
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 120;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        if (!target) return;
        let count = +counter.innerText.replace(/[^0-9]/g, '') || 0;
        const increment = Math.max(1, Math.ceil(target / speed));
        
        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = count.toLocaleString() + (target > 100 ? '+' : (target <= 100 && target > 50 ? '%' : '+'));
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString() + (target > 100 ? '+' : (target <= 100 && target > 50 ? '%' : '+'));
            }
        };
        updateCount();
    });
}

// Initialize Counter Observer
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

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 400);
        }, 300);
    }
});

// Initialize AOS Animation safely
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 700,
        easing: 'ease-in-out',
        once: true,
        offset: 60,
        disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
}