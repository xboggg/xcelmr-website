/* ==========================================
   XcelMR Services Ltd - Main JavaScript
   Advanced Animations & Interactivity
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initPreloader();
    initNavigation();
    initHeroSlider();
    initParallax();
    initScrollAnimations();
    initCounterAnimations();
    initBackToTop();
    initSmoothScroll();
    initTypingEffect();
    initMagneticButtons();
    initTiltEffect();
});

/* ==========================================
   PRELOADER
   ========================================== */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'visible';

            // Trigger entrance animations after preloader
            triggerEntranceAnimations();
        }, 500);
    });
}

function triggerEntranceAnimations() {
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-buttons, .hero-stats');
    heroElements.forEach((el, index) => {
        el.style.animationPlayState = 'running';
    });
}

/* ==========================================
   NAVIGATION
   ========================================== */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for header
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Active link highlighting
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add('active');
        }
    });
}

/* ==========================================
   HERO SLIDER WITH PARALLAX
   ========================================== */
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    const progressBar = document.querySelector('.slider-progress-bar');

    let currentSlide = 0;
    let slideInterval;
    let progress = 0;
    const slideDuration = 6000; // 6 seconds per slide
    const progressInterval = 50; // Update progress every 50ms

    // Initialize first slide
    if (slides.length > 0) {
        slides[0].classList.add('active');
        if (dots.length > 0) dots[0].classList.add('active');
    }

    function goToSlide(index) {
        // Remove active from current slide
        slides[currentSlide].classList.remove('active');
        if (dots.length > 0) dots[currentSlide].classList.remove('active');

        // Update current slide
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        // Add active to new slide
        slides[currentSlide].classList.add('active');
        if (dots.length > 0) dots[currentSlide].classList.add('active');

        // Reset progress
        progress = 0;
        if (progressBar) progressBar.style.width = '0%';
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function startSlider() {
        // Progress bar animation
        const progressTimer = setInterval(() => {
            progress += (progressInterval / slideDuration) * 100;
            if (progressBar) progressBar.style.width = `${progress}%`;

            if (progress >= 100) {
                progress = 0;
            }
        }, progressInterval);

        // Slide change
        slideInterval = setInterval(nextSlide, slideDuration);

        return progressTimer;
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            // Reset timer
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, slideDuration);
            progress = 0;
        });
    });

    // Start the slider
    if (slides.length > 1) {
        startSlider();
    }

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, slideDuration);
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            goToSlide(currentSlide - 1);
        }
    }
}

/* ==========================================
   PARALLAX EFFECTS
   ========================================== */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    const parallaxShapes = document.querySelectorAll('.parallax-shape');
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;

        // Parallax shapes
        parallaxShapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrolled * speed;
            shape.style.transform = `translateY(${yPos}px)`;
        });

        // Hero content parallax
        if (heroContent && scrolled < windowHeight) {
            const opacity = 1 - (scrolled / windowHeight);
            const translateY = scrolled * 0.3;
            heroContent.style.transform = `translateY(${translateY}px)`;
            heroContent.style.opacity = Math.max(opacity, 0);
        }

        // Hero visual parallax
        if (heroVisual && scrolled < windowHeight) {
            const translateY = scrolled * 0.2;
            heroVisual.style.transform = `translateY(${translateY}px)`;
        }

        // Custom parallax elements
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const rect = element.getBoundingClientRect();

            if (rect.top < windowHeight && rect.bottom > 0) {
                const yPos = (rect.top - windowHeight) * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    // Mouse parallax for hero
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        parallaxShapes.forEach((shape, index) => {
            const speed = 20 + (index * 10);
            const x = mouseX * speed;
            const y = mouseY * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();
}

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .animate-left, .animate-right, .animate-scale, .animate-rotate, .stagger-children, .service-card, .feature-item, .industry-card, .testimonial-card'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Add stagger delay for grid items
                if (entry.target.parentElement) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        // Add initial animation class if not present
        if (!element.classList.contains('animate-on-scroll') &&
            !element.classList.contains('animate-left') &&
            !element.classList.contains('animate-right') &&
            !element.classList.contains('animate-scale')) {
            element.classList.add('animate-on-scroll');
        }
        observer.observe(element);
    });

    // Section headers animation
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('animate-on-scroll');
        observer.observe(header);
    });
}

/* ==========================================
   COUNTER ANIMATIONS
   ========================================== */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));

    function animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }
}

/* ==========================================
   BACK TO TOP BUTTON
   ========================================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================
   SMOOTH SCROLL
   ========================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================
   TYPING EFFECT
   ========================================== */
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');

    typingElements.forEach(element => {
        const text = element.dataset.typing;
        const speed = parseInt(element.dataset.speed) || 100;
        let index = 0;
        element.textContent = '';

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }

        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                type();
                observer.disconnect();
            }
        });

        observer.observe(element);
    });
}

/* ==========================================
   MAGNETIC BUTTONS
   ========================================== */
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

/* ==========================================
   TILT EFFECT FOR CARDS
   ========================================== */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.service-card, .testimonial-card');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* ==========================================
   RIPPLE EFFECT FOR BUTTONS
   ========================================== */
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
        ripple.classList.add('ripple');

        // Add ripple styles dynamically
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.4)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

/* ==========================================
   SCROLL PROGRESS INDICATOR
   ========================================== */
(function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
})();

/* ==========================================
   LAZY LOAD IMAGES
   ========================================== */
(function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
})();

/* ==========================================
   FORM VALIDATION & SUBMISSION
   ========================================== */
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.background = '#10b981';

            // Reset form
            this.reset();

            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 2000);
    });
}

/* ==========================================
   ANIMATED CURSOR (OPTIONAL)
   ========================================== */
(function initCustomCursor() {
    // Only on desktop
    if (window.innerWidth < 1024) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow
    function animateCursor() {
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .service-card, .industry-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
})();

/* ==========================================
   TEXT REVEAL ANIMATION
   ========================================== */
function initTextReveal() {
    const revealTexts = document.querySelectorAll('.reveal-text');

    revealTexts.forEach(text => {
        const words = text.textContent.split(' ');
        text.innerHTML = words.map(word =>
            `<span class="word"><span class="word-inner">${word}</span></span>`
        ).join(' ');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const words = entry.target.querySelectorAll('.word-inner');
                words.forEach((word, i) => {
                    word.style.animation = `fadeInUp 0.5s ease forwards ${i * 0.1}s`;
                });
            }
        });
    });

    revealTexts.forEach(text => observer.observe(text));
}

/* ==========================================
   INITIALIZE ON WINDOW LOAD
   ========================================== */
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');

    // Initialize additional animations
    initTextReveal();
});

/* ==========================================
   PERFORMANCE OPTIMIZATION
   ========================================== */
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any size-dependent features
}, 250));
