/**
 * Books data and functionality for Andrew J. Green Author Website
 */

// Book data
const books = [
    {
        id: 1,
        title: "Neural Shackle",
        subtitle: "The Vedic Code Series - Book 1",
        cover: "images/book-neural-shackle.jpg",
        description: "In a world where AI controls human emotion, one programmer discovers an ancient code that could free humanity.",
        category: "fiction",
        links: {
            amazon: "https://amazon.com/",
            signed: "#",
            audible: "https://audible.com/"
        },
        shipping: "Ships in 24h",
        featured: true
    },
    {
        id: 2,
        title: "Quantum Dharma",
        subtitle: "The Vedic Code Series - Book 2",
        cover: "images/book-quantum-dharma.jpg",
        description: "As the resistance grows, ancient wisdom and quantum computing merge to challenge the emotional control grid.",
        category: "fiction",
        links: {
            amazon: "https://amazon.com/",
            signed: "#",
            audible: "https://audible.com/"
        },
        shipping: "Ships in 24h",
        featured: true
    },
    {
        id: 3,
        title: "Vedic Computing",
        subtitle: "Ancient Wisdom for Modern Coders",
        cover: "images/book-vedic-computing.jpg",
        description: "Discover how ancient Vedic principles can transform your approach to software architecture and problem-solving.",
        category: "non-fiction",
        links: {
            amazon: "https://amazon.com/",
            signed: "#",
            audible: "https://audible.com/"
        },
        shipping: "Ships in 24h",
        featured: true
    },
    {
        id: 4,
        title: "Tower Climber's Meditation",
        subtitle: "Finding Zen at 300 Feet",
        cover: "images/book-tower-climber.jpg",
        description: "Practical meditation techniques developed during a decade of working on telecommunications towers.",
        category: "non-fiction",
        links: {
            amazon: "https://amazon.com/",
            signed: "#",
            audible: "https://audible.com/"
        },
        shipping: "Ships in 24h",
        featured: false
    }
];

// Initialize books section
document.addEventListener('DOMContentLoaded', function() {
    const booksCarousel = document.querySelector('.books-carousel');
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    if (!booksCarousel) return;
    
    // Render all books initially
    renderBooks('all');
    
    // Filter tabs functionality
    if (filterTabs) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Filter books
                const filter = tab.getAttribute('data-filter');
                renderBooks(filter);
            });
        });
    }
    
    // Function to render books based on filter
    function renderBooks(filter) {
        // Filter books
        const filteredBooks = filter === 'all' 
            ? books 
            : books.filter(book => book.category === filter);
        
        // Clear current books
        booksCarousel.innerHTML = '';
        
        // Add books to carousel
        filteredBooks.forEach(book => {
            const bookCard = createBookCard(book);
            booksCarousel.appendChild(bookCard);
        });
        
        // Initialize 3D tilt effect
        initTiltEffect();
    }
    
    // Function to create a book card
    function createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.setAttribute('data-tilt', '');
        card.setAttribute('data-tilt-max', '10');
        
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
                    <a href="${book.links.amazon}" class="btn btn-primary btn-sm" target="_blank">
                        <i class="fab fa-amazon"></i> Amazon
                    </a>
                    <a href="${book.links.signed}" class="btn btn-secondary btn-sm">
                        <i class="fas fa-signature"></i> Signed Copy
                    </a>
                    <a href="${book.links.audible}" class="btn btn-secondary btn-sm" target="_blank">
                        <i class="fas fa-headphones"></i> Audible
                    </a>
                </div>
                <p class="shipping-info"><i class="fas fa-truck"></i> ${book.shipping}</p>
            </div>
        `;
        
        return card;
    }
    
    // 3D tilt effect for book cards
    function initTiltEffect() {
        const bookCards = document.querySelectorAll('.book-card[data-tilt]');
        
        bookCards.forEach(card => {
            card.addEventListener('mousemove', tiltEffect);
            card.addEventListener('mouseleave', resetTilt);
        });
        
        function tiltEffect(e) {
            const card = this;
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            // Calculate mouse position relative to card center
            const centerX = cardRect.left + cardWidth / 2;
            const centerY = cardRect.top + cardHeight / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            // Calculate tilt angles
            const maxTilt = parseInt(card.getAttribute('data-tilt-max')) || 10;
            const tiltX = (mouseY / (cardHeight / 2)) * maxTilt;
            const tiltY = -(mouseX / (cardWidth / 2)) * maxTilt;
            
            // Apply transform
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }
        
        function resetTilt() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    }
});

// Function to open book preview modal
function openBookPreview(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    
    const previewModal = document.getElementById('preview-modal');
    if (!previewModal) return;
    
    const modalBody = previewModal.querySelector('.modal-body');
    if (!modalBody) return;
    
    // Set preview content
    modalBody.innerHTML = `
        <div class="preview-content">
            <div class="preview-header">
                <img src="${book.cover}" alt="${book.title} book cover" class="preview-cover">
                <div class="preview-info">
                    <h2>${book.title}</h2>
                    <p class="preview-subtitle">${book.subtitle}</p>
                    <div class="preview-buttons">
                        <a href="${book.links.amazon}" class="btn btn-primary" target="_blank">
                            <i class="fab fa-amazon"></i> Buy on Amazon
                        </a>
                        <a href="${book.links.signed}" class="btn btn-secondary">
                            <i class="fas fa-signature"></i> Get Signed Copy
                        </a>
                    </div>
                </div>
            </div>
            <div class="preview-description">
                <h3>About the Book</h3>
                <p>${book.description}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
                <p>Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
            </div>
            <div class="preview-sample">
                <h3>Read a Sample</h3>
                <div class="sample-content">
                    <p>Chapter 1: The Awakening</p>
                    <p>The code scrolled endlessly on Arjun's screen, a cascade of neural network parameters that controlled the emotional responses of billions. He'd written much of it himself, never questioning its purpose until now...</p>
                    <a href="#" class="btn btn-primary">Download Full Sample</a>
                </div>
            </div>
        </div>
    `;
    
    // Show modal
    previewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
