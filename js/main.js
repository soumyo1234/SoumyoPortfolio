/* ================================================
   SOUMYOJIT SADHU - PORTFOLIO JAVASCRIPT
   Interactions, Animations & Functionality
   ================================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== INITIALIZE AOS ==================== //
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        disable: 'mobile'
    });

    // ==================== INITIALIZE LUCIDE ICONS ==================== //
    lucide.createIcons();

    // ==================== SET CURRENT YEAR ==================== //
    document.getElementById('year').textContent = new Date().getFullYear();

    // ==================== CUSTOM CURSOR ==================== //
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursor-dot');

    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Cursor hover effects
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .hover-effect');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = '#8b5cf6';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = '#00d4ff';
            });
        });
    }

    // ==================== NAVIGATION ==================== //
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Scroll effect for navbar
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ==================== JARVIS HERO SECTION ==================== //
    initJarvis();

    // ==================== SMOOTH SCROLLING ==================== //
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== BACK TO TOP BUTTON ==================== //
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==================== CONTACT FORM ==================== //
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        const subject = formData.subject.trim() || 'Portfolio Inquiry';
        const bodyLines = [
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            '',
            formData.message.trim()
        ];
        const mailtoUrl = `mailto:soumyo8317@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

        const mailWindow = window.open(mailtoUrl, '_blank');
        if (!mailWindow) {
            window.location.href = mailtoUrl;
        }

        // Create notification with fallback link
        const notification = document.createElement('div');
        notification.className = 'fixed top-24 right-4 max-w-sm bg-gradient-to-r from-neon to-electric text-midnight px-6 py-4 rounded-xl shadow-lg z-50 transform translate-x-full transition-transform duration-500';
        notification.innerHTML = `
            <div class="flex items-start gap-3">
                <svg class="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <div>
                    <p class="font-bold">Opening your email app...</p>
                    <p class="text-sm">If it does not open, email me at <a href="mailto:soumyo8317@gmail.com" class="underline font-semibold">soumyo8317@gmail.com</a>.</p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove notification after 6 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 500);
        }, 6000);
    });

    // ==================== INTERSECTION OBSERVER FOR ANIMATIONS ==================== //
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ==================== SKILL BAR ANIMATIONS ==================== //
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width;
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ==================== PARALLAX EFFECT ==================== //
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ==================== MAGNETIC BUTTON EFFECT ==================== //
    const magneticButtons = document.querySelectorAll('.magnetic');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // ==================== TILT EFFECT FOR CARDS ==================== //
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // ==================== LOADING ANIMATION ==================== //
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loading');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    });

    // ==================== ACTIVE NAV LINK HIGHLIGHTING ==================== //
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-electric');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-electric');
            }
        });
    });

    // ==================== COUNTER ANIMATION ==================== //
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ==================== KEYBOARD NAVIGATION ==================== //
    document.addEventListener('keydown', (e) => {
        // ESC to close mobile menu
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ==================== FEATURED PROJECT LINKS ==================== //
    const projectCards = document.querySelectorAll('[data-project-url]');

    projectCards.forEach(card => {
        const url = card.dataset.projectUrl;
        if (!url) return;

        card.addEventListener('click', () => {
            window.location.href = url;
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = url;
            }
        });
    });

    // ==================== LAZY LOADING IMAGES ==================== //
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

});

/* ================================================
   JARVIS HERO SECTION JAVASCRIPT
   Add this to your main.js file or include separately
   ================================================ */

// ==================== JARVIS PARTICLE EFFECT ==================== //
function initJarvisParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random delay
    particle.style.animationDelay = Math.random() * 10 + 's';
    
    // Random duration
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    
    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random color variation
    const colors = ['#00d4ff', '#8b5cf6', '#39ff14', '#00d4ff'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
}

// ==================== JARVIS TYPING EFFECT (ENHANCED) ==================== //
function initJarvisTypewriter() {
    const typewriter = document.getElementById('typewriter');
    if (!typewriter) return;
    
    const roles = [
        'Software QA Tester',
        'MERN Stack Developer',
        'Automation Engineer',
        'Freelance Developer',
        'Data Analyst',
        'Bug Hunter',
        'Quality Advocate'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typewriter.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }
        
        // Add glitch effect occasionally
        if (Math.random() > 0.95) {
            typewriter.style.opacity = '0.5';
            setTimeout(() => {
                typewriter.style.opacity = '1';
            }, 50);
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2500; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing new role
        }
        
        setTimeout(typeRole, typeSpeed);
    }

    // Start with a delay for dramatic effect
    setTimeout(typeRole, 1500);
}

