/**
 * Reviews data and functionality for Andrew J. Green Author Website
 */

// Reviews data
const reviews = [
    {
        id: 1,
        text: "Neural Shackle blends cutting-edge tech concepts with ancient wisdom in a way I've never seen before. The parallels between AI architecture and Vedic consciousness models blew my mind.",
        author: "TechReader42",
        source: "Goodreads",
        rating: 5,
        book: "Neural Shackle",
        featured: true
    },
    {
        id: 2,
        text: "As both a software engineer and yoga practitioner, this book spoke to me on multiple levels. Green's ability to weave complex technical concepts with spiritual philosophy is masterful.",
        author: "CodeYogi",
        source: "Amazon",
        rating: 5,
        book: "Neural Shackle",
        featured: true
    },
    {
        id: 3,
        text: "Quantum Dharma picks up where Neural Shackle left off and elevates the story to new heights. The character development is outstanding, and the technical details feel authentic without being overwhelming.",
        author: "SciFiEnthusiast",
        source: "Goodreads",
        rating: 4,
        book: "Quantum Dharma",
        featured: true
    },
    {
        id: 4,
        text: "Tower Climber's Meditation changed my approach to finding calm in high-stress situations. The practical techniques are easy to implement and surprisingly effective.",
        author: "MindfulClimber",
        source: "Amazon",
        rating: 5,
        book: "Tower Climber's Meditation",
        featured: true
    },
    {
        id: 5,
        text: "Vedic Computing has transformed how I approach software architecture. The ancient principles applied to modern coding problems is genius.",
        author: "DevArchitect",
        source: "Goodreads",
        rating: 5,
        book: "Vedic Computing",
        featured: true
    },
    {
        id: 6,
        text: "I was skeptical about the premise, but Neural Shackle delivers a compelling story with characters I genuinely cared about. The technical aspects are well-researched and the philosophical questions it raises stayed with me long after finishing.",
        author: "SkepticalReader",
        source: "Amazon",
        rating: 4,
        book: "Neural Shackle",
        featured: false
    }
];

// Initialize reviews section
document.addEventListener('DOMContentLoaded', function() {
    const reviewsCarousel = document.querySelector('.reviews-carousel');
    
    if (!reviewsCarousel) return;
    
    // Filter featured reviews
    const featuredReviews = reviews.filter(review => review.featured);
    
    // Add reviews to carousel
    featuredReviews.forEach(review => {
        const reviewCard = createReviewCard(review);
        reviewsCarousel.appendChild(reviewCard);
    });
    
    // Initialize carousel functionality
    initReviewsCarousel();
    
    // Function to create a review card
    function createReviewCard(review) {
        const card = document.createElement('div');
        card.className = 'review-card';
        
        // Create star rating HTML
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                starsHtml += '<i class="fas fa-star accent-gold"></i>';
            } else {
                starsHtml += '<i class="far fa-star"></i>';
            }
        }
        
        card.innerHTML = `
            <div class="review-content">
                <div class="review-header">
                    <div class="review-rating">
                        ${starsHtml}
                    </div>
                    <div class="review-source">
                        <span>${review.source}</span>
                    </div>
                </div>
                <div class="review-text">
                    <p>"${review.text}"</p>
                </div>
                <div class="review-footer">
                    <div class="review-author">
                        <span>— ${review.author}</span>
                    </div>
                    <div class="review-book">
                        <span>on ${review.book}</span>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }
});

// Reviews carousel functionality
function initReviewsCarousel() {
    const carousel = document.querySelector('.reviews-carousel');
    if (!carousel) return;
    
    const cards = carousel.querySelectorAll('.review-card');
    if (cards.length <= 1) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth;
    const cardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight);
    const totalWidth = cardWidth + cardMargin;
    
    // Create navigation buttons
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-nav prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-nav next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    // Add buttons to carousel container
    const carouselContainer = carousel.parentElement;
    carouselContainer.appendChild(prevButton);
    carouselContainer.appendChild(nextButton);
    
    // Navigation button event listeners
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < cards.length - getVisibleCards()) {
            currentIndex++;
            updateCarouselPosition();
        }
    });
    
    // Update carousel position
    function updateCarouselPosition() {
        carousel.style.transform = `translateX(-${currentIndex * totalWidth}px)`;
        
        // Update button states
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= cards.length - getVisibleCards();
        
        // Update visual state
        prevButton.classList.toggle('disabled', prevButton.disabled);
        nextButton.classList.toggle('disabled', nextButton.disabled);
    }
    
    // Calculate number of visible cards based on viewport width
    function getVisibleCards() {
        const carouselWidth = carousel.parentElement.offsetWidth;
        return Math.floor(carouselWidth / totalWidth);
    }
    
    // Initialize position and button states
    updateCarouselPosition();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        // Recalculate card dimensions
        const newCardWidth = cards[0].offsetWidth;
        const newCardMargin = parseInt(window.getComputedStyle(cards[0]).marginRight);
        
        // Update total width
        totalWidth = newCardWidth + newCardMargin;
        
        // Adjust current index if needed
        const maxIndex = cards.length - getVisibleCards();
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        // Update position
        updateCarouselPosition();
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left, go to next
            if (currentIndex < cards.length - getVisibleCards()) {
                currentIndex++;
                updateCarouselPosition();
            }
        }
        
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right, go to previous
            if (currentIndex > 0) {
                currentIndex--;
                updateCarouselPosition();
            }
        }
    }
}
