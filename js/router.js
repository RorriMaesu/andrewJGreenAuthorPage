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
                if (menuToggle && menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
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

        // Initialize page-specific functionality
        initPageFunctionality(page);
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
            initBooksPage();
            break;

        case 'blog':
            // Initialize blog page components
            initBlogPage();
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
    const categoryTabs = document.querySelectorAll('.category-tab');

    if (booksGrid && window.books) {
        // Render all books initially
        renderBooksGrid('all');

        // Category tabs functionality
        if (categoryTabs) {
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Update active tab
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    // Filter books
                    const category = tab.getAttribute('data-category');
                    renderBooksGrid(category);
                });
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
    if (!booksGrid || !window.books) return;

    // Clear current books
    booksGrid.innerHTML = '';

    // Filter books by category
    let filteredBooks = window.books;
    if (category !== 'all') {
        filteredBooks = window.books.filter(book => book.category === category);
    }

    // Add books to grid
    filteredBooks.forEach(book => {
        const bookCard = createDetailedBookCard(book);
        booksGrid.appendChild(bookCard);
    });
}

/**
 * Initialize the blog page
 */
function initBlogPage() {
    const blogGrid = document.querySelector('.blog-posts-grid');
    const categoryTabs = document.querySelectorAll('.category-tab');

    if (blogGrid && window.blogPosts) {
        // Render all blog posts initially
        renderBlogGrid('all');

        // Category tabs functionality
        if (categoryTabs) {
            categoryTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Update active tab
                    categoryTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');

                    // Filter blog posts
                    const category = tab.getAttribute('data-category');
                    renderBlogGrid(category);
                });
            });
        }
    }
}

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
