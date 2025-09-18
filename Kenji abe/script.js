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
        parallaxBackground();
    });

    // Enhanced parallax effect for hero background
    function parallaxBackground() {
        const scrolled = window.pageYOffset;
        const heroParticles = document.querySelector('.hero-particles');
        const rate = scrolled * -0.3;
        
        if (heroParticles) {
            heroParticles.style.transform = `translateY(${rate}px)`;
        }
    }

    // Animate elements on scroll with enhanced effects
    function animateOnScroll() {
        const elements = document.querySelectorAll('.experience-item, .vision-item, .value-item, .contact-item');
        
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 80) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }

    // Initialize animations
    function initializeAnimations() {
        const elements = document.querySelectorAll('.experience-item, .vision-item, .value-item, .contact-item');
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(40px)';
            element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        });
    }

    // Enhanced typing effect for hero tagline
    function typeWriter(element, text, speed = 80) {
        let i = 0;
        element.textContent = '';
        element.style.borderRight = '2px solid rgba(255, 255, 255, 0.7)';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed + Math.random() * 40); // Variable speed for natural feel
            } else {
                // Remove cursor after typing is complete
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

    // Enhanced hover effects for cards
    function addEnhancedHoverEffects() {
        const cards = document.querySelectorAll('.experience-item, .vision-item, .value-item, .contact-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // Magnetic button effect
    function addMagneticEffect() {
        const buttons = document.querySelectorAll('.btn, .toggle-details');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
                this.style.transition = 'transform 0.1s ease-out';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
                this.style.transition = 'transform 0.3s ease-out';
            });
        });
    }

    // Floating animation for profile image
    function enhanceProfileImageAnimation() {
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            let mouseX = 0;
            let mouseY = 0;
            
            document.addEventListener('mousemove', function(e) {
                mouseX = e.clientX / window.innerWidth;
                mouseY = e.clientY / window.innerHeight;
            });
            
            function updateProfilePosition() {
                const offsetX = (mouseX - 0.5) * 20;
                const offsetY = (mouseY - 0.5) * 20;
                
                profileImage.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px)`;
                profileImage.style.transition = 'transform 0.8s ease-out';
                
                requestAnimationFrame(updateProfilePosition);
            }
            
            updateProfilePosition();
        }
    }

    // Text reveal animation
    function addTextRevealAnimation() {
        const textElements = document.querySelectorAll('.about-intro p, .values-intro p');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        textElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
            observer.observe(element);
        });
    }

    // Progressive image loading effect
    function addProgressiveImageLoading() {
        const profilePhoto = document.querySelector('.profile-photo');
        if (profilePhoto) {
            profilePhoto.addEventListener('load', function() {
                this.style.filter = 'grayscale(0.2) contrast(1.1) brightness(1.05)';
                this.style.transition = 'filter 1s ease-out';
            });
        }
    }

    // Scroll-triggered counter animation
    function animateCounters() {
        const achievements = document.querySelectorAll('.connection-count');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const text = element.textContent;
                    const numbers = text.match(/\d+/g);
                    
                    if (numbers) {
                        const finalNumber = parseInt(numbers[0]);
                        let currentNumber = 0;
                        const increment = finalNumber / 50;
                        
                        const timer = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= finalNumber) {
                                currentNumber = finalNumber;
                                clearInterval(timer);
                            }
                            element.textContent = text.replace(/\d+/, Math.floor(currentNumber));
                        }, 30);
                        
                        observer.unobserve(element);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        achievements.forEach(achievement => {
            observer.observe(achievement);
        });
    }

    // Enhanced scroll indicator
    function enhanceScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        const heroSection = document.querySelector('.hero');
        
        window.addEventListener('scroll', function() {
            const heroHeight = heroSection.offsetHeight;
            const scrolled = window.pageYOffset;
            const opacity = Math.max(0, 1 - (scrolled / heroHeight) * 2);
            
            scrollIndicator.style.opacity = opacity;
        });
    }

    // Smooth page transitions
    function addPageTransitions() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
        });
    }

    // Interactive background particles
    function createInteractiveParticles() {
        const heroBackground = document.querySelector('.hero-background');
        let particles = [];
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'rgba(255, 255, 255, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            heroBackground.appendChild(particle);
            particles.push({
                element: particle,
                x: x,
                y: y,
                baseX: x,
                baseY: y
            });
        }
        
        // Animate particles based on mouse movement
        document.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            particles.forEach(particle => {
                const dx = mouseX - particle.baseX;
                const dy = mouseY - particle.baseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    particle.x = particle.baseX + dx * force * 0.1;
                    particle.y = particle.baseY + dy * force * 0.1;
                } else {
                    particle.x += (particle.baseX - particle.x) * 0.1;
                    particle.y += (particle.baseY - particle.y) * 0.1;
                }
                
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
            });
        });
    }

    // Dynamic CSS injection for additional animations
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
        
        .hero-tagline {
            animation-delay: 1s;
        }
        
        .section-enter {
            animation: sectionEnter 0.8s ease-out forwards;
        }
        
        @keyframes sectionEnter {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize all functionality
    initializeAnimations();
    addEnhancedHoverEffects();
    addMagneticEffect();
    enhanceProfileImageAnimation();
    addTextRevealAnimation();
    addProgressiveImageLoading();
    animateCounters();
    enhanceScrollIndicator();
    addPageTransitions();
    createInteractiveParticles();
    
    // Initial calls
    updateActiveNavLink();
    updateHeaderBackground();
    
    // Trigger initial animation check
    setTimeout(animateOnScroll, 100);
});

// Toggle experience details functionality
function toggleExperienceDetails(button) {
    const experienceItem = button.closest('.experience-item');
    const details = experienceItem.querySelector('.experience-details');
    
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        button.textContent = '詳細を閉じる';
        button.classList.add('expanded');
        
        // Enhanced reveal animation
        details.style.opacity = '0';
        details.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            details.style.opacity = '1';
            details.style.transform = 'translateY(0)';
            details.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        }, 10);
    } else {
        details.style.opacity = '0';
        details.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            details.style.display = 'none';
            button.textContent = '詳細を見る';
            button.classList.remove('expanded');
        }, 500);
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

// Performance optimization - lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);