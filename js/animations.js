// Resilient GSAP Animations & Interactions
(function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGSAP = typeof gsap !== 'undefined';
    const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';

    if (hasGSAP && hasScrollTrigger) {
        try {
            gsap.registerPlugin(ScrollTrigger);
        } catch (e) {
            console.warn('ScrollTrigger registration skipped:', e);
        }
    }

    if (!prefersReducedMotion && hasGSAP) {
        // Hero Section Animations
        if (document.querySelector('.hero-title')) {
            gsap.from('.hero-title', {
                duration: 0.9,
                y: 30,
                opacity: 0,
                ease: 'power3.out'
            });
        }

        if (document.querySelector('.hero-subtitle')) {
            gsap.from('.hero-subtitle', {
                duration: 0.9,
                y: 25,
                opacity: 0,
                delay: 0.2,
                ease: 'power3.out'
            });
        }

        if (document.querySelector('.hero-btns')) {
            gsap.from('.hero-btns', {
                duration: 0.9,
                y: 20,
                opacity: 0,
                delay: 0.4,
                ease: 'power3.out'
            });
        }

        if (document.querySelector('.hero-stats')) {
            gsap.from('.hero-stats', {
                duration: 0.9,
                y: 20,
                opacity: 0,
                delay: 0.6,
                ease: 'power3.out'
            });
        }

        // Page Hero Animation
        if (document.querySelector('.page-hero .hero-title')) {
            gsap.from('.page-hero .hero-title', {
                duration: 0.9,
                y: 30,
                opacity: 0,
                ease: 'power3.out'
            });
        }

        if (document.querySelector('.page-hero .hero-subtitle')) {
            gsap.from('.page-hero .hero-subtitle', {
                duration: 0.9,
                y: 25,
                opacity: 0,
                delay: 0.2,
                ease: 'power3.out'
            });
        }
    }

    // Interactive Hover Animations for Desktop (with mouse pointer check)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice && hasGSAP && !prefersReducedMotion) {
        // Feature Boxes
        const featureBoxes = document.querySelectorAll('.feature-box');
        featureBoxes.forEach(box => {
            const wave = box.querySelector('.feature-wave');
            if (wave) {
                box.addEventListener('mouseenter', () => {
                    gsap.to(wave, { duration: 0.4, opacity: 0.3, ease: 'power2.out' });
                });
                box.addEventListener('mouseleave', () => {
                    gsap.to(wave, { duration: 0.4, opacity: 0.1, ease: 'power2.out' });
                });
            }
        });

        // Course Cards
        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { duration: 0.3, y: -6, ease: 'power2.out' });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { duration: 0.3, y: 0, ease: 'power2.out' });
            });
        });

        // Team Member Hover
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach(member => {
            const img = member.querySelector('.member-image img');
            const socials = member.querySelector('.social-links');
            member.addEventListener('mouseenter', () => {
                if (img) gsap.to(img, { duration: 0.4, scale: 1.05, ease: 'power2.out' });
                if (socials) gsap.to(socials, { duration: 0.3, bottom: 0, ease: 'power2.out' });
            });
            member.addEventListener('mouseleave', () => {
                if (img) gsap.to(img, { duration: 0.4, scale: 1, ease: 'power2.out' });
                if (socials) gsap.to(socials, { duration: 0.3, bottom: -50, ease: 'power2.out' });
            });
        });
    }

    // Accordion Functionality (Handles both click and keyboard)
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            if (!content) return;
            const isOpen = btn.classList.contains('active');
            const icon = btn.querySelector('i');

            if (isOpen) {
                btn.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0px';
                if (icon) {
                    icon.classList.remove('fa-minus');
                    icon.classList.add('fa-plus');
                }
            } else {
                btn.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) {
                    icon.classList.remove('fa-plus');
                    icon.classList.add('fa-minus');
                }
            }
        });
    });

    // Tab Animation / Switcher Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            if (!tabId) return;

            const parentContainer = btn.closest('.details-tabs, .feature-tabs') || document;
            const allBtns = parentContainer.querySelectorAll('.tab-btn');
            const allContents = parentContainer.querySelectorAll('.tab-content');
            const targetContent = parentContainer.querySelector(`.tab-content[data-tab="${tabId}"]`);

            allBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            allContents.forEach(c => {
                c.classList.remove('active');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            if (targetContent) {
                targetContent.classList.add('active');
                if (hasGSAP && !prefersReducedMotion) {
                    gsap.fromTo(targetContent, 
                        { opacity: 0, y: 15 },
                        { duration: 0.3, opacity: 1, y: 0, ease: 'power2.out' }
                    );
                }
            }
        });
    });
})();