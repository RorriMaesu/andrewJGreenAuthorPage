/**
 * Blog data and functionality for Andrew J. Green Author Website
 */

// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Designing AI Agents Like Yogic Mind-Functions",
        excerpt: "How ancient Vedic concepts of mind can inform modern AI architecture and create more balanced systems.",
        image: "images/blog-ai-yoga.jpg",
        date: "2025-04-15",
        category: "Technology",
        url: "blog-ai-yoga.html",
        featured: true
    },
    {
        id: 2,
        title: "What Tesla Coils Taught Me About Plot Twists",
        excerpt: "The unexpected parallels between electrical engineering principles and crafting compelling narrative arcs.",
        image: "images/blog-tesla-plot.jpg",
        date: "2025-03-22",
        category: "Writing",
        url: "blog-tesla-plot.html",
        featured: true
    },
    {
        id: 3,
        title: "Tower Climbing and the Writer's Journey",
        excerpt: "How scaling 300-foot telecommunications towers prepared me for the ups and downs of a writing career.",
        image: "images/blog-tower-writing.jpg",
        date: "2025-02-10",
        category: "Personal",
        url: "blog-tower-writing.html",
        featured: true
    },
    {
        id: 4,
        title: "The Quantum Physics of Character Development",
        excerpt: "Using quantum principles as a framework for creating complex, multi-dimensional characters.",
        image: "images/blog-quantum-character.jpg",
        date: "2025-01-18",
        category: "Writing",
        url: "blog-quantum-character.html",
        featured: false
    },
    {
        id: 5,
        title: "Meditation Techniques for Coders",
        excerpt: "Simple mindfulness practices that can improve focus, reduce bugs, and enhance creative problem-solving.",
        image: "images/blog-meditation-coding.jpg",
        date: "2024-12-05",
        category: "Wellness",
        url: "blog-meditation-coding.html",
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
