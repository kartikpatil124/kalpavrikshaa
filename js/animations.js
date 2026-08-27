// ==========================================================================
// ForexPro Academy — Animations, Tabs & Accordions Controller
// ==========================================================================

(function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasGSAP = typeof gsap !== 'undefined';

    // 1. GSAP Entrance Animations (when reduced motion is not requested)
    if (!prefersReducedMotion && hasGSAP) {
        if (document.querySelector('.hero-title')) {
            gsap.from('.hero-title', {
                duration: 0.8,
                y: 25,
                opacity: 0,
                ease: 'power3.out'
            });
        }

        if (document.querySelector('.hero-subtitle')) {
            gsap.from('.hero-subtitle', {
                duration: 0.8,
                y: 20,
                opacity: 0,
                delay: 0.15,
                ease: 'power3.out'
            });
        }

        if (document.querySelector('.hero-btns')) {
            gsap.from('.hero-btns', {
                duration: 0.8,
                y: 15,
                opacity: 0,
                delay: 0.3,
                ease: 'power3.out'
            });
        }

        if (document.querySelector('.hero-stats')) {
            gsap.from('.hero-stats', {
                duration: 0.8,
                y: 15,
                opacity: 0,
                delay: 0.45,
                ease: 'power3.out'
            });
        }
    }

    // 2. Universal Tab Controller (with Keyboard Arrow navigation)
    document.addEventListener('DOMContentLoaded', () => {
        const tabContainers = document.querySelectorAll('.details-tabs, .feature-tabs');

        tabContainers.forEach(container => {
            const tabButtons = container.querySelectorAll('.tab-btn');
            const tabContents = container.querySelectorAll('.tab-content');

            tabButtons.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    const targetTabId = btn.getAttribute('data-tab');
                    if (!targetTabId) return;

                    // Update button states
                    tabButtons.forEach(b => {
                        b.classList.remove('active');
                        b.setAttribute('aria-selected', 'false');
                    });
                    btn.classList.add('active');
                    btn.setAttribute('aria-selected', 'true');

                    // Update content panels
                    tabContents.forEach(content => {
                        if (content.getAttribute('data-tab') === targetTabId) {
                            content.classList.add('active');
                        } else {
                            content.classList.remove('active');
                        }
                    });
                });

                // Keyboard arrow navigation
                btn.addEventListener('keydown', (e) => {
                    let nextIndex = null;
                    if (e.key === 'ArrowRight') {
                        nextIndex = (index + 1) % tabButtons.length;
                    } else if (e.key === 'ArrowLeft') {
                        nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                    }

                    if (nextIndex !== null) {
                        e.preventDefault();
                        tabButtons[nextIndex].focus();
                        tabButtons[nextIndex].click();
                    }
                });
            });
        });

        // 3. Dynamic Height FAQ Accordion Controller
        const accordionBtns = document.querySelectorAll('.accordion-btn');

        accordionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const content = btn.nextElementSibling;
                if (!content) return;
                const isOpen = btn.classList.contains('active');
                const icon = btn.querySelector('i');

                // Close other accordions in the same group for a clean experience
                const parentAccordion = btn.closest('.faq-accordion');
                if (parentAccordion && !isOpen) {
                    parentAccordion.querySelectorAll('.accordion-btn.active').forEach(otherBtn => {
                        otherBtn.classList.remove('active');
                        otherBtn.setAttribute('aria-expanded', 'false');
                        if (otherBtn.nextElementSibling) {
                            otherBtn.nextElementSibling.style.maxHeight = '0px';
                        }
                        const otherIcon = otherBtn.querySelector('i');
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-minus');
                            otherIcon.classList.add('fa-plus');
                        }
                    });
                }

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
    });
})();