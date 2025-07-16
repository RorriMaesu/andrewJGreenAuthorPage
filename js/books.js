/**
 * Books data and functionality for Andrew J. Green Author Website
 */

// Book data
window.books = [
    {
        id: 1,
        title: "Neural Shackle",
        subtitle: "S.I.N. Code Trilogy - Book 1",
        cover: "https://m.media-amazon.com/images/I/81DgOnQdJiL._SY466_.jpg",
        description: "In 2044 Chicago, your feelings aren't your own. They're fuel. Emotions are harvested, guilt is banked, and the city runs on the currency of human consciousness. For free-runner Anya Joshi, survival means staying invisible. But when her brother vanishes into the system, invisibility is no longer an option.",
        category: "fiction",
        links: {
            amazon: "https://a.co/d/aKcnp8Z",
            signed: "#",
            kindle: "https://a.co/d/aKcnp8Z"
        },
        price: "$2.99 Kindle | $17.99 Hardcover",
        featured: true
    },
    {
        id: 2,
        title: "Codex of the Celestial Dream",
        subtitle: "Secrets of the Multiverse Hidden in Vedic Astrology",
        cover: "https://m.media-amazon.com/images/I/51mQeHdFfHL._SY445_SX342_.jpg",
        description: "Step into the mystical world of Vedic Astrology and explore the depths of the universe. This profound book delves into the inner workings of Vedic mysticism and astrology, unraveling the secrets of the cosmos that have been hidden for centuries. 72% of proceeds go to Save the Children of India.",
        category: "non-fiction",
        links: {
            amazon: "https://a.co/d/1V0PchE",
            kindle: "https://a.co/d/1V0PchE"
        },
        price: "Free with Kindle Unlimited | $2.99 Kindle | $99.64 Hardcover",
        featured: true
    },
    {
        id: 3,
        title: "Compass of the Celestial Dream",
        subtitle: "Secrets of the Multiverse Revealed Through Vedic Astrology",
        cover: "https://m.media-amazon.com/images/I/512v-OjaGdL._SY445_SX342_.jpg",
        description: "Unlock Your Cosmic Destiny: Master Vedic Astrology with Celestial Compass. The essential, practical sequel to the groundbreaking Codex of the Celestial Dream, designed to transform your knowledge of Vedic Astrology (Jyotish) into actionable wisdom and tangible results.",
        category: "non-fiction",
        links: {
            amazon: "https://a.co/d/ddbAHzl",
            kindle: "https://a.co/d/ddbAHzl"
        },
        price: "Free with Kindle Unlimited | $5.28 Kindle | $63.92 Hardcover",
        featured: true
    },
    {
        id: 4,
        title: "The 12 Laws of Power",
        subtitle: "Master the Art of Influence Without Compromising Your Integrity",
        cover: "images/12LawsofPowerFrontCoverAlone.png",
        description: "True power isn't about domination—it's about knowing exactly when to speak, what to reveal, and how to move others without ever breaking your own integrity. This razor-sharp guide combines neuroscience, psychology, and ancient Vedic archetypes to give you the ultimate persuasion toolkit.",
        category: "non-fiction",
        links: {
            amazon: "https://www.amazon.com/12-laws-power-influence-ethically/dp/b0fdbc5jpj",
            kindle: "https://www.amazon.com/12-laws-power-influence-ethically/dp/b0fdbc5jpj"
        },
        price: "$9.99 Kindle | $24.99 Paperback",
        featured: true
    },
    // ...removed upcoming book...
];

