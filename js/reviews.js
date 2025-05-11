/**
 * Reviews data and functionality for Andrew J. Green Author Website
 */

// Reviews data
const reviews = [
    {
        id: 1,
        text: "A wild and vivid journey through the Nakshatras. Be forewarned that there are a lot of very unusual drawings and depictions in this book, but nevertheless, it's one of the best books on Nakshatras around. I have a huge collection of books on the Nakshatras, and this is one of the best. The author clearly understands his subject and communicates well about them.",
        author: "Haf",
        source: "Amazon",
        rating: 5,
        book: "Codex of the Celestial Dream",
        featured: true,
        verified: false,
        date: "June 9, 2025"
    },
    {
        id: 2,
        text: "Beautifully written! Incredible book! Very thorough and well written. Easy to learn the nakshatras through his way of writing. I highly recommend for all those who are interested into taking a deeper dive into Vedic Astrology!",
        author: "Kristal Grice",
        source: "Amazon",
        rating: 5,
        book: "Codex of the Celestial Dream",
        featured: true,
        verified: false,
        date: "Apr 8, 2023"
    },
    {
        id: 3,
        text: "Influential for Western to Vedic astrologers. If you are just beginning your studies in astrology or a professional Western astrologer this book bridges the gap to understanding jyotish. Beautifully illustrated and thought provoking. Highly recommend.",
        author: "Amazon Customer (Vay)",
        source: "Amazon",
        rating: 5,
        book: "Codex of the Celestial Dream",
        featured: true,
        verified: false,
        date: "Apr 10, 2023"
    },
    {
        id: 4,
        text: "Very informative and knowledgeable. Really loving this book so much! Anyone interested in all things celestial will benefit from this work of art. Thank you 🙏",
        author: "Amberlove",
        source: "Amazon",
        rating: 5,
        book: "Codex of the Celestial Dream",
        featured: true,
        verified: false,
        date: "Apr 8, 2023"
    },
    {
        id: 5,
        text: "Vedic Astrology Explained. Simplified explanation of Ancient Science of predictions. Vedic Astrology...",
        author: "Shravan (India)",
        source: "Amazon",
        rating: 4,
        book: "Codex of the Celestial Dream",
        featured: true,
        verified: true,
        date: "Apr 8, 2023"
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
                        ${review.verified ? '<span class="verified-badge">Verified Purchase</span>' : ''}
                    </div>
                </div>
                <div class="review-text">
                    <p>"${review.text}"</p>
                </div>
                <div class="review-footer">
                    <div class="review-author">
                        <span>— ${review.author}</span>
                    </div>
                    <div class="review-meta">
                        <span class="review-date">${review.date}</span>
                        <span class="review-book">on ${review.book}</span>
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
        const totalWidth = newCardWidth + newCardMargin;

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
