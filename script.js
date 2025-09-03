// Locotag Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                sidebar.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.sidebar-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu after navigation
                if (sidebar && sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                    mobileMenuToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Retro Button Interactions
    const retroButtons = document.querySelectorAll('.retro-btn');
    retroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle specific button actions
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('demo')) {
                // Demo booking functionality
                showNotification('Demo booking feature coming soon!', 'info');
            } else if (buttonText.includes('game')) {
                // Game trial functionality
                showNotification('Game trial feature coming soon!', 'info');
            } else if (buttonText.includes('logout')) {
                // Logout functionality
                showNotification('Logout feature coming soon!', 'info');
            }
        });
        
        // Add hover sound effect simulation
        button.addEventListener('mouseenter', function() {
            // Apply teal shadow to all buttons
            this.style.boxShadow = '-4px 5px 0 0 #6FA6A0';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Dashboard Card Interactions
    const dashboardCards = document.querySelectorAll('.dashboard-card');
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Animated Counter for Metrics
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate counters in dashboard cards
                if (entry.target.classList.contains('dashboard-card')) {
                    const metrics = entry.target.querySelectorAll('.metric-value');
                    metrics.forEach(metric => {
                        const value = parseInt(metric.textContent.replace(/,/g, ''));
                        if (!isNaN(value)) {
                            metric.textContent = '0';
                            setTimeout(() => {
                                animateCounter(metric, value);
                            }, 500);
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe dashboard cards
    dashboardCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
    
    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent-orange);
            color: var(--accent-white);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            border: 2px solid var(--accent-white);
            font-family: var(--font-body);
            font-size: 0.9rem;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Game Button Interactions (Client UI)
    const gameButtons = document.querySelectorAll('.game-btn');
    gameButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.toLowerCase();
            
            if (buttonText.includes('play')) {
                showNotification('Starting game...', 'success');
                // Simulate game loading
                this.textContent = 'Loading...';
                this.disabled = true;
                setTimeout(() => {
                    this.textContent = 'Play the game';
                    this.disabled = false;
                }, 2000);
            } else if (buttonText.includes('wallet')) {
                showNotification('Opening wallet...', 'info');
            } else if (buttonText.includes('offers')) {
                showNotification('Loading offers...', 'info');
            } else if (buttonText.includes('scoreboard')) {
                showNotification('Loading leaderboard...', 'info');
            } else if (buttonText.includes('review')) {
                showNotification('Opening review form...', 'info');
            } else if (buttonText.includes('sign out')) {
                showNotification('Signing out...', 'info');
            }
        });
    });
    
    // Problem Card Interactions
    const problemCards = document.querySelectorAll('.problem-card');
    problemCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateX(16px) scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
    
    // QR Code Interaction
    const qrCode = document.querySelector('.qr-placeholder');
    if (qrCode) {
        qrCode.addEventListener('click', function() {
            showNotification('QR Code scanned!', 'success');
        });
        
        qrCode.style.cursor = 'pointer';
        qrCode.title = 'Click to scan QR code';
    }
    
    // Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            mobileMenuToggle.classList.remove('active');
        }
        
        // Enter key on focused buttons
        if (e.key === 'Enter' && document.activeElement.classList.contains('retro-btn')) {
            document.activeElement.click();
        }
    });
    
    // Scroll-based animations
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        // Add scroll class to body for styling
        document.body.classList.add('scrolling');
        
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 150);
    });
    
    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', debounce(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }, 10));
    }
    
    // Initialize tooltips for interactive elements
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[title]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = this.title;
                tooltip.style.cssText = `
                    position: absolute;
                    background: var(--primary-bg);
                    color: var(--accent-white);
                    padding: 0.5rem;
                    border: 1px solid var(--accent-yellow);
                    border-radius: 4px;
                    font-size: 0.8rem;
                    font-family: var(--font-body);
                    z-index: 1000;
                    pointer-events: none;
                    white-space: nowrap;
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
                tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
                
                this.addEventListener('mouseleave', () => {
                    if (document.body.contains(tooltip)) {
                        document.body.removeChild(tooltip);
                    }
                }, { once: true });
            });
        });
    }
    
    // Initialize tooltips after DOM is ready
    setTimeout(initTooltips, 1000);
    
    // Add loading states for buttons
    function addLoadingState(button) {
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;
        button.classList.add('loading');
        
        return function() {
            button.textContent = originalText;
            button.disabled = false;
            button.classList.remove('loading');
        };
    }
    
    // Form handling (if forms are added later)
    document.addEventListener('submit', function(e) {
        if (e.target.tagName === 'FORM') {
            e.preventDefault();
            const submitButton = e.target.querySelector('button[type="submit"]');
            if (submitButton) {
                const resetLoading = addLoadingState(submitButton);
                setTimeout(resetLoading, 2000);
            }
        }
    });
    
    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Contact page form handling
    const contactForm = document.querySelector('.contact-page-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const venueName = formData.get('venue-name');
            const contactName = formData.get('contact-name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const venueType = formData.get('venue-type');
            const locations = formData.get('locations');
            const message = formData.get('message');
            const pilotInterest = formData.get('pilot-interest');
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            showNotification('📤 Sending your message...', 'info');
            
            // EmailJS template parameters
            const templateParams = {
                to_email: 'hello@locotag.io',
                from_email: email,
                from_name: contactName,
                subject: 'New Contact Form Submission - Locotag',
                message: `Hi Locotag Team,

