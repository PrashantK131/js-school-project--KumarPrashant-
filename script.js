document.addEventListener('DOMContentLoaded', () => {
    const events = [
        {
            "year": 1969,
            "title": "ARPANET - Birth of the Internet",
            "description": "ARPANET was the predecessor to the modern internet, first deployed connecting four universities. This groundbreaking network laid the foundation for global digital communication and modern networking protocols.",
            "imageURL": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&h=150&fit=crop",
            "category": "Networking",
            "wikipediaURL": "https://en.wikipedia.org/wiki/ARPANET"
        },
        {
            "year": 1977,
            "title": "Introduction of the First Personal Computer",
            "description": "The first personal computer was introduced in 1977, which revolutionized the way people interacted with technology. These early systems made computing accessible to individuals and transformed various industries.",
            "imageURL": "https://www.researchgate.net/profile/Jesse-Stein/publication/272146002/figure/fig1/AS:997096035475457@1614737628795/Apple-II-computer-including-disk-drives-and-a-monitor-first-released-in-1977-by-Apple_Q320.jpg",
            "category": "Hardware",
            "wikipediaURL": "https://en.wikipedia.org/wiki/Personal_computer"
        },
        {
            "year": 1981,
            "title": "IBM PC Launch",
            "description": "IBM launched its personal computer, setting the standard for PC architecture that dominated the industry for decades. Its open architecture encouraged third-party development and widespread adoption, establishing the foundation for modern PC computing.",
            "imageURL": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=150&fit=crop",
            "category": "Hardware",
            "wikipediaURL": "https://en.wikipedia.org/wiki/IBM_PC"
        },
        {
            "year": 1985,
            "title": "Microsoft Windows 1.0 Launch",
            "description": "Microsoft Windows 1.0 introduced the first graphical user interface from Microsoft, revolutionizing personal computing with point-and-click functionality. This groundbreaking operating system laid the foundation for modern desktop computing and established Microsoft as a dominant force in the software industry.",
            "imageURL": "https://geeks.co.uk/wp-content/uploads/2019/11/MicrosoftTeams-image.png",
            "category": "Software",
            "wikipediaURL": "https://en.wikipedia.org/wiki/Windows_1.0"
        },
        {
            "year": 1991,
            "title": "World Wide Web Goes Live",
            "description": "Tim Berners-Lee's invented the World Wide Web which was made publicly available, leading to the rapid growth of the internet. This invention regularized information and connected the world in unprecedented ways.",
            "imageURL": "https://static.vecteezy.com/system/resources/previews/007/629/964/non_2x/world-wide-web-line-icon-vector.jpg",
            "category": "Networking",
            "wikipediaURL": "https://en.wikipedia.org/wiki/World_Wide_Web"
        },
        {
            "year": 1995,
            "title": "JavaScript Is Created",
            "description": "Brendan Eich created JavaScript for Netscape Navigator, laying the foundation for dynamic web pages. This scripting language became essential for front-end development and interactive websites.",
            "imageURL": "https://static.vecteezy.com/system/resources/previews/027/127/463/non_2x/javascript-logo-javascript-icon-transparent-free-png.png",
            "category": "Software",
            "wikipediaURL": "https://en.wikipedia.org/wiki/JavaScript"
        },
        {
            "year": 2004,
            "title": "Facebook is Founded",
            "description": "Facebook was launched by Mark Zuckerberg when he was in Harvard University which changed the landscape of social interaction. Facebook grew into a global phenomenon connecting billions of people, influencing culture and communication.",
            "imageURL": "https://logowik.com/content/uploads/images/facebook3939.logowik.com.webp",
            "category": "Social Media",
            "wikipediaURL": "https://en.wikipedia.org/wiki/Facebook"
        },
        {
            "year": 2007,
            "title": "First iPhone is Released",
            "description": "Apple introduced a revolutionary smartphone named as iPhone that combined a phone, an iPod and an internet communicator. The iPhone's touch-based interface and app ecosystem set the standard for the modern mobile industry.",
            "imageURL": "https://images.freeimages.com/fic/images/icons/2309/touchscreen_icons/512/2007_apple_iphone.png",
            "category": "Hardware",
            "wikipediaURL": "https://en.wikipedia.org/wiki/IPhone"
        }
    ];

    // Function to toggle light/dark theme
    window.toggleTheme = function() {
        const body = document.body;
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
        } else {
            body.setAttribute('data-theme', 'dark');
        }
    };

    // Function to open the modal and display event details
    window.showModal = function(event) {
        const modal = document.getElementById('modal');
        const modalDetails = document.getElementById('modal-details');
        modalDetails.innerHTML = `
            <h2>${event.title}</h2>
            <p><strong>Category:</strong> ${event.category}</p>
            <p>${event.description}</p>
            <img src="${event.imageURL}" alt="${event.title}" style="width: 100%; border-radius: 8px; margin-top: 1rem;" />
            <a href="${event.wikipediaURL}" class="learn-more" target="_blank" rel="noopener noreferrer" style="display:block; margin-top:1rem; text-align: center;">Visit Wikipedia</a>
        `;
        modal.style.display = 'flex';
    };

    window.closeModal = function() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    };

    // Function to activate a timeline dot and show its event card
    window.activateDot = function(dot, event) {

        document.querySelectorAll('.timeline-dot').forEach(d => d.classList.remove('active'));
        
        dot.classList.add('active');

        document.querySelectorAll('.event-card').forEach(card => card.classList.remove('show'));

        const eventCard = document.getElementById(`event-${event.year}`);
        if (eventCard) {
            eventCard.classList.add('show');
        }
    };

    const timelineLine = document.querySelector('.timeline-line');
    const timelineSection = document.getElementById('timeline');

    // Sorting events by year
    events.sort((a, b) => a.year - b.year);

    // Rendering timeline dots and years
    events.forEach((event, index) => {
        const position = (index / (events.length - 1)) * 100;

        const dot = document.createElement('div');
        dot.classList.add('timeline-dot');
        dot.style.left = `${position}%`;
        dot.setAttribute('data-year', event.year);
        dot.onclick = () => activateDot(dot, event);
        timelineLine.appendChild(dot);

        const yearLabel = document.createElement('div');
        yearLabel.classList.add('year');
        yearLabel.style.left = `${position}%`;
        yearLabel.textContent = event.year;
        yearLabel.onclick = () => activateDot(dot, event);
        timelineLine.appendChild(yearLabel);

        // Rendering the event card
        const eventCard = document.createElement('article');
        eventCard.classList.add('event-card');
        eventCard.id = `event-${event.year}`;
        eventCard.innerHTML = `
            <header class="event-header">
                <div class="event-year">${event.year}</div>
                <h2 class="event-title">${event.title}</h2>
            </header>
            <div class="event-content">
                <figure class="event-image">
                    <img src="${event.imageURL}" alt="${event.title}" />
                </figure>
                <div class="event-description">
                    <p>${event.description}</p>
                    <a href="${event.wikipediaURL}" class="learn-more" target="_blank" rel="noopener noreferrer">Learn More</a>
                </div>
            </div>
        `;
        timelineSection.appendChild(eventCard);
    });

    // Activating the first event by default
    if (events.length > 0) {
        const firstDot = document.querySelector('.timeline-dot');
        const firstEvent = events[0];
        activateDot(firstDot, firstEvent);
    }

    document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
});