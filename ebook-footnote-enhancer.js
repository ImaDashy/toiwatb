        // Enhanced E-book Footnote Enhancer Library
        class EbookFootnoteEnhancer {
            constructor() {
                this.audioCache = {};
                this.animationOverlay = null;
                this.createAnimationOverlay();
                this.loadSounds();
            }

            // Create overlay for animations
            createAnimationOverlay() {
                this.animationOverlay = document.createElement('div');
                this.animationOverlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1000;
                `;
                document.body.appendChild(this.animationOverlay);
            }

            // Load sound effects
            loadSounds() {
                const sounds = {
                    'chime': this.createSynthSound('chime'),
                    'bell': this.createSynthSound('bell'),
                    'pop': this.createSynthSound('pop'),
                    'swoosh': this.createSynthSound('swoosh')
                };

                Object.keys(sounds).forEach(name => {
                    this.audioCache[name] = sounds[name];
                });
            }

            // Create synthetic sounds
            createSynthSound(type) {
                return {
                    play: () => {
                        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        
                        switch(type) {
                            case 'chime':
                                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.5);
                                break;
                            case 'bell':
                                oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
                                oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.8);
                                break;
                            case 'pop':
                                oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
                                oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.1);
                                break;
                        }
                        
                        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
                        
                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + 1);
                    }
                };
            }

            // Original method - Add interactive functionality to footnote references
            addInteractiveFootnote(footnoteId, animationType = 'confetti', soundType = 'chime') {
                const footnoteRef = document.querySelector(`[data-id="${footnoteId}"]`) || 
                                  document.querySelector(`a[href="#${footnoteId}"]`);
                
                if (!footnoteRef) {
                    console.warn(`Footnote reference for ${footnoteId} not found`);
                    return;
                }

                this.styleFootnoteReference(footnoteRef);
                this.addFootnoteClickHandler(footnoteRef, footnoteId, animationType, soundType);
                this.addHoverEffects(footnoteRef);
            }

            // NEW METHOD - Add interactive functionality to hyperlinks within footnotes
            addInteractiveFootnoteLink(linkId, animationType = 'confetti', soundType = 'chime') {
                const link = document.getElementById(linkId);
                
                if (!link) {
                    console.warn(`Link with ID ${linkId} not found`);
                    return;
                }

                this.styleInteractiveLink(link);
                this.addLinkClickHandler(link, animationType, soundType);
                this.addHoverEffects(link);
            }

            // NEW METHOD - Add interactive functionality using CSS selectors
            addInteractiveFootnoteLinkBySelector(selector, animationType = 'confetti', soundType = 'chime') {
                const links = document.querySelectorAll(selector);
                
                if (links.length === 0) {
                    console.warn(`No links found with selector: ${selector}`);
                    return;
                }

                links.forEach(link => {
                    this.styleInteractiveLink(link);
                    this.addLinkClickHandler(link, animationType, soundType);
                    this.addHoverEffects(link);
                });
            }

            // Style footnote references
            styleFootnoteReference(element) {
                element.style.cssText += `
                    background: linear-gradient(45deg, #ff6b6b, #ffd93d);
                    color: white !important;
                    padding: 2px 6px;
                    border-radius: 4px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    animation: pulse 2s infinite;
                `;

                this.addPulseAnimation();
            }

            // Style interactive links within footnotes
            styleInteractiveLink(element) {
                element.classList.add('interactive-footnote-link');
                
                // Store original href to restore later
                const originalHref = element.href;
                element.dataset.originalHref = originalHref;
            }

            // Add click handler for footnote references
            addFootnoteClickHandler(element, footnoteId, animationType, soundType) {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.playSound(soundType);
                    this.playAnimation(animationType, e.clientX, e.clientY);
                    
                    setTimeout(() => {
                        const footnoteElement = document.getElementById(footnoteId);
                        if (footnoteElement) {
                            footnoteElement.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'center'
                            });
                            this.highlightFootnote(footnoteElement);
                        }
                    }, 500);
                });
            }

            // Add click handler for hyperlinks
            addLinkClickHandler(element, animationType, soundType) {
                element.addEventListener('click', (e) => {
                    // Play effects first
                    this.playSound(soundType);
                    this.playAnimation(animationType, e.clientX, e.clientY);
                    
                    // Small delay before following the link (optional)
                    // If you want the link to work normally, remove the preventDefault and setTimeout
                    e.preventDefault();
                    setTimeout(() => {
                        // Follow the original link after effects
                        const originalHref = element.dataset.originalHref || element.href;
                        if (originalHref) {
                            window.open(originalHref, element.target || '_self');
                        }
                    }, 800); // Delay to let effects play
                });
            }

            // Add hover effects
            addHoverEffects(element) {
                element.addEventListener('mouseenter', () => {
                    element.style.transform = 'scale(1.1)';
                    element.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
                });

                element.addEventListener('mouseleave', () => {
                    element.style.transform = 'scale(1)';
                    element.style.boxShadow = 'none';
                });
            }

            // Add pulse animation CSS
            addPulseAnimation() {
                if (!document.getElementById('footnote-enhancer-styles')) {
                    const style = document.createElement('style');
                    style.id = 'footnote-enhancer-styles';
                    style.textContent = `
                        @keyframes pulse {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.05); }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }

            // Play sound effect
            playSound(soundType) {
                if (this.audioCache[soundType]) {
                    try {
                        this.audioCache[soundType].play();
                    } catch (error) {
                        console.warn('Could not play sound:', error);
                    }
                }
            }

            // Play animation
            playAnimation(animationType, x, y) {
                switch (animationType) {
                    case 'confetti':
                        this.createConfetti();
                        break;
                    case 'sparkles':
                        this.createSparkles(x, y);
                        break;
                    case 'ripple':
                        this.createRipple(x, y);
                        break;
                    default:
                        this.createConfetti();
                }
            }

            // Create confetti animation
            createConfetti() {
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
                
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        const confetti = document.createElement('div');
                        confetti.style.cssText = `
                            position: absolute;
                            width: ${Math.random() * 10 + 5}px;
                            height: ${Math.random() * 10 + 5}px;
                            background: ${colors[Math.floor(Math.random() * colors.length)]};
                            left: ${Math.random() * 100}%;
                            top: -10px;
                            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                            animation: confetti-fall ${Math.random() * 2 + 2}s linear forwards;
                        `;
                        
                        this.animationOverlay.appendChild(confetti);
                        
                        setTimeout(() => {
                            confetti.remove();
                        }, 4000);
                    }, i * 50);
                }

                this.addAnimationCSS('confetti-fall', `
                    @keyframes confetti-fall {
                        0% {
                            transform: translateY(-100vh) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }
                `);
            }

            // Create sparkles animation
            createSparkles(x, y) {
                for (let i = 0; i < 12; i++) {
                    const sparkle = document.createElement('div');
                    const angle = (i * 30) * (Math.PI / 180);
                    const distance = Math.random() * 100 + 50;
                    
                    sparkle.style.cssText = `
                        position: absolute;
                        width: 10px;
                        height: 10px;
                        background: radial-gradient(circle, #ffd700, #ffed4e);
                        border-radius: 50%;
                        left: ${x}px;
                        top: ${y}px;
                        animation: sparkle-burst 1.5s ease-out forwards;
                        --end-x: ${Math.cos(angle) * distance}px;
                        --end-y: ${Math.sin(angle) * distance}px;
                    `;
                    
                    this.animationOverlay.appendChild(sparkle);
                    
                    setTimeout(() => {
                        sparkle.remove();
                    }, 1500);
                }

                this.addAnimationCSS('sparkle-burst', `
                    @keyframes sparkle-burst {
                        0% {
                            transform: translate(0, 0) scale(0);
                            opacity: 1;
                        }
                        50% {
                            transform: translate(var(--end-x), var(--end-y)) scale(1);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(var(--end-x), var(--end-y)) scale(0);
                            opacity: 0;
                        }
                    }
                `);
            }

            // Create ripple animation
            createRipple(x, y) {
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border: 3px solid #3498db;
                    border-radius: 50%;
                    left: ${x}px;
                    top: ${y}px;
                    width: 0;
                    height: 0;
                    animation: ripple-expand 1.5s ease-out forwards;
                    transform: translate(-50%, -50%);
                `;
                
                this.animationOverlay.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 1500);

                this.addAnimationCSS('ripple-expand', `
                    @keyframes ripple-expand {
                        0% {
                            width: 0;
                            height: 0;
                            opacity: 1;
                        }
                        100% {
                            width: 300px;
                            height: 300px;
                            opacity: 0;
                        }
                    }
                `);
            }

            // Add CSS animations dynamically
            addAnimationCSS(name, css) {
                if (!document.getElementById(`anim-${name}`)) {
                    const style = document.createElement('style');
                    style.id = `anim-${name}`;
                    style.textContent = css;
                    document.head.appendChild(style);
                }
            }

            // Highlight footnote when scrolled to
            highlightFootnote(element) {
                const originalBackground = element.style.backgroundColor;
                element.style.transition = 'background-color 0.5s ease';
                element.style.backgroundColor = '#fff3cd';
                
                setTimeout(() => {
                    element.style.backgroundColor = originalBackground;
                }, 2000);
            }

            // NEW METHOD - Bulk initialize links from configuration
            initializeLinksFromConfig(config) {
                config.forEach(item => {
                    if (item.id) {
                        this.addInteractiveFootnoteLink(item.id, item.animation, item.sound);
                    } else if (item.selector) {
                        this.addInteractiveFootnoteLinkBySelector(item.selector, item.animation, item.sound);
                    }
                });
            }

            // Bulk add interactive footnotes from configuration (original method)
            initializeFromConfig(config) {
                config.forEach(item => {
                    this.addInteractiveFootnote(item.id, item.animation, item.sound);
                });
            }
        }

        // Initialize the enhancer
        const EbookEnhancer = new EbookFootnoteEnhancer();
EbookEnhancer.addInteractiveFootnoteLink('yeah-link', 'confetti', 'chime');
