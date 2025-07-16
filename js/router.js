/**
 * Router for Andrew J. Green Author Website
 * Handles single-page application navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize router
    initRouter();
});

/**
 * Initialize the router functionality
 */
function initRouter() {
    // Get page content container
    const pageContent = document.getElementById('page-content');
    if (!pageContent) return;

    // Set default page
    let currentPage = 'home';

    // Check for hash in URL
    const hash = window.location.hash.substring(1);
    if (hash) {
        currentPage = hash;
    }

    // Load initial page
    loadPage(currentPage);

    // Add event listeners to navigation links
    document.querySelectorAll('.page-nav').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const page = this.getAttribute('data-page');
            const section = this.getAttribute('data-section');

            if (page) {
                // Only reload the page if we're navigating to a different page
                const currentPage = window.location.hash.substring(1) || 'home';
                if (currentPage !== page) {
                    loadPage(page);

                    // Update URL hash
                    window.location.hash = page;
                }

                // Close mobile menu if open
                const menuToggle = document.querySelector('.mobile-menu-toggle');
                const navLinks = document.querySelector('.nav-links');
                const siteHeader = document.querySelector('.site-header');
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    siteHeader.classList.remove('menu-active');
                }

                // If there's a specific section to scroll to
                if (section) {
                    // Wait a moment for the page to render
                    setTimeout(() => {
                        const sectionElement = document.getElementById(section);
                        if (sectionElement) {
                            sectionElement.scrollIntoView({
                                behavior: 'smooth'
                            });
                        } else {
                            // If no section found, scroll to top
                            window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            });
                        }
                    }, 100);
                } else {
                    // No specific section, scroll to top
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', function() {
        const newPage = window.location.hash.substring(1) || 'home';
        loadPage(newPage);
    });
}

/**
 * Load a page template into the content area
 * @param {string} page - The page to load
 */
function loadPage(page) {
    // Default to home if page doesn't exist
    if (!document.getElementById(`${page}-template`)) {
        page = 'home';
    }

    // Get template content
    const template = document.getElementById(`${page}-template`);
    const pageContent = document.getElementById('page-content');

    if (template && pageContent) {
        // Clear current content
        pageContent.innerHTML = '';

        // Clone template content
        const content = template.content.cloneNode(true);

        // Add to page
        pageContent.appendChild(content);

        // Update active nav link
        updateActiveNavLink(page);

        // *** Dispatch custom event for page load ***
        document.dispatchEvent(new CustomEvent('page-loaded', { detail: { page: page } }));
        // Also dispatch page-specific event for books page
        if (page === 'books') {
            document.dispatchEvent(new Event('page:books'));
        }
    }
}

/**
 * Update the active navigation link
 * @param {string} page - The current page
 */
