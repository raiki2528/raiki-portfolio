document.addEventListener('DOMContentLoaded', function() {
    // Loader functionality
    const loader = document.querySelector('.loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });

    // Navigation functionality
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animateElements = document.querySelectorAll('.timeline-item, .skill-category, .value-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Hero stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    const suffix = counter.textContent.includes('+') ? '+' : '';
                    counter.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    const suffix = counter.textContent.includes('+') ? '+' : '';
                    counter.textContent = target + suffix;
                }
            };
            
            // Start animation when hero section is visible
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        heroObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            heroObserver.observe(document.querySelector('.hero'));
        });
    }

    // Initialize counter animation
    animateCounters();

    // Parallax effect for floating elements
    function handleParallax() {
        const floatingElements = document.querySelectorAll('.floating-element');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.3;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    }

    window.addEventListener('scroll', handleParallax);

    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Timeline items stagger animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    animateTimeline();

    // Skill categories stagger animation
    function animateSkills() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150);
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillCategories.forEach(category => {
            skillsObserver.observe(category);
        });
    }

    animateSkills();

    // CTA button ripple effect
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Social links hover animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced scroll reveal animation
    function createScrollRevealObserver() {
        const elements = document.querySelectorAll('.section-header, .about-intro, .contact-text');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            revealObserver.observe(element);
        });
    }

    createScrollRevealObserver();

    // Typewriter effect for hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typewriter effect for hero title after loader
    setTimeout(() => {
        const heroTitle = document.querySelector('.title-line');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 150);
        }
    }, 2000);

    // Enhanced image loading with fade-in effect
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
        }
    });

    // Smooth page transitions
    const pageLinks = document.querySelectorAll('a[href^="#"]');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Performance optimization: throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll-based functions
    window.addEventListener('scroll', throttle(() => {
        updateActiveNavLink();
        handleParallax();
    }, 16)); // ~60fps

    // Accessibility: keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Initialize AOS-like animations
    function initializeAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
            observer.observe(element);
        });
    }

    initializeAnimations();
});