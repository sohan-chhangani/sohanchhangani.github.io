document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Initialize skill bars animation
    const skillBars = document.querySelectorAll('.skill-item');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to animate skill bars
    function animateSkillBars() {
        skillBars.forEach(skill => {
            if (isInViewport(skill)) {
                const level = skill.getAttribute('data-level');
                const progressBar = skill.querySelector('.skill-progress');
                progressBar.style.width = level + '%';
            }
        });
    }
    
    // Initial check for elements in viewport
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to a server
            // For now, we'll just log it and show a success message
            console.log({
                name,
                email,
                subject,
                message
            });
            
            // Show success message (in a real implementation, this would happen after successful API call)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Typing effect for hero section
    const heroDescription = document.querySelector('.hero-description');
    const text = heroDescription.textContent;
    heroDescription.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroDescription.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
    
    // Projects hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-image i').style.transform = 'scale(1.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-image i').style.transform = 'scale(1)';
        });
    });
    
    // Add fade-in animation to sections when they come into view
    const sections = document.querySelectorAll('section');
    
    const fadeInOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        });
    }, fadeInOptions);
    
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        fadeInObserver.observe(section);
    });
    
    // Add fade-in effect to already visible sections (above the fold)
    setTimeout(() => {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
                fadeInObserver.unobserve(section);
            }
        });
    }, 300);
    
    // Add CSS class for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});