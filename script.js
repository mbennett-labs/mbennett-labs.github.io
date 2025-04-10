// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for fixed header
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Highlight active section on scroll
    const sections = document.querySelectorAll('section');
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Initial call to highlight the correct section
    highlightNavOnScroll();
    
    // Throttle scroll event to improve performance
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                highlightNavOnScroll();
                isScrolling = false;
            });
            
            isScrolling = true;
        }
    });
    
    // Add animation to cards and elements when they come into view
    const animatedElements = document.querySelectorAll('.strength-card, .project-card, .timeline-item, .blog-card');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });
    
    // Add initial hidden class and then observe
    animatedElements.forEach(element => {
        element.classList.add('hidden-element');
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .hidden-element {
            opacity: 0;
            transform: translateY(20px);
            transition: none;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
    `;
    document.head.appendChild(style);
    
    // Add typing effect to the header tagline
    const taglineElement = document.querySelector('.header-content p');
    if (taglineElement) {
        const originalText = taglineElement.textContent;
        taglineElement.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                taglineElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Adjust typing speed here
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }
});
