/**
 * Direct filter functionality for the home page book filters
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('home-filters.js loaded');
    
    // Function to filter books on the home page
    function filterHomeBooks(category) {
        console.log('Filtering home books by category:', category);
        
        // Get all book cards in the carousel
        const bookCards = document.querySelectorAll('.books-carousel .book-card');
        if (!bookCards.length) {
            console.log('No book cards found in carousel');
            return;
        }
        
        console.log('Found', bookCards.length, 'book cards');
        
        // Show/hide based on filter
        bookCards.forEach(card => {
            if (category === 'all') {
                card.style.display = '';
            } else {
                const bookCategory = card.getAttribute('data-category');
                if (bookCategory === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            }
        });
        
        // Update active tab
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            if (tab.getAttribute('data-filter') === category) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    }
    
    // Add direct click handlers to filter tabs
    function setupFilterTabs() {
        const filterTabs = document.querySelectorAll('.filter-tabs .filter-tab');
        if (!filterTabs.length) {
            console.log('No filter tabs found');
            return;
        }
        
        console.log('Setting up', filterTabs.length, 'filter tabs');
        
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                const category = this.getAttribute('data-filter');
                console.log('Filter tab clicked:', category);
                filterHomeBooks(category);
            });
        });
    }
    
    // Initialize
    setupFilterTabs();
    
    // Make the filter function globally available
    window.filterHomeBooks = filterHomeBooks;
});

// Standalone function that can be called directly from HTML
function filterHomeBooksDirectly(category) {
    console.log('filterHomeBooksDirectly called with:', category);
    
    // Get all book cards in the carousel
    const bookCards = document.querySelectorAll('.books-carousel .book-card');
    
    // Show/hide based on filter
    bookCards.forEach(card => {
        if (category === 'all') {
            card.style.display = '';
        } else {
            const bookCategory = card.getAttribute('data-category');
            if (bookCategory === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        }
    });
    
    // Update active tab
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        if (tab.getAttribute('data-filter') === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

// Make the direct function globally available
window.filterHomeBooksDirectly = filterHomeBooksDirectly;
