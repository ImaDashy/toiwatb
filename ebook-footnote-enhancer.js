      // E-book Footnote Enhancer Library
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

            // Load sound effects (you'll replace these URLs with your actual MP3 files)
            loadSounds() {
                const sounds = {
                    'chime': this.createSynthSound('chime'),
                    'bell': this.createSynthSound('bell'),
                    'pop': this.createSynthSound('pop'),
                    'swoosh': this.createSynthSound('swoosh')
                };

                // Cache the audio objects
                Object.keys(sounds).forEach(name => {
                    this.audioCache[name] = sounds[name];
                });
            }

            // Create synthetic sounds (replace with actual MP3 loading)
            createSynthSound(type) {
                // This creates a simple synthetic sound using Web Audio API
                // In your actual implementation, replace this with:
                // const audio = new Audio('path/to/your/sound.mp3');
                // return audio;
                
                return {
                    play: () => {
                        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        
                        // Different sound types
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

            // Add interactive functionality to a footnote
            addInteractiveFootnote(footnoteId, animationType = 'confetti', soundType = 'chime') {
                // Find footnote reference in content
                const footnoteRef = document.querySelector(`[data-id="${footnoteId}"]`) || 
                                  document.querySelector(`a[href="#${footnoteId}"]`);
                
                if (!footnoteRef) {
                    console.warn(`Footnote reference for ${footnoteId} not found`);
                    return;
                }

                // Style the footnote reference
                footnoteRef.style.cssText += `
                    background: linear-gradient(45deg, #ff6b6b, #ffd93d);
                    color: white !important;
                    padding: 2px 6px;
                    border-radius: 4px;
                    text-decoration: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    animation: pulse 2s infinite;
                `;

                // Add CSS for pulse animation
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

                // Add click handler
                footnoteRef.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.playSound(soundType);
                    this.playAnimation(animationType, e.clientX, e.clientY);
                    
                // Add hover effects
                footnoteRef.addEventListener('mouseenter', () => {
                    footnoteRef.style.transform = 'scale(1.1)';
                    footnoteRef.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
                });

                footnoteRef.addEventListener('mouseleave', () => {
                    footnoteRef.style.transform = 'scale(1)';
                    footnoteRef.style.boxShadow = 'none';
                });
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
                    const text = "YYYEEEEEEAAAAAAAAHHHHHHHHHHH";
    const letters = text.split('');
    
    // Clear any existing animation
    this.animationOverlay.innerHTML = '';
    
    // Create container for the text
    const textContainer = document.createElement('div');
    textContainer.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Arial Black', Arial, sans-serif;
        font-size: 8vw;
        font-weight: 900;
        color: #ff6b35;
        text-shadow: 
            3px 3px 0px #000,
            6px 6px 10px rgba(0,0,0,0.8),
            0 0 20px #ff6b35,
            0 0 40px #ff6b35;
        letter-spacing: 0.1em;
        white-space: nowrap;
        z-index: 1000;
    `;
    
    this.animationOverlay.appendChild(textContainer);
    
    // Add each letter with increasing delay
    letters.forEach((letter, index) => {
        setTimeout(() => {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = letter;
            letterSpan.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: scale(0) rotate(360deg);
                animation: letterAppear 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            `;
            
            textContainer.appendChild(letterSpan);
            
            // Add screen flash effect on certain letters
            if (index === 2 || index === 8 || index === 16 || index === letters.length - 1) {
                this.createScreenFlash();
            }
        }, index * 100);
    });
    
    // Remove the animation after completion
    setTimeout(() => {
        textContainer.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => {
            textContainer.remove();
        }, 1000);
    }, letters.length * 100 + 2000);
    
    // Add CSS animations
    this.addAnimationCSS('letterAppear', `
        @keyframes letterAppear {
            0% {
                opacity: 0;
                transform: scale(0) rotate(360deg) translateY(-50px);
                filter: blur(10px);
            }
            50% {
                opacity: 1;
                transform: scale(1.2) rotate(0deg) translateY(0px);
                filter: blur(0px);
            }
            100% {
                opacity: 1;
                transform: scale(1) rotate(0deg) translateY(0px);
                filter: blur(0px);
            }
        }
    `);
    
    this.addAnimationCSS('fadeOut', `
        @keyframes fadeOut {
            0% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1.5);
            }
        }
    `);
    
    this.addAnimationCSS('screenFlash', `
        @keyframes screenFlash {
            0% {
                background: rgba(255, 107, 53, 0);
            }
            50% {
                background: rgba(255, 107, 53, 0.3);
            }
            100% {
                background: rgba(255, 107, 53, 0);
            }
        }
    `);
}

// Helper function to create screen flash effect
createScreenFlash() {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 999;
        animation: screenFlash 0.3s ease-out;
    `;
    
    document.body.appendChild(flash);
    
    setTimeout(() => {
        flash.remove();
    }, 300);
}

            // Bulk add interactive footnotes from configuration
            initializeFromConfig(config) {
                config.forEach(item => {
                    this.addInteractiveFootnote(item.id, item.animation, item.sound);
                });
            }
        }

        // Initialize the enhancer
        const EbookEnhancer = new EbookFootnoteEnhancer();

        // Example of how you would use this in your e-book system:
EbookEnhancer.initializeFromConfig([
{ id: 'fn-111', animation: 'confetti', sound: 'chime' },
        //     { id: 'fn-2', animation: 'sparkles', sound: 'bell' },
        //     { id: 'fn-3', animation: 'ripple', sound: 'pop' }
]);
