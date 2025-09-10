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
                navLinks.forEach(link => link.classList.remove('active'));
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
            header.style.background = 'rgba(247, 250, 252, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(26, 54, 93, 0.1)';
        } else {
            header.style.background = 'rgba(247, 250, 252, 0.95)';
            header.style.boxShadow = 'none';
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateHeaderBackground();
        animateOnScroll();
        parallaxEffect();
    });

    // Parallax effect for hero section
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        const heroParticles = document.querySelector('.hero-particles');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroParticles && scrolled < hero.offsetHeight) {
            heroParticles.style.transform = `translateY(${rate}px)`;
        }
    }

    // Advanced scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.skill-category, .project-item, .contact-item, .experience-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    // Observe sections for scroll animation
    const sectionsToAnimate = document.querySelectorAll('.skills, .projects, .contact, .experience');
    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

    // Typing effect for hero tagline
    function typeWriter(element, text, speed = 80) {
        let i = 0;
        element.textContent = '';
        element.style.borderRight = '2px solid rgba(247, 250, 252, 0.8)';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Blinking cursor effect
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        type();
    }

    // Initialize typing effect for hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        setTimeout(() => {
            typeWriter(heroTagline, originalText, 100);
        }, 1200);
    }

    // Add magnetic effect to buttons and cards
    function addMagneticEffect() {
        const magneticElements = document.querySelectorAll('.btn, .skill-category, .project-item, .contact-item');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                const moveX = deltaX * 10;
                const moveY = deltaY * 10;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            });
            
            element.addEventListener('mouseleave', function() {
                element.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // Add floating animation to skill tags
    function addSkillTagAnimations() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            tag.style.animationDelay = `${index * 0.1}s`;
            tag.classList.add('float-in');
            
            // Add hover sound effect (visual feedback)
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 4px 12px rgba(214, 158, 46, 0.3)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }

    // Add ripple effect to clickable elements
    function addRippleEffect() {
        const rippleElements = document.querySelectorAll('.btn, .toggle-details, .contact-item');
        
        rippleElements.forEach(element => {
            element.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                if (this.style.position !== 'relative') {
                    this.style.position = 'relative';
                }
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Smooth reveal animation for project cards
    function revealProjectCards() {
        const projectCards = document.querySelectorAll('.project-item');
        
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 200 * index);
        });
    }

    // Add glowing effect to profile image on scroll
    function addProfileGlow() {
        const profileGlow = document.querySelector('.profile-glow');
        const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        
        if (profileGlow) {
            const glowIntensity = Math.sin(scrollProgress * Math.PI * 2) * 0.5 + 0.5;
            profileGlow.style.opacity = 0.2 + (glowIntensity * 0.4);
            profileGlow.style.filter = `blur(${20 + glowIntensity * 20}px)`;
        }
    }

    // Enhanced scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.experience-item, .skill-category, .project-item, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        addProfileGlow();
    }

    // Initialize all animations and effects
    function initializeAnimations() {
        const elements = document.querySelectorAll('.experience-item, .skill-category, .project-item, .contact-item');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        // Initialize project cards with stagger
        const projectCards = document.querySelectorAll('.project-item');
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.9)';
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    }

    // Smooth page transitions
    function addPageTransitions() {
        // Add loading animation
        const body = document.body;
        body.style.opacity = '0';
        body.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            body.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            body.style.opacity = '1';
            body.style.transform = 'translateY(0)';
        }, 100);
    }

    // Add dynamic CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to { transform: scale(2); opacity: 0; }
        }
        
        @keyframes float-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .float-in {
            animation: float-in 0.6s ease-out forwards;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .skill-tag {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .nav-menu.active {
            transform: translateX(0) !important;
        }
        
        .nav-menu a.active {
            color: var(--secondary-color);
        }
        
        .nav-menu a.active::after {
            width: 100%;
        }
        
        body.nav-open {
            overflow: hidden;
        }
        
        /* Enhanced hover effects */
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.6s;
        }
        
        .btn:hover::before {
            left: 100%;
        }
        
        /* Pulsing glow effect */
        @keyframes pulse-glow {
            0%, 100% { 
                box-shadow: 0 0 20px rgba(214, 158, 46, 0.2);
            }
            50% { 
                box-shadow: 0 0 40px rgba(214, 158, 46, 0.4), 0 0 60px rgba(214, 158, 46, 0.2);
            }
        }
        
        .profile-image {
            animation: pulse-glow 4s infinite;
        }
        
        /* Stagger animation for grid items */
        .skills-grid .skill-category,
        .projects-grid .project-item,
        .contact-grid .contact-item {
            transform: translateY(30px);
            opacity: 0;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Text reveal animation */
        .hero-tagline {
            overflow: hidden;
            white-space: nowrap;
        }
    `;
    document.head.appendChild(style);

    // Initialize all functionality
    addPageTransitions();
    initializeAnimations();
    addMagneticEffect();
    addSkillTagAnimations();
    addRippleEffect();
    updateActiveNavLink();
    updateHeaderBackground();
    
    // Delayed initialization for better performance
    setTimeout(() => {
        animateOnScroll();
        revealProjectCards();
    }, 200);

    // Performance optimized scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            parallaxEffect();
        }, 10);
    }, { passive: true });
});

// Toggle experience details functionality with enhanced animations
function toggleExperienceDetails(button) {
    const experienceItem = button.closest('.experience-item');
    const details = experienceItem.querySelector('.experience-details');
    
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        button.textContent = '詳細を閉じる';
        button.classList.add('expanded');
        
        // Enhanced reveal animation
        details.style.opacity = '0';
        details.style.transform = 'translateY(-20px) scale(0.95)';
        details.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
            details.style.opacity = '1';
            details.style.transform = 'translateY(0) scale(1)';
            
            // Animate child elements
            const childElements = details.querySelectorAll('.project, .project-detail');
            childElements.forEach((child, index) => {
                child.style.opacity = '0';
                child.style.transform = 'translateX(-20px)';
                child.style.transition = 'all 0.3s ease-out';
                
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateX(0)';
                }, 100 * (index + 1));
            });
        }, 50);
    } else {
        // Enhanced hide animation
        details.style.opacity = '0';
        details.style.transform = 'translateY(-20px) scale(0.95)';
        
        setTimeout(() => {
            details.style.display = 'none';
            button.textContent = '詳細を見る';
            button.classList.remove('expanded');
        }, 400);
    }
}

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

// Add easter egg - konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg: Add rainbow animation to the entire page
        document.body.style.animation = 'rainbow 2s infinite';
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
            rainbowStyle.remove();
        }, 10000);
        
        konamiCode = [];
    }
});