// ==================== JARVIS HUD ANIMATIONS ==================== //
function initJarvisHUD() {
    // Animate data points with random intervals
    const dataPoints = document.querySelectorAll('.data-point');
    
    dataPoints.forEach((point, index) => {
        setInterval(() => {
            point.style.opacity = Math.random() > 0.3 ? '1' : '0.3';
        }, 2000 + index * 500);
    });
    
    // Random glitch effect on HUD elements
    setInterval(() => {
        const hudElements = document.querySelectorAll('.jarvis-hud-corner svg');
        const randomElement = hudElements[Math.floor(Math.random() * hudElements.length)];
        
        if (randomElement) {
            randomElement.style.opacity = '0.2';
            setTimeout(() => {
                randomElement.style.opacity = '0.6';
            }, 100);
        }
    }, 3000);
}

// ==================== JARVIS SOUND EFFECT (Optional) ==================== //
function initJarvisSound() {
    // Create audio context for UI sounds (optional)
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    
    if (!AudioContext) return;
    
    const playHoverSound = () => {
        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.1);
    };
    
    // Add hover sound to buttons (uncomment if desired)
    // document.querySelectorAll('a, button').forEach(el => {
    //     el.addEventListener('mouseenter', playHoverSound);
    // });
}

// ==================== JARVIS MOUSE TRACKING ==================== //
function initJarvisMouseTracking() {
    const hero = document.getElementById('home');
    if (!hero) return;
    
    const circles = document.querySelectorAll('.jarvis-circle');
    const core = document.querySelector('.jarvis-core');
    
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        
        // Subtle parallax on circles
        circles.forEach((circle, index) => {
            const factor = (index + 1) * 5;
            circle.style.transform = `rotate(${circle.style.transform || '0deg'}) translate(${x * factor}px, ${y * factor}px)`;
        });
        
        // Core follows mouse slightly
        if (core) {
            core.style.transform = `translate(${x * 10}px, ${y * 10}px) scale(${1 + Math.abs(x + y) * 0.05})`;
        }
    });
}

// ==================== JARVIS INITIALIZATION ==================== //
function initJarvis() {
    console.log('%c[JARVIS] System Initializing...', 'color: #00d4ff; font-family: monospace;');
    
    initJarvisParticles();
    initJarvisTypewriter();
    initJarvisHUD();
    initJarvisMouseTracking();
    // initJarvisSound(); // Uncomment for sound effects
    
    console.log('%c[JARVIS] All Systems Online', 'color: #39ff14; font-family: monospace;');
}

// ==================== JARVIS CONSOLE MESSAGES ==================== //
console.log('%c', 'padding: 50px 100px; background: linear-gradient(135deg, #0a0a0f 0%, #141419 100%); border: 1px solid #00d4ff;');
console.log('%c+---------------------------------------+', 'color: #00d4ff; font-family: monospace;');
console.log('%c|     J.A.R.V.I.S. INTERFACE v2.0      |', 'color: #00d4ff; font-family: monospace; font-weight: bold;');
console.log('%c|   Just A Rather Very Intelligent     |', 'color: #8b5cf6; font-family: monospace;');
console.log('%c|            System                    |', 'color: #8b5cf6; font-family: monospace;');
console.log('%c+---------------------------------------+', 'color: #00d4ff; font-family: monospace;');
console.log('%c|  Developer: Soumyojit Sadhu          |', 'color: #39ff14; font-family: monospace;');
console.log('%c|  Status: ONLINE                      |', 'color: #39ff14; font-family: monospace;');
console.log('%c|  Mode: FREELANCER ACTIVE             |', 'color: #ffc107; font-family: monospace;');
console.log('%c+---------------------------------------+', 'color: #00d4ff; font-family: monospace;');

// ==================== UTILITY FUNCTIONS ==================== //

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for performance
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
    };
}

