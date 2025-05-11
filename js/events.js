/**
 * Events data and functionality for Andrew J. Green Author Website
 */

// Events data
const events = [
    {
        id: 1,
        title: "Neural Shackle Book Club Discussion",
        date: "2025-06-15",
        time: "7:00 PM",
        location: "Virtual Event (Zoom)",
        description: "Join our online book club discussion of Neural Shackle. We'll explore the dystopian world where emotions are harvested and discuss the philosophical themes of the novel.",
        url: "#",
        featured: true
    },
    {
        id: 2,
        title: "Vedic Astrology Basics Webinar",
        date: "2025-07-10",
        time: "2:00 PM",
        location: "Online",
        description: "A beginner-friendly introduction to Vedic Astrology based on concepts from Codex of the Celestial Dream. Learn about the fundamental principles that can help you understand your cosmic blueprint.",
        url: "#",
        featured: true
    },
    {
        id: 3,
        title: "S.I.N. Code Trilogy Book 2 Announcement",
        date: "2025-08-20",
        time: "12:00 PM",
        location: "Social Media & Newsletter",
        description: "Stay tuned for a special announcement about the second book in the S.I.N. Code Trilogy. Subscribers to the newsletter will receive exclusive content and early access.",
        url: "#newsletter",
        featured: true
    },
    {
        id: 4,
        title: "Practical Vedic Astrology Workshop",
        date: "2025-09-15",
        time: "10:00 AM - 4:00 PM",
        location: "Virtual Workshop",
        description: "An in-depth workshop based on Compass of the Celestial Dream, focusing on practical applications of Vedic Astrology in your daily life. Limited spots available.",
        url: "#",
        featured: true
    },
    {
        id: 5,
        title: "Author Q&A Session",
        date: "2025-10-05",
        time: "6:30 PM",
        location: "Instagram Live",
        description: "Join me for a live Q&A session where I'll answer your questions about my books, the writing process, and the intersection of technology and spirituality in my work.",
        url: "#",
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