// Initialize books section
document.addEventListener('DOMContentLoaded', function() {

    // Render all books in the books page
    function renderBooksPage() {
        const booksGrid = document.querySelector('.books-grid');
        if (!booksGrid) return;
        booksGrid.innerHTML = '';
        window.books.forEach(book => {
            const card = createBookCard(book);
            booksGrid.appendChild(card);
        });
        initTiltEffect();
    }

    // Listen for custom event from router when books page loads
    document.addEventListener('page:books', renderBooksPage);

    // If books page is already loaded, render immediately
    if (document.querySelector('.books-grid')) {
        renderBooksPage();
    }

    // Function to render books based on filter
    // Make it globally accessible
    window.renderBooks = function(filter) {
        // Filter books
        let filteredBooks;
        if (filter === 'all') {
            filteredBooks = window.books;
        } else if (filter === 'featured') {
            filteredBooks = window.books.filter(book => book.featured);
        } else {
            filteredBooks = window.books.filter(book => book.category === filter);
        }

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
        card.setAttribute('data-category', book.category);

        // Log the card creation for debugging


        // Removed upcoming book logic

        // Add an id to the 12 Laws of Power card for scroll targeting
        if (book.title === 'The 12 Laws of Power') {
            card.id = 'lawsofpower';
        }

        card.innerHTML = `
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title} book cover">
                ${book.title === 'The 12 Laws of Power' ? '<span class="featured-badge animated-featured-badge">Featured</span>' : ''}
            </div>
            <div class="book-info">
                <h3>${book.title}</h3>
                <span class="desc-tooltip">Click to zoom</span>
                <p class="book-subtitle">${book.subtitle}</p>
                <div class="book-description-container">
                    <p class="book-description">${book.description}</p>
                </div>
                <div class="book-links">
                    <a href="${book.links.amazon}" class="btn btn-lg btn-primary book-btn" target="_blank">
                        <i class="fab fa-amazon"></i> Buy on Amazon
                    </a>
                    ${book.links.kindle ? `
                    <a href="${book.links.kindle}" class="btn btn-lg btn-secondary book-btn" target="_blank">
                        <i class="fas fa-tablet-alt"></i> Kindle Edition
                    </a>
                    ` : ''}
                </div>
                <p class="price-info"><i class="fas fa-tag"></i> ${book.price}</p>
            </div>
        `;

        // Popout description for desktop users (separate from card)
        const descContainer = card.querySelector('.book-description-container');
        const descText = card.querySelector('.book-description');
        const tooltip = card.querySelector('.desc-tooltip');
        // Make the entire card clickable for popup
        if (tooltip) {
            card.addEventListener('click', function(e) {
                // Prevent preview button from triggering popup
                if (e.target.closest('.preview-btn')) return;
                // Prevent opening another popup if one is already open
                if (document.querySelector('.book-description-popout.is-popped-out')) return;
                if (window.innerWidth > 1024) {
                    e.stopPropagation();
                    // Hide original description
                    if (descContainer) descContainer.style.visibility = 'hidden';
                    // Hide tooltip
                    tooltip.style.display = 'none';
                    // Create popout element centered on screen
                    const popout = document.createElement('div');
                    popout.className = 'book-description-popout is-popped-out';
                    popout.innerHTML = `
                        <button class="close-popout" style="position:absolute;top:1rem;right:1rem;font-size:2rem;background:none;border:none;color:var(--accent-primary);cursor:pointer;z-index:3100;">&times;</button>
                        <p class="book-description is-popped-out-text">${book.description}</p>
                    `;
                    popout.style.position = 'fixed';
                    popout.style.left = '50%';
                    popout.style.top = '50%';
                    popout.style.transform = 'translate(-50%, -50%)';
                    popout.style.width = '60vw';
                    popout.style.maxWidth = '900px';
                    popout.style.height = 'auto';
                    popout.style.maxHeight = '80vh';
                    popout.style.overflowY = 'auto';
                    popout.style.zIndex = '3000';
                    document.body.appendChild(popout);
                    // Collapse when clicking anywhere except the popup itself
                    function closePopout(ev) {
                        // Always close popup on any click
                        popout.remove();
                        if (descContainer) descContainer.style.visibility = '';
                        tooltip.style.display = '';
                        document.removeEventListener('click', closePopout, true);
                    }
                    setTimeout(() => {
                        document.addEventListener('click', closePopout, true);
                    }, 10);
                }
            });
        }

        // Add event listener for preview button
        const previewBtn = card.querySelector('.preview-btn');
        if (previewBtn) {
            previewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const bookId = parseInt(this.getAttribute('data-book-id'));
                openBookPreview(bookId);
            });
        }

        // Popout logic is handled by the book-description-container click event below

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

    // Prevent any scroll effect when clicking All Books or changing category
    const allBooksTab = document.querySelector('.category-tab[data-category="all"]');
    if (allBooksTab) {
        allBooksTab.addEventListener('click', function(e) {
            // Prevent scroll/jump after clicking All Books
            window.scrollTo({ top: 0, behavior: 'auto' });
        });
    }
});

