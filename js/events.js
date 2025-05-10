/**
 * Events data and functionality for Andrew J. Green Author Website
 */

// Events data
const events = [
    {
        id: 1,
        title: "Quantum Dharma Book Launch",
        date: "2025-06-15",
        time: "7:00 PM",
        location: "Powell's Books, Portland, OR",
        description: "Join me for the official launch of Quantum Dharma, the second book in the Vedic Code series. I'll be reading excerpts, answering questions, and signing copies.",
        url: "#",
        featured: true
    },
    {
        id: 2,
        title: "Tech & Consciousness Podcast Interview",
        date: "2025-05-20",
        time: "Online",
        location: "The Coding Mystic Podcast",
        description: "I'll be discussing the intersection of technology and ancient wisdom with host Maya Indira on this popular tech philosophy podcast.",
        url: "https://codingmystic.com",
        featured: true
    },
    {
        id: 3,
        title: "Vedic Computing Workshop",
        date: "2025-07-10",
        time: "1:00 PM - 5:00 PM",
        location: "TechHub Conference Center, Seattle, WA",
        description: "A hands-on workshop exploring how ancient Vedic principles can be applied to modern software architecture and problem-solving.",
        url: "#",
        featured: true
    },
    {
        id: 4,
        title: "Virtual Book Club Discussion",
        date: "2025-05-28",
        time: "6:30 PM",
        location: "Zoom (Registration Required)",
        description: "Join our virtual book club discussion of Neural Shackle. We'll explore the themes, characters, and philosophical questions raised in the book.",
        url: "#",
        featured: true
    },
    {
        id: 5,
        title: "SciFi & Philosophy Convention Panel",
        date: "2025-08-15",
        time: "3:30 PM",
        location: "Emerald City Comic Con, Seattle, WA",
        description: "I'll be on the 'Ancient Wisdom in Modern Science Fiction' panel with several other authors exploring how ancient philosophical traditions influence contemporary sci-fi.",
        url: "https://emeraldcitycomiccon.com",
        featured: true
    }
];

// Initialize events section
document.addEventListener('DOMContentLoaded', function() {
    const timeline = document.querySelector('.timeline');
    
    if (!timeline) return;
    
    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
    });
    
    // Add events to timeline
    sortedEvents.forEach(event => {
        const timelineItem = createTimelineItem(event);
        timeline.appendChild(timelineItem);
    });
    
    // Function to create a timeline item
    function createTimelineItem(event) {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        // Format date
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Check if event is in the future
        const isFuture = eventDate > new Date();
        
        item.innerHTML = `
            <div class="timeline-dot ${isFuture ? 'future' : 'past'}"></div>
            <div class="timeline-content">
                <div class="event-date">${formattedDate}</div>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-details">
                    <p><i class="fas fa-clock"></i> ${event.time}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                </div>
                <p class="event-description">${event.description}</p>
                ${event.url ? `<a href="${event.url}" class="event-link" target="_blank">More Info <i class="fas fa-external-link-alt"></i></a>` : ''}
            </div>
        `;
        
        return item;
    }
    
    // Add animation to timeline items
    animateTimelineItems();
});

// Animate timeline items on scroll
function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) return;
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe each timeline item
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Add event to calendar functionality
function addToCalendar(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    // Format date and time for calendar
    const eventDate = new Date(event.date);
    const year = eventDate.getFullYear();
    const month = String(eventDate.getMonth() + 1).padStart(2, '0');
    const day = String(eventDate.getDate()).padStart(2, '0');
    
    // Parse time (assuming format like "7:00 PM")
    let hours = 0;
    let minutes = 0;
    
    if (event.time && event.time.includes(':')) {
        const timeParts = event.time.split(':');
        hours = parseInt(timeParts[0]);
        
        // Handle minutes and AM/PM
        if (timeParts[1].includes('PM') && hours < 12) {
            hours += 12;
        }
        
        if (timeParts[1].includes('AM') && hours === 12) {
            hours = 0;
        }
        
        minutes = parseInt(timeParts[1]);
    }
    
    // Format for Google Calendar
    const startDate = `${year}${month}${day}T${String(hours).padStart(2, '0')}${String(minutes).padStart(2, '0')}00`;
    const endDate = `${year}${month}${day}T${String(hours + 2).padStart(2, '0')}${String(minutes).padStart(2, '0')}00`; // Assume 2 hours duration
    
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    // Open calendar in new tab
    window.open(calendarUrl, '_blank');
}
