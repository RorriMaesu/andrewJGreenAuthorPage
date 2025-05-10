/**
 * Main JavaScript for Andrew J. Green Author Website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initModals();
    initCounters();
    initBookCarousel();
    initReviewsCarousel();
    initVideoPlaceholders();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    // Header scroll effect
    const header = document.querySelector('.site-header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
                
                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use the system preference
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme toggle click handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
    }
}

/**
 * Modal functionality
 */
function initModals() {
    // Preview modal
    const previewLinks = document.querySelectorAll('a[href="#preview-modal"]');
    const previewModal = document.getElementById('preview-modal');
    
    // Video modal
    const videoLinks = document.querySelectorAll('a[href="#video-modal"]');
    const videoModal = document.getElementById('video-modal');
    
    // Close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Open preview modal
    if (previewLinks && previewModal) {
        previewLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                previewModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    // Open video modal
    if (videoLinks && videoModal) {
        videoLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Add YouTube iframe if data-video-id is present
                const videoId = link.getAttribute('data-video-id');
                if (videoId) {
                    const videoContainer = videoModal.querySelector('.video-container');
                    if (videoContainer) {
                        videoContainer.innerHTML = `
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                            title="YouTube video player" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                        `;
                    }
                }
            });
        });
    }
    
    // Close modals
    if (closeButtons) {
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Clear video iframe if it exists
                    const videoContainer = modal.querySelector('.video-container');
                    if (videoContainer) {
                        videoContainer.innerHTML = '';
                    }
                }
            });
        });
    }
    
    // Close modal when clicking outside content
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
            
            // Clear video iframe if it exists
            const videoContainer = e.target.querySelector('.video-container');
            if (videoContainer) {
                videoContainer.innerHTML = '';
            }
        }
    });
}

/**
 * Animated counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (counters.length === 0) return;
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // ms
                const step = Math.ceil(target / (duration / 16)); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += step;
                    if (current > target) {
                        current = target;
                    }
                    counter.textContent = current.toLocaleString();
                    
                    if (current < target) {
                        requestAnimationFrame(updateCounter);
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Video placeholder functionality
 */
function initVideoPlaceholders() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    if (videoPlaceholders) {
        videoPlaceholders.forEach(placeholder => {
            placeholder.addEventListener('click', () => {
                const videoId = placeholder.getAttribute('data-video-id');
                if (videoId) {
                    placeholder.innerHTML = `
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                        title="YouTube video player" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    `;
                }
            });
        });
    }
}

/**
 * Book carousel functionality
 */
function initBookCarousel() {
    // Will be implemented when books.js is loaded
}

/**
 * Reviews carousel functionality
 */
function initReviewsCarousel() {
    // Will be implemented when reviews.js is loaded
}

/**
 * Newsletter form submission
 */
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real implementation, you would send this data to a server
        // For now, we'll just show a success message
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        // Simple validation
        if (!name || !email) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show success message
        newsletterForm.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Thank you, ${name}!</h3>
                <p>Your free pack is on its way to your inbox.</p>
            </div>
        `;
    });
}