function updateActiveNavLink(page) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to current page link
    const activeLink = document.querySelector(`.nav-links a[data-page="${page}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

/**
 * Initialize page-specific functionality
 * @param {string} page - The current page
 */
function initPageFunctionality(page) {
    // Re-initialize components based on the page
    switch (page) {
        case 'home':
            // Initialize all home page components
            if (typeof initBookCarousel === 'function') initBookCarousel();
            if (typeof initReviewsCarousel === 'function') initReviewsCarousel();
            if (typeof initVideoPlaceholders === 'function') initVideoPlaceholders();
            if (typeof initCounters === 'function') initCounters();
            break;

        case 'books':
            // Initialize books page components
            console.log('[DEBUG] initBooksPage called');
            initBooksPage();
            // Auto-scroll to 12 Laws of Power if requested
            setTimeout(() => {
                console.log('[DEBUG] Auto-scroll timeout fired');
                let section = 'lawsofpower';
                // Always scroll to lawsofpower card
                const target = document.getElementById(section);
                console.log('[DEBUG] target element:', target);
                if (target) {
                    // Center the card vertically
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Add glowing effect
                    target.classList.add('glow-highlight');
                    // Remove glow on click/tap
                    const removeGlow = () => {
                        target.classList.remove('glow-highlight');
                        target.removeEventListener('click', removeGlow);
                        target.removeEventListener('touchstart', removeGlow);
                    };
                    target.addEventListener('click', removeGlow);
                    target.addEventListener('touchstart', removeGlow);
                    console.log('[DEBUG] Scrolled to and highlighted target:', section);
                } else {
                    console.log('[DEBUG] Target not found for section:', section);
                }
            }, 400);
            break;


        case 'contact':
            // Initialize contact page components
            initContactForm();
            break;
    }
}

/**
 * Initialize the books page
 */
function initBooksPage() {
    const booksGrid = document.querySelector('.books-grid');
    if (booksGrid && window.books) {
        // Render all books initially in the grid
        renderBooksGrid();
    } else {
        // If booksGrid exists but window.books is not yet loaded, try again shortly
        if (booksGrid && !window.books) {
            setTimeout(initBooksPage, 100);
        } else {
            console.error('Books page initialization failed:', {
                booksGridExists: !!booksGrid,
                windowBooksExists: !!window.books
            });
        }
    }
}

/**
 * Render books in the grid
 * @param {string} category - The category to filter by
 */
function renderBooksGrid(category) {
    const booksGrid = document.querySelector('.books-grid');
    if (!booksGrid || !window.books) {
        return;
    }

    // Clear current books
    booksGrid.innerHTML = '';

    // Only show published books
    const publishedBooks = window.books;

    publishedBooks.forEach(book => {
        const bookCard = createDetailedBookCard(book);
        booksGrid.appendChild(bookCard);
    });
}

/**
 * Create a detailed book card for the books page
 * @param {Object} book - The book data
 * @returns {HTMLElement} - The book card element
 */
function createDetailedBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.setAttribute('data-category', book.category);

    // Add an id to the 12 Laws of Power card for scroll targeting
    if (book.title === 'The 12 Laws of Power') {
        card.id = 'lawsofpower';
        // Update price for 12 Laws of Power
        book.price = "$2.99 Kindle | $9.99 Paperback | $17.76 Hardcover";
    }

    card.innerHTML = `
        <div class="book-cover">
            <img src="${book.cover}" alt="${book.title} book cover">
            ${book.featured ? '<span class="featured-badge">Featured</span>' : ''}
        </div>
        <div class="book-info">
            <h3>${book.title}</h3>
            <p class="book-subtitle">${book.subtitle}</p>
            <p class="book-description">${book.description}</p>
            <div class="book-links">
                <a href="${book.links.amazon}" class="btn btn-primary" target="_blank">
                    <i class="fab fa-amazon"></i> Buy on Amazon
                </a>
                ${book.links.kindle ? `
                <a href="${book.links.kindle}" class="btn btn-secondary" target="_blank">
                    <i class="fas fa-tablet-alt"></i> Get Kindle Edition
                </a>
                ` : ''}
            </div>
            <p class="price-info"><i class="fas fa-tag"></i> ${book.price}</p>
        </div>
    `;

    return card;
}

/**

/**
 * Initialize the contact form
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // In a real implementation, you would send the form data to a server
            // For now, just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}

/**
 * Global function to filter books by category
 * This is used as a fallback for direct onclick attributes
 * @param {string} category - The category to filter by
 */
function filterBooksByCategory(category) {
    console.log('filterBooksByCategory called with:', category);

    // Check if we're on the books page
    if (document.querySelector('.books-grid')) {
        // Update active tab
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            if (tab.getAttribute('data-category') === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Render filtered books
        renderBooksGrid(category);
    }
    // Check if we're on the home page
    else if (document.querySelector('.books-carousel')) {
        // Update active tab
        const tabs = document.querySelectorAll('.filter-tab');
        tabs.forEach(tab => {
            if (tab.getAttribute('data-filter') === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Use the home page filter function
        if (typeof window.renderBooks === 'function') {
            window.renderBooks(category);
        }
    }
}

// Make the function globally available
