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



// ===== ENHANCED PORTFOLIO INTERACTIONS =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== PROGRESS BAR FOR SALES APPROACH =====
    const progressBar = document.querySelector('.progress-fill');
    const approachItems = document.querySelectorAll('.approach-item');
    
    if (progressBar && approachItems.length > 0) {
        const updateProgressBar = () => {
            const scrollTop = window.pageYOffset;
            const approachSection = document.querySelector('.sales-approach');
            
            if (approachSection) {
                const sectionTop = approachSection.offsetTop;
                const sectionHeight = approachSection.offsetHeight;
                const windowHeight = window.innerHeight;
                
                if (scrollTop >= sectionTop - windowHeight / 2 && scrollTop <= sectionTop + sectionHeight) {
                    const progress = Math.min(100, Math.max(0, 
                        ((scrollTop - sectionTop + windowHeight / 2) / sectionHeight) * 100
                    ));
                    progressBar.style.width = progress + '%';
                }
            }
        };
        
        window.addEventListener('scroll', throttle(updateProgressBar, 16));
    }
    
    // ===== TECH TOOL HOVER EFFECTS =====
    const techTools = document.querySelectorAll('.tech-tool');
    
    techTools.forEach(tool => {
        tool.addEventListener('mouseenter', function() {
            const toolName = this.dataset.tool;
            if (toolName) {
                // Create tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'tech-tooltip';
                tooltip.textContent = `Experience with ${toolName}`;
                tooltip.style.cssText = `
                    position: absolute;
                    background: var(--text);
                    color: var(--brand-contrast);
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                    pointer-events: none;
                    transform: translateY(-100%);
                    margin-top: -8px;
                `;
                
                this.style.position = 'relative';
                this.appendChild(tooltip);
                
                // Position tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
            }
        });
        
        tool.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tech-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // ===== KPI BARS ANIMATION =====
    const kpiBars = document.querySelectorAll('.kpi-fill');
    
    const animateKPIBars = () => {
        kpiBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 500);
        });
    };
    
    // Trigger KPI animation when section is visible
    const kpiSection = document.querySelector('.kpis');
    if (kpiSection) {
        const kpiObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateKPIBars();
                    kpiObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        kpiObserver.observe(kpiSection);
    }
    
    // ===== TIMELINE ITEMS STAGGERED ANIMATION =====
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        timelineObserver.observe(item);
    });
    
    // ===== TARGET CARDS HOVER EFFECTS =====
    const targetCards = document.querySelectorAll('.target-card, .motivator-card');
    
    targetCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== APPROACH ITEMS CLICK TO EXPAND =====
    const approachItemsClickable = document.querySelectorAll('.approach-item');
    
    approachItemsClickable.forEach(item => {
        item.style.cursor = 'pointer';
        
        item.addEventListener('click', function() {
            const content = this.querySelector('.step-content p');
            const isExpanded = this.classList.contains('expanded');
            
            if (isExpanded) {
                this.classList.remove('expanded');
                content.style.maxHeight = '4.5em';
                content.style.overflow = 'hidden';
            } else {
                this.classList.add('expanded');
                content.style.maxHeight = 'none';
                content.style.overflow = 'visible';
            }
        });
        
        // Initialize collapsed state for long content
        const content = item.querySelector('.step-content p');
        if (content && content.textContent.length > 200) {
            content.style.maxHeight = '4.5em';
            content.style.overflow = 'hidden';
            content.style.position = 'relative';
            
            // Add expand indicator
            const expandIndicator = document.createElement('span');
            expandIndicator.textContent = '... (click to expand)';
            expandIndicator.style.cssText = `
                color: var(--brand);
                font-weight: 600;
                cursor: pointer;
                font-size: 0.9em;
            `;
            content.appendChild(expandIndicator);
        }
    });
    
    // ===== ENHANCED CTA BUTTONS =====
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // ===== SKILL BADGE ANIMATIONS =====
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.2)';
                icon.style.transition = 'transform 0.5s ease';
            }
        });
        
        badge.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Lazy load animations
    const lazyAnimationElements = document.querySelectorAll('.target-card, .motivator-card, .tech-tool');
    
    const lazyAnimationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                lazyAnimationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    lazyAnimationElements.forEach(el => {
        lazyAnimationObserver.observe(el);
    });
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            // Recalculate any position-dependent elements
            const progressBar = document.querySelector('.progress-fill');
            if (progressBar) {
                updateProgressBar();
            }
        }, 250);
    });
});

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .approach-item.expanded {
        background: linear-gradient(135deg, var(--surface) 0%, rgba(0, 87, 255, 0.05) 100%);
    }
    
    .tech-tooltip {
        animation: tooltipFadeIn 0.2s ease-out;
    }
    
    @keyframes tooltipFadeIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-90%);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(-100%);
        }
    }
`;
document.head.appendChild(style);

