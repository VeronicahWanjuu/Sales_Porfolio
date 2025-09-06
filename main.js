// ===== MAIN JAVASCRIPT FILE =====

document.addEventListener('DOMContentLoaded', function() {
    // ===== MOBILE NAVIGATION =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.classList.remove('active');
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
    }

    // ===== FORM HANDLING =====
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic form validation
            const name = this.querySelector('#name').value.trim();
            const email = this.querySelector('#email').value.trim();
            const message = this.querySelector('#message').value.trim();
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }
            
            // If using Netlify Forms, the form will submit normally
            // If using mailto fallback, prevent default and open email client
            if (!this.hasAttribute('data-netlify')) {
                e.preventDefault();
                const subject = encodeURIComponent('Portfolio Contact from ' + name);
                const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
                window.location.href = `mailto:vwanjuu@gmail.com?subject=${subject}&body=${body}`;
            }
        });
    }

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .experience-item, .skill-category, .tech-category');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // ===== TYPING EFFECT FOR HERO TITLE =====
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        const highlightText = heroTitle.querySelector('.highlight');
        
        if (highlightText) {
            // Add typing effect to the highlight text
            const highlightContent = highlightText.textContent;
            highlightText.textContent = '';
            
            let i = 0;
            const typeWriter = function() {
                if (i < highlightContent.length) {
                    highlightText.textContent += highlightContent.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            // Start typing effect after a delay
            setTimeout(typeWriter, 1000);
        }
    }

    // ===== STATS COUNTER ANIMATION =====
    const stats = document.querySelectorAll('.stat-number');
    
    const animateStats = function() {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
            const suffix = stat.textContent.replace(/[\d]/g, '');
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = function() {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.floor(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
    };

    // Trigger stats animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateStats, 1500);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(heroSection);
    }

    // ===== SKILL TAGS HOVER EFFECT =====
    const skillTags = document.querySelectorAll('.skill-tag, .tech-tool');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // ===== KEYBOARD NAVIGATION ENHANCEMENT =====
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('active');
        }
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Your scroll handling code here
        }, 10);
    });

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    // Focus management for mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }

    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You could send error reports to a logging service here
    });

    // ===== CONSOLE WELCOME MESSAGE =====
    console.log('%c👋 Welcome to Veronicah Wanjuu\'s Portfolio!', 'color: #0057FF; font-size: 16px; font-weight: bold;');
    console.log('%cInterested in the code? Check out the repository or get in touch!', 'color: #6C757D; font-size: 14px;');
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function scrollToElement(element, offset = 0) {
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}


// ===== ENHANCED GALLERY LIGHTBOX FUNCTIONALITY =====

// Enhanced gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', function() {
            openLightbox(this.src, this.alt, index);
        });
        
        // Add keyboard support
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(this.src, this.alt, index);
            }
        });
        
        // Make images focusable
        img.setAttribute('tabindex', '0');
        img.style.cursor = 'pointer';
    });

    // Enhanced lightbox functionality
    function openLightbox(src, alt, index) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <img src="${src}" alt="${alt}" class="lightbox-image">
                <div class="lightbox-caption">${alt}</div>
                <div class="lightbox-nav">
                    <button class="lightbox-prev" aria-label="Previous image">&#8249;</button>
                    <button class="lightbox-next" aria-label="Next image">&#8250;</button>
                </div>
                <div class="lightbox-counter">${index + 1} / ${galleryItems.length}</div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.focus();
        
        // Close lightbox
        closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Navigation
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        prevBtn.addEventListener('click', () => navigateGallery(index - 1));
        nextBtn.addEventListener('click', () => navigateGallery(index + 1));
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeydown);
        
        function closeLightbox() {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
            document.removeEventListener('keydown', handleKeydown);
            
            // Return focus to the original image
            galleryItems[index].focus();
        }
        
        function handleKeydown(e) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateGallery(index - 1);
                    break;
                case 'ArrowRight':
                    navigateGallery(index + 1);
                    break;
                case 'Home':
                    navigateGallery(0);
                    break;
                case 'End':
                    navigateGallery(galleryItems.length - 1);
                    break;
            }
        }
        
        function navigateGallery(newIndex) {
            if (newIndex < 0) newIndex = galleryItems.length - 1;
            if (newIndex >= galleryItems.length) newIndex = 0;
            
            const newImg = galleryItems[newIndex];
            const lightboxImg = lightbox.querySelector('.lightbox-image');
            const lightboxCaption = lightbox.querySelector('.lightbox-caption');
            const lightboxCounter = lightbox.querySelector('.lightbox-counter');
            
            // Add fade transition
            lightboxImg.style.opacity = '0';
            
            setTimeout(() => {
                lightboxImg.src = newImg.src;
                lightboxImg.alt = newImg.alt;
                lightboxCaption.textContent = newImg.alt;
                lightboxCounter.textContent = `${newIndex + 1} / ${galleryItems.length}`;
                lightboxImg.style.opacity = '1';
            }, 150);
            
            index = newIndex;
        }
    }
});

// Add enhanced lightbox styles
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
.lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(5px);
}

.lightbox-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    text-align: center;
    animation: scaleIn 0.3s ease;
}

.lightbox-image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: var(--radius-lg);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
    transition: opacity 0.15s ease;
}

.lightbox-close {
    position: absolute;
    top: -50px;
    right: -50px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    font-size: 1.8rem;
    cursor: pointer;
    padding: 12px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.lightbox-close:hover,
.lightbox-close:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.1);
    outline: none;
}

.lightbox-caption {
    color: white;
    margin-top: 1.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.lightbox-counter {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    background: rgba(0, 0, 0, 0.5);
    padding: 8px 16px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
}

.lightbox-nav {
    position: absolute;
    top: 50%;
    width: calc(100% + 120px);
    left: -60px;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    pointer-events: none;
}

.lightbox-prev,
.lightbox-next {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    font-size: 2rem;
    padding: 15px 20px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.3s ease;
    pointer-events: all;
    backdrop-filter: blur(10px);
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-prev:hover,
.lightbox-next:hover,
.lightbox-prev:focus,
.lightbox-next:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.1);
    outline: none;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes scaleIn {
    from { 
        opacity: 0; 
        transform: scale(0.8);
    }
    to { 
        opacity: 1; 
        transform: scale(1);
    }
}

@media (max-width: 768px) {
    .lightbox-close {
        top: -40px;
        right: -20px;
        font-size: 1.5rem;
        width: 40px;
        height: 40px;
        padding: 8px;
    }
    
    .lightbox-nav {
        width: calc(100% + 80px);
        left: -40px;
    }
    
    .lightbox-prev,
    .lightbox-next {
        font-size: 1.5rem;
        padding: 10px 15px;
        width: 50px;
        height: 50px;
    }
    
    .lightbox-counter {
        bottom: -30px;
        font-size: 0.8rem;
        padding: 6px 12px;
    }
}
`;

document.head.appendChild(lightboxStyles);