I'm interested in learning more about Locotag for my venue.

VENUE DETAILS:
- Venue Name: ${venueName}
- Contact Name: ${contactName}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- Venue Type: ${venueType}
- Number of Locations: ${locations}

MESSAGE:
${message || 'No additional message provided'}

PILOT PROGRAM INTEREST: ${pilotInterest ? 'Yes' : 'No'}

Please contact me to discuss how Locotag can work for my business.

Best regards,
${contactName}
${venueName}`
            };
            
            // Send email using EmailJS
            emailjs.send('service_5et60nb', 'template_5zkmyrr', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('🎉 Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showNotification('❌ Failed to send message. Please try again or contact us directly.', 'error');
                })
                .finally(function() {
                    // Reset button state
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
            
            // Log the form data
            console.log('Contact form submission:', {
                venueName,
                contactName,
                email,
                phone,
                venueType,
                locations,
                message,
                pilotInterest: pilotInterest ? 'Yes' : 'No'
            });
        });
    }
    
    // Pricing Card Interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            const button = this.querySelector('.retro-btn');
            if (button) {
                const buttonText = button.textContent.toLowerCase();
                if (buttonText.includes('started')) {
                    showNotification('Redirecting to signup...', 'info');
                } else if (buttonText.includes('popular')) {
                    showNotification('Redirecting to Professional plan...', 'info');
                } else if (buttonText.includes('sales')) {
                    showNotification('Connecting you with sales team...', 'info');
                }
            }
        });
    });
    
    // Video player controls
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const playOverlay = document.querySelector('.play-overlay');
    const video = document.querySelector('.old-youtube-frame video');
    
    if (playBtn && pauseBtn && playOverlay && video) {
        let isPlaying = false;
        
        // Play button functionality
        playBtn.addEventListener('click', () => {
            isPlaying = true;
            playBtn.classList.add('active');
            pauseBtn.classList.remove('active');
            playOverlay.style.display = 'none';
            video.play();
        });
        
        // Pause button functionality
        pauseBtn.addEventListener('click', () => {
            isPlaying = false;
            pauseBtn.classList.add('active');
            playBtn.classList.remove('active');
            playOverlay.style.display = 'flex';
            video.pause();
        });
        
        // Play overlay click
        playOverlay.addEventListener('click', () => {
            playBtn.click();
        });
        
        // Video event listeners
        video.addEventListener('play', () => {
            isPlaying = true;
            playBtn.classList.add('active');
            pauseBtn.classList.remove('active');
            playOverlay.style.display = 'none';
        });
        
        video.addEventListener('pause', () => {
            isPlaying = false;
            pauseBtn.classList.add('active');
            playBtn.classList.remove('active');
            playOverlay.style.display = 'flex';
        });
        
        // Progress bar click
        const progressBar = document.querySelector('.progress');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = (clickX / rect.width) * 100;
                
                // Update video time
                const newTime = (percentage / 100) * video.duration;
                video.currentTime = newTime;
                
                // Update progress bar visual
                progressBar.style.setProperty('--progress', `${percentage}%`);
            });
        }
        
        // Update progress bar as video plays
        video.addEventListener('timeupdate', () => {
            if (progressBar && video.duration) {
                const percentage = (video.currentTime / video.duration) * 100;
                progressBar.style.setProperty('--progress', `${percentage}%`);
            }
        });
        
        // Auto-play video when section comes into view
        const videoSection = document.querySelector('.locotag-action-section');
        if (videoSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !isPlaying) {
                        // Auto-play when video section is visible
                        video.play();
                        isPlaying = true;
                        playBtn.classList.add('active');
                        pauseBtn.classList.remove('active');
                        playOverlay.style.display = 'none';
                        
                        // Pause video when section goes out of view
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.3, // Trigger when 30% of section is visible
                rootMargin: '0px 0px -100px 0px' // Start playing slightly before fully in view
            });
            
            observer.observe(videoSection);
        }
    }
    
    // Falling Coins Animation on Scroll
    function createFallingCoins() {
        const coinContainer = document.createElement('div');
        coinContainer.className = 'falling-coins-container';
        coinContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
            overflow: hidden;
        `;
        document.body.appendChild(coinContainer);

        // Create multiple coin elements with different properties
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createCoin(coinContainer, i);
            }, i * 200); // Stagger coin creation
        }
    }

    function createCoin(container, index) {
        const coin = document.createElement('img');
        coin.className = 'falling-coin';
        
        // Randomly select one of the 7 SVG coins with consistent filenames (no spaces)
        const coinNumber = Math.floor(Math.random() * 7) + 1;
        const coinFilename = `coin${coinNumber}.svg`;
        coin.src = `Assets/coins/${coinFilename}`;
        coin.alt = `Coin ${coinNumber}`;
        
        coin.style.cssText = `
            position: absolute;
            width: ${Math.random() * 20 + 20}px;
            height: ${Math.random() * 20 + 20}px;
            left: ${Math.random() * 100}%;
            top: -50px;
            opacity: 0;
            transform: rotate(${Math.random() * 360}deg);
            transition: all 0.1s ease;
            filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.8));
        `;
        
        container.appendChild(coin);

        // Animate coin falling
        const animationDuration = Math.random() * 3000 + 4000; // 4-7 seconds
        const horizontalDrift = (Math.random() - 0.5) * 200; // Random horizontal movement
        
        // Fade in
        setTimeout(() => {
            coin.style.opacity = '1';
            coin.style.transform = `translateX(${horizontalDrift}px) translateY(100vh) rotate(${Math.random() * 720}deg)`;
        }, 100);

        // Remove coin after animation
        setTimeout(() => {
            if (coin.parentNode) {
                coin.parentNode.removeChild(coin);
            }
        }, animationDuration + 1000);
    }

    // Trigger falling coins on scroll
    let coinsTriggered = false;
    let scrollThreshold = window.innerHeight * 0.3; // Trigger at 30% scroll

    function handleScrollForCoins() {
        if (coinsTriggered) return;
        
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 30) {
            coinsTriggered = true;
            createFallingCoins();
            
            // Remove scroll listener after triggering
            window.removeEventListener('scroll', handleScrollForCoins);
        }
    }

    // Add scroll listener for coins
    window.addEventListener('scroll', handleScrollForCoins);

    // Additional coin triggers for specific sections
    function createSectionCoins(sectionSelector, coinCount = 8) {
        const section = document.querySelector(sectionSelector);
        if (!section) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Create a smaller burst of coins for section highlights
                    setTimeout(() => {
                        createSectionCoinBurst(coinCount);
                    }, 500);
                    
                    // Only trigger once per section
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        observer.observe(section);
    }

    function createSectionCoinBurst(count) {
        const container = document.createElement('div');
        container.className = 'falling-coins-container section-coins';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
            overflow: hidden;
        `;
        document.body.appendChild(container);

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createSectionCoin(container, i);
            }, i * 150);
        }

        // Remove container after animation
        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
        }, 8000);
    }

    function createSectionCoin(container, index) {
        const coin = document.createElement('img');
        coin.className = 'falling-coin section-coin';
        
        // Randomly select one of the 7 SVG coins with consistent filenames (no spaces)
        const coinNumber = Math.floor(Math.random() * 7) + 1;
        const coinFilename = `coin${coinNumber}.svg`;
        coin.src = `Assets/coins/${coinFilename}`;
        coin.alt = `Coin ${coinNumber}`;
        
        coin.style.cssText = `
            position: absolute;
            width: ${Math.random() * 16 + 16}px;
            height: ${Math.random() * 16 + 16}px;
            left: ${Math.random() * 100}%;
            top: -30px;
            opacity: 0;
            transform: rotate(${Math.random() * 360}deg);
            transition: all 0.1s ease;
            filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
        `;
        
        container.appendChild(coin);

        const animationDuration = Math.random() * 2000 + 3000; // 3-5 seconds
        const horizontalDrift = (Math.random() - 0.5) * 150;
        
        setTimeout(() => {
            coin.style.opacity = '1';
            coin.style.transform = `translateX(${horizontalDrift}px) translateY(80vh) rotate(${Math.random() * 540}deg)`;
        }, 100);

        setTimeout(() => {
            if (coin.parentNode) {
                coin.parentNode.removeChild(coin);
            }
        }, animationDuration + 1000);
    }

    // Set up section coin triggers for key sections
    document.addEventListener('DOMContentLoaded', function() {
        // Trigger coins for pilot program section
        createSectionCoins('.pilot-program', 6);
        
        // Trigger coins for pricing section
        createSectionCoins('.pricing-section', 8);
        
        // Trigger coins for customer insights section
        createSectionCoins('.customer-insights', 5);
    });

    // Console welcome message
    console.log(`
    🎮 Welcome to Locotag Studio!
    
    This website features:
    - Retro OS aesthetic with modern functionality
    - Interactive dashboard preview
    - Mobile-responsive design
    - Smooth animations and transitions
    - Complete business sections (Features, Pricing, FAQ, Contact)
    - Interactive video player with retro controls
    - Pilot Program section for exclusive venue partnerships
    
    Built with love for Hong Kong's hospitality industry.
    `);
    
    // Pilot Program form handling
    const pilotForm = document.querySelector('.pilot-program-form');
    if (pilotForm) {
        pilotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            showNotification('📤 Sending your application...', 'info');
            
            // EmailJS template parameters
            const templateParams = {
                to_email: 'hello@locotag.io',
                from_email: email,
                subject: 'New Pilot Program Application',
                message: `Hi Locotag Team,

I'm interested in applying for your pilot program.

Business Email: ${email}

Please contact me to discuss how Locotag can work for my venue.

Best regards,
${email}`
            };
            
            // Send email using EmailJS
            emailjs.send('service_5et60nb', 'template_5zkmyrr', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showNotification('🎉 Application submitted successfully! We\'ll contact you within 24 hours.', 'success');
                    pilotForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showNotification('❌ Failed to send application. Please try again or contact us directly.', 'error');
                })
                .finally(function() {
                    // Reset button state
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
            
            // Log application
            console.log('🚀 Pilot Program Application:', email);
        });
    }
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`🚀 Page loaded in ${loadTime}ms`);
            }, 0);
        });
    }
});