// Book preview data
window.bookPreviews = [
    {
        id: 1,
        title: "Neural Shackle",
        subtitle: "S.I.N. Code Trilogy - Book 1",
        cover: "https://m.media-amazon.com/images/I/81DgOnQdJiL._SY466_.jpg",
        description: "In 2044 Chicago, your feelings aren't your own. They're fuel. Emotions are harvested, guilt is banked, and the city runs on the currency of human consciousness. For free-runner Anya Joshi, survival means staying invisible. But when her brother vanishes into the system, invisibility is no longer an option.",
        excerpt: `<p>The first time Anya Joshi felt her emotions being harvested, she was thirteen years old.</p>
        <p>It was a Tuesday afternoon in October, and she was sitting in the back row of her eighth-grade classroom, half-listening to Ms. Patel drone on about the Great Water Wars of the 2030s. Outside, Chicago's skyline was partially obscured by a low-hanging blanket of smog that had settled over the city like a dirty shroud.</p>
        <p>The harvester drone had entered through the classroom's ventilation system—a silent, nearly invisible mist that smelled faintly of ozone and something else... something medicinal. Most of her classmates didn't even notice it. But Anya did. She always noticed things others missed.</p>`,
        reviews: [
            {
                text: "A mind-bending cyberpunk thriller that asks profound questions about consciousness and control. Green's debut novel delivers both heart-pounding action and philosophical depth.",
                source: "Chicago Tribune",
                rating: 4.5
            },
            {
                text: "Neural Shackle combines the dystopian dread of Orwell with the technological nightmares of Philip K. Dick. A stunning achievement that marks the arrival of a major new voice in science fiction.",
                source: "SFX Magazine",
                rating: 5
            }
        ]
    },
    {
        id: 2,
        title: "Codex of the Celestial Dream",
        subtitle: "Secrets of the Multiverse Hidden in Vedic Astrology",
        cover: "https://m.media-amazon.com/images/I/51mQeHdFfHL._SY445_SX342_.jpg",
        description: "Step into the mystical world of Vedic Astrology and explore the depths of the universe. This profound book delves into the inner workings of Vedic mysticism and astrology, unraveling the secrets of the cosmos that have been hidden for centuries. 72% of proceeds go to Save the Children of India.",
        excerpt: `<p>The universe speaks to us in a language older than words—a celestial script written in the movements of planets, the dance of stars, and the subtle interplay of cosmic energies that have shaped human consciousness since the dawn of time.</p>
        <p>For thousands of years, the ancient seers of India—the Rishis—observed these patterns, developing a sophisticated system of astrology that goes far beyond the simplified sun-sign horoscopes familiar to Western readers. This system, known as Jyotish or Vedic astrology, is not merely a method of prediction but a complete cosmological framework—a way of understanding the fundamental nature of reality and our place within it.</p>`,
        reviews: [
            {
                text: "A masterful exploration of Vedic astrology that bridges ancient wisdom with modern understanding. Green writes with clarity and depth, making complex concepts accessible without sacrificing their profound implications.",
                source: "Journal of Consciousness Studies",
                rating: 4.7
            },
            {
                text: "The Codex of the Celestial Dream is a rare gem—a book that honors the authentic tradition of Jyotish while offering fresh insights relevant to contemporary seekers. Both scholarly and deeply spiritual.",
                source: "Light on Vedic Astrology Magazine",
                rating: 5
            }
        ]
    },
    {
        id: 3,
        title: "Compass of the Celestial Dream",
        subtitle: "Secrets of the Multiverse Revealed Through Vedic Astrology",
        cover: "https://m.media-amazon.com/images/I/512v-OjaGdL._SY445_SX342_.jpg",
        description: "Unlock Your Cosmic Destiny: Master Vedic Astrology with Celestial Compass. The essential, practical sequel to the groundbreaking Codex of the Celestial Dream, designed to transform your knowledge of Vedic Astrology (Jyotish) into actionable wisdom and tangible results.",
        excerpt: `<p>In the vast ocean of astrological knowledge, theory without application is like a ship without a compass—intellectually impressive, perhaps, but ultimately unable to guide you to your destination. This book is that compass—a practical, hands-on guide to navigating the celestial waters of Vedic astrology and steering your life toward its highest potential.</p>
        <p>Where the Codex of the Celestial Dream laid out the philosophical foundations and cosmic architecture of Jyotish, the Compass of the Celestial Dream shows you how to use this ancient system as a practical tool for self-understanding, decision-making, and conscious evolution. It transforms abstract concepts into concrete techniques that you can apply immediately to address the real challenges and opportunities of your life.</p>`,
        reviews: [
            {
                text: "Where the Codex provided the map, the Compass provides the journey. Green has created an indispensable guide for anyone serious about applying Vedic astrological principles to real-life challenges and opportunities.",
                source: "Vedic Astrology Today",
                rating: 4.8
            },
            {
                text: "Practical without being simplistic, spiritual without being vague, the Compass of the Celestial Dream strikes a perfect balance. Green's approach honors the complexity of Jyotish while making its wisdom accessible and applicable.",
                source: "Modern Mystic Magazine",
                rating: 4.5
            }
        ]
    },
    {
        id: 4,
        title: "The 12 Laws of Power",
        subtitle: "Master the Art of Influence Without Compromising Your Integrity",
        cover: "images/12LawsofPowerFrontCoverAlone.png",
        description: "True power isn't about domination—it's about knowing exactly when to speak, what to reveal, and how to move others without ever breaking your own integrity. This razor-sharp guide combines neuroscience, psychology, and ancient Vedic archetypes to give you the ultimate persuasion toolkit.",
        excerpt: `<p>True power isn't about domination—it's about knowing exactly when to speak, what to reveal, and how to move others without ever breaking your own integrity.</p>
        <p>The 12 Laws of Power is a razor-sharp guide to modern influence—where neuroscience, psychology, and ancient Vedic archetypes converge to give you the ultimate persuasion toolkit. This isn't about manipulation; it's about mastery: of perception, timing, emotion, and self.</p>
        <p>Whether you're leading a team, negotiating a deal, pitching a vision, or parenting a headstrong teen, power plays out in the shadows of attention and emotion. In this mind-opening book, Andrew J. Green shows you how to wield influence with surgical precision—without becoming the villain in your own story.</p>
        <p>Inside, you'll discover:</p>
        <ul>
            <li>The 12 universal laws that govern silent authority, trust engineering, and emotional leverage.</li>
            <li>Psychological tactics backed by behavioral science and case studies that feel too real to be theoretical.</li>
            <li>A hidden appendix containing the Nakshatra Influence Matrix—a secret system for tailoring your approach to someone's cosmic psychological blueprint.</li>
        </ul>
        <p>Each chapter gives you tools. But more importantly, it gives you control—over outcomes, perception, and the person you are becoming.</p>
        <p>Don't chase power. Master the laws behind it—and let the world move for you.</p>`,
        reviews: [
            {
                text: "Green has created something truly unique—a power manual with a conscience. Where other influence books either shy away from real-world tactics or embrace manipulation, The 12 Laws of Power walks a masterful middle path.",
                source: "Leadership Quarterly",
                rating: 4.9
            },
            {
                text: "The integration of cutting-edge neuroscience with ancient wisdom traditions creates a framework for influence that feels both innovative and timeless. A must-read for anyone who wants to increase their impact without sacrificing their integrity.",
                source: "Psychology Today",
                rating: 4.8
            }
        ]
    }
];

