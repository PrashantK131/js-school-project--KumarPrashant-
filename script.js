function toggleTheme() {
    const body = document.body;
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
}

function showModal(eventId) {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
}

function activateDot(dot) {
    // Remove active class from all dots
    document.querySelectorAll('.timeline-dot').forEach(d => d.classList.remove('active'));
    // Add active class to clicked dot
    dot.classList.add('active');
    
    // Hide all event cards
    document.querySelectorAll('.event-card').forEach(card => {
        card.classList.remove('show');
    });
    
    // Show the corresponding event card
    const year = dot.id.replace('dot', '');
    const eventCard = document.getElementById(`event-${year}`);
    if (eventCard) {
        eventCard.classList.add('show');
    }
}

// Close modal when clicking outside of it
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
});