document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current nav link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Header background opacity on scroll
    function updateHeaderBackground() {
        const header = document.querySelector('.header');
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateHeaderBackground();
        animateOnScroll();
    });

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.experience-item, .leadership-item, .volunteer-item, .activity, .contact-link');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize animations
    function initializeAnimations() {
        const elements = document.querySelectorAll('.experience-item, .leadership-item, .volunteer-item, .activity, .contact-link');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        });
    }

    // Typing effect for hero tagline
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect for hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        // Add a small delay before starting the typing effect
        setTimeout(() => {
            typeWriter(heroTagline, originalText, 80);
        }, 1000);
    }

    // Smooth reveal animation for sections
    function revealSections() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(50px)';
            section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 200 * index);
        });
    }

    // Add hover effects for project cards
    function addProjectHoverEffects() {
        const projects = document.querySelectorAll('.project');
        
        projects.forEach(project => {
            project.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
            });
            
            project.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Add click-to-copy functionality for contact links (optional)
    function addCopyToClipboard() {
        const contactLinks = document.querySelectorAll('.contact-link');
        
        contactLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // If it's not an external link, prevent default and copy text
                const handle = this.querySelector('.handle').textContent;
                
                // Only for demonstration - in a real site, you'd want proper links
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    // Create temporary textarea to copy text
                    const textarea = document.createElement('textarea');
                    textarea.value = handle;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    
                    // Show feedback
                    const originalText = this.querySelector('.handle').textContent;
                    this.querySelector('.handle').textContent = 'Copied!';
                    
                    setTimeout(() => {
                        this.querySelector('.handle').textContent = originalText;
                    }, 2000);
                }
            });
        });
    }

    // Achievement counter animation
    function animateCounters() {
        const achievements = document.querySelectorAll('.achievement');
        
        achievements.forEach(achievement => {
            const text = achievement.textContent;
            const numbers = text.match(/\d+/g);
            
            if (numbers) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Add a subtle pulse animation
                            entry.target.style.animation = 'pulse 0.6s ease-in-out';
                            observer.unobserve(entry.target);
                        }
                    });
                });
                
                observer.observe(achievement);
            }
        });
    }

    // Add pulse animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .nav-menu.active {
            transform: translateX(0) !important;
        }
        
        .nav-menu a.active {
            color: var(--primary-color);
        }
        
        .nav-menu a.active::after {
            width: 100%;
        }
        
        body.nav-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Initialize all functionality
    initializeAnimations();
    addProjectHoverEffects();
    animateCounters();
    
    // Initial call to set active nav link
    updateActiveNavLink();
    updateHeaderBackground();
    
    // Trigger initial animation check
    setTimeout(animateOnScroll, 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    }
});

// Smooth scrolling fallback for browsers that don't support CSS scroll-behavior
if (!CSS.supports('scroll-behavior', 'smooth')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}