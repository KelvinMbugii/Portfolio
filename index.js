// Selecting DOM elements
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const section = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('.header');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Toggle menu for mobile
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll sections active link
window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Add sticky header
    header.classList.toggle('sticky', window.scrollY > 100);

    // Close mobile menu when scrolling
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Typed effect for home section
document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('.multiple-text', {
        strings: ['Frontend Developer', 'Web Developer', 'UI/UX Designer', 'Graphic Designer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
});

// Initialize the database
const db = new SimpleDatabase();

// Contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple form validation
    if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in all required fields.';
        formStatus.style.color = 'red';
        return;
    }
    
    // Save message to database
    try {
        db.addMessage({
            name,
            email,
            phone,
            subject,
            message
        });
        
        formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
        formStatus.style.color = 'var(--main-color)';
        
        // Reset form
        contactForm.reset();
    } catch (error) {
        console.error('Error saving message:', error);
        formStatus.textContent = 'There was an error sending your message. Please try again.';
        formStatus.style.color = 'red';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on scroll (basic implementation)
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.services-box, .portfolio-box, .contact-card');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .services-box, .portfolio-box, .contact-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .services-box.show, .portfolio-box.show, .contact-card.show {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Simple Database Class 
class SimpleDatabase {
    constructor() {
        this.data = {
            messages: []
        };
        this.loadFromLocalStorage();
    }

    // Load data from localStorage (simulating a database)
    loadFromLocalStorage() {
        const storedData = localStorage.getItem('portfolioData');
        if (storedData) {
            try {
                this.data = JSON.parse(storedData);
            } catch (e) {
                console.error('Failed to load data from localStorage:', e);
                // Initialize with empty data if parsing fails
                this.data = { messages: [] };
            }
        }
    }

    // Save data to localStorage
    saveToLocalStorage() {
        localStorage.setItem('portfolioData', JSON.stringify(this.data));
    }

    // Add a new message to the database
    addMessage(messageData) {
        const newMessage = {
            id: Date.now(), // Simple unique ID
            timestamp: new Date().toISOString(),
            ...messageData,
            status: 'unread'
        };
        
        this.data.messages.push(newMessage);
        this.saveToLocalStorage();
        return newMessage;
    }
};