// Function to open book preview modal
function openBookPreview(bookId) {
    const book = window.books.find(b => b.id === bookId);
    const bookPreview = window.bookPreviews.find(bp => bp.id === bookId);

    if (!book || !bookPreview) {
        return;
    }

    const previewModal = document.getElementById('preview-modal');
    if (!previewModal) {
        return;
    }

    const modalBody = previewModal.querySelector('.modal-body');
    if (!modalBody) {
        return;
    }

    // Set preview content
    modalBody.innerHTML = `
        <div class="preview-content">
            <div class="preview-header">
                <img src="${book.cover}" alt="${book.title} book cover" class="preview-cover">
                <div class="preview-info">
                    <h2>${book.title}</h2>
                    <p class="preview-subtitle">${book.subtitle}</p>
                    <div class="preview-buttons">
                        <a href="${book.links.amazon}" class="btn btn-lg btn-primary book-btn" target="_blank">
                            <i class="fab fa-amazon"></i> Buy on Amazon
                        </a>
                        ${book.links.kindle ? `
                        <a href="${book.links.kindle}" class="btn btn-lg btn-secondary book-btn" target="_blank">
                            <i class="fas fa-tablet-alt"></i> Kindle Edition
                        </a>
                        ` : ''}
                    </div>
                    <p class="preview-price"><i class="fas fa-tag"></i> ${book.price}</p>
                </div>
            </div>
            <div class="preview-description">
                <h3>About the Book</h3>
                <p>${book.description}</p>
            </div>
            <div class="preview-sample">
                <h3>Read a Sample</h3>
                <div class="sample-content">
                    ${bookPreview.excerpt}
                </div>
            </div>
            ${bookPreview.reviews && bookPreview.reviews.length > 0 ? `
            <div class="preview-reviews">
                <h3>Reviews</h3>
                <div class="reviews-list">
                    ${bookPreview.reviews.map(review => `
                    <div class="preview-review">
                        <div class="review-rating">
                            ${Array(Math.floor(review.rating)).fill('<i class="fas fa-star"></i>').join('')}
                            ${review.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                        </div>
                        <p class="review-text">"${review.text}"</p>
                        <p class="review-source">— ${review.source}</p>
                    </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;

    // Show modal
    previewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
