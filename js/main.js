// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileDrawer = document.querySelector('.mobile-nav-drawer');
const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
const mobileCloseBtn = document.querySelector('.mobile-close-btn');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const navLinksItems = document.querySelectorAll('.nav-link');
const backToTopBtn = document.querySelector('.back-to-top');
const preloader = document.querySelector('.preloader');
const contactForm = document.getElementById('contactForm');

// Mobile Drawer Controls
function openMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('active');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.classList.add('menu-open');

    // Stagger animation for mobile nav links if GSAP exists
    if (window.gsap) {
        gsap.fromTo('.mobile-nav-link', 
            { x: 25, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
        );
    }
}

function closeMobileMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('active');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    if (mobileMenuBtn) {
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('menu-open');
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileDrawer && mobileDrawer.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
}

if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
}

// Close drawer on link click or Escape key
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Auto-highlight active link based on current page pathname
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const cleanHref = href.replace('./', '').split('#')[0];
            if (cleanHref === currentPath || (currentPath === '' && cleanHref === 'index.html')) {
                link.classList.add('active');
            } else if (!href.startsWith('#')) {
                link.classList.remove('active');
            }
        }
    });
}
setActiveNavLink();

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Initialize Counter when scrolled to it
const counterSection = document.querySelector('.hero-stats');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (counterSection) {
    observer.observe(counterSection);
}

// Testimonials Slider
let testimonialSlider;
function initTestimonialSlider() {
    testimonialSlider = new Glide('.testimonials-slider', {
        type: 'carousel',
        perView: 1,
        autoplay: 3000,
        hoverpause: true,
        gap: 30,
        breakpoints: {
            768: {
                perView: 1
            }
        }
    }).mount();
}

// Initialize AOS Animation
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formAction = this.getAttribute('action') || '#';
        const formMethod = this.getAttribute('method') || 'POST';
        
        fetch(formAction, {
            method: formMethod,
            body: formData
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem sending your message. Please try again later.');
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonial slider if it exists
    if (document.querySelector('.testimonials-slider')) {
        initTestimonialSlider();
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
    
    // Text reveal animation
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
});