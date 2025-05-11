/**
 * Blog data and functionality for Andrew J. Green Author Website
 */

// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "The S.I.N. Code: Exploring Emotion as Currency",
        excerpt: "A deep dive into the dystopian world of Neural Shackle, where human emotions are harvested and guilt is banked.",
        image: "images/blog-neural-shackle.jpg",
        date: "2024-05-01",
        category: "Fiction",
        url: "#",
        featured: true
    },
    {
        id: 2,
        title: "Understanding Nakshatras: The Lunar Mansions",
        excerpt: "How the 27 Nakshatras of Vedic Astrology offer profound insights into your personality and life path.",
        image: "images/blog-nakshatras.jpg",
        date: "2024-04-15",
        category: "Vedic Astrology",
        url: "#",
        featured: true
    },
    {
        id: 3,
        title: "From Theory to Practice: Applying Vedic Wisdom",
        excerpt: "Practical techniques from Compass of the Celestial Dream that you can implement in your daily life.",
        image: "images/blog-vedic-practice.jpg",
        date: "2024-03-22",
        category: "Spirituality",
        url: "#",
        featured: true
    },
    {
        id: 4,
        title: "The Connection Between Code and Consciousness",
        excerpt: "Exploring the fascinating parallels between software architecture and the structure of human consciousness.",
        image: "images/blog-code-consciousness.jpg",
        date: "2024-02-18",
        category: "Philosophy",
        url: "#",
        featured: false
    },
    {
        id: 5,
        title: "Supporting Save the Children of India",
        excerpt: "Why I've chosen to donate 72% of proceeds from Codex of the Celestial Dream to this important cause.",
        image: "images/blog-charity.jpg",
        date: "2024-01-05",
        category: "Charity",
        url: "#",
        featured: false
    }
];

// Initialize blog section
document.addEventListener('DOMContentLoaded', function() {
    const blogGrid = document.querySelector('.blog-grid');

    if (!blogGrid) return;

    // Filter featured blog posts
    const featuredPosts = blogPosts.filter(post => post.featured);

    // Add blog posts to grid
    featuredPosts.forEach(post => {
        const blogCard = createBlogCard(post);
        blogGrid.appendChild(blogCard);
    });

    // Function to create a blog card
    function createBlogCard(post) {
        const card = document.createElement('div');
        card.className = 'blog-card';

        // Format date
        const postDate = new Date(post.date);
        const formattedDate = postDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        card.innerHTML = `
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}">
                <span class="blog-category">${post.category}</span>
            </div>
            <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-date">${formattedDate}</p>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="${post.url}" class="blog-link">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;

        return card;
    }

    // YouTube video functionality
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        const videoId = videoPlaceholder.getAttribute('data-video-id');

        if (videoId) {
            // Set background image if available
            videoPlaceholder.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`;

            // Add click event to play video
            videoPlaceholder.addEventListener('click', () => {
                videoPlaceholder.innerHTML = `
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1"
                    title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
                `;
            });
        }
    }
});

// Function to load more blog posts
function loadMorePosts() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    // Get current posts
    const currentPosts = blogGrid.querySelectorAll('.blog-card');
    const currentPostIds = Array.from(currentPosts).map(post => {
        return parseInt(post.getAttribute('data-post-id'));
    });

    // Filter posts not already displayed
    const remainingPosts = blogPosts.filter(post => {
        return !currentPostIds.includes(post.id);
    });

    // Get next 3 posts
    const nextPosts = remainingPosts.slice(0, 3);

    // Add posts to grid
    nextPosts.forEach(post => {
        const blogCard = createBlogCard(post);
        blogGrid.appendChild(blogCard);
    });

    // Hide load more button if no more posts
    if (nextPosts.length < 3) {
        const loadMoreButton = document.querySelector('.load-more-button');
        if (loadMoreButton) {
            loadMoreButton.style.display = 'none';
        }
    }
}
