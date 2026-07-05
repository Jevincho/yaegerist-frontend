// Navigation functionality for static site

// Smooth scroll function
function smoothScroll(targetId) {
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Hamburger menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Add smooth scroll to About Us link
    const aboutLinks = document.querySelectorAll('a[href="#about-info"]');
    aboutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('about-info');
        });
    });
});
