class GradientBackground {
    constructor(options = {}) {
        const defaults = {
            interval: 100,
            transitionDuration: 4000,
            targetSelector: 'body',
            colorCount: 5,
            colorStops: 2,
            usePresetColors: false,
            presetColors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead'],
            minBrightness: 30,
            maxBrightness: 85,
            enableAutoPlay: true,
            useBlur: false,
            blurAmount: '10px',
            useOverlay: false,
            overlayColor: 'rgba(0, 0, 0, 0.1)'
        };

        this.settings = { ...defaults, ...options };
        
        this.colorManager = new ColorManager(
            this.settings.colorCount,
            this.settings.usePresetColors,
            this.settings.presetColors,
            this.settings.minBrightness,
            this.settings.maxBrightness
        );
        
        this.directionManager = new DirectionManager();
        this.colorChangeCounter = 0;
        this.colorChangeThreshold = Math.floor(this.settings.transitionDuration / this.settings.interval);
        this.isPlaying = this.settings.enableAutoPlay;
        this.animationFrame = null;
        
        this.targetElements = null;
        
        this.updateGradient = this.updateGradient.bind(this);
        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.toggle = this.toggle.bind(this);
        
        this.init();
    }

    updateGradient() {
        if (!this.isPlaying) return;

        const step = 1 / this.colorChangeThreshold;
        this.colorManager.updateCurrentColors(step);
        this.directionManager.updateCurrentDirection(step);
        this.setGradient();

        this.colorChangeCounter++;
        if (this.colorChangeCounter >= this.colorChangeThreshold) {
            this.colorChangeCounter = 0;
            this.colorManager.setNextColors();
            this.directionManager.setNextDirection();
        }

        this.animationFrame = requestAnimationFrame(this.updateGradient);
    }

    setGradient() {
        if (!this.targetElements) return;
        
        const { currentColors } = this.colorManager;
        const { currentDirection } = this.directionManager;
        const gradientStyle = `linear-gradient(${currentDirection}deg, ${currentColors.join(', ')})`;
        
        this.targetElements.forEach(element => {
            element.style.backgroundImage = gradientStyle;
            
            if (this.settings.useBlur) {
                element.style.backdropFilter = `blur(${this.settings.blurAmount})`;
            }
            
            if (this.settings.useOverlay) {
                const overlayStyle = `linear-gradient(${this.settings.overlayColor}, ${this.settings.overlayColor})`;
                element.style.backgroundImage = `${overlayStyle}, ${gradientStyle}`;
            }
        });
    }

    init() {
        const initializedElements = new WeakSet();
        
        const setupElements = () => {
            this.targetElements = document.querySelectorAll(this.settings.targetSelector);
            
            this.targetElements.forEach(element => {
                if (!initializedElements.has(element)) {
                    element.style.transition = `background-image ${this.settings.transitionDuration / 1000}s ease-in-out`;
                    initializedElements.add(element);
                }
            });
            
            this.setGradient();
            
            if (this.settings.enableAutoPlay) {
                this.play();
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupElements);
        } else {
            setupElements();
        }

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.setGradient();
            }, 150);
        });
    }

    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.updateGradient();
    }

    pause() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    toggle() {
        this.isPlaying ? this.pause() : this.play();
    }
}

class ColorManager {
    constructor(colorCount, usePresetColors, presetColors, minBrightness, maxBrightness) {
        this.colorCount = colorCount;
        this.usePresetColors = usePresetColors;
        this.presetColors = presetColors;
        this.minBrightness = minBrightness;
        this.maxBrightness = maxBrightness;
        
        this.colors = this.usePresetColors ? 
            this.presetColors.slice(0, this.colorCount) : 
            this.generateRandomColors(this.colorCount);
            
        [this.currentColors, this.nextColors] = [
            this.colors.slice(0, 2),
            this.colors.slice(2, 4)
        ];
    }

    static getRandomColor(minBrightness, maxBrightness) {
        const randomChannel = () => {
            const value = Math.floor(Math.random() * 255);
            return Math.min(Math.max(value, minBrightness), maxBrightness);
        };
        
        const r = randomChannel();
        const g = randomChannel();
        const b = randomChannel();
        
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    generateRandomColors(count) {
        return Array.from(
            { length: count }, 
            () => ColorManager.getRandomColor(this.minBrightness, this.maxBrightness)
        );
    }

    static interpolateColor(color1, color2, factor) {
        const hexRegex = /\w\w/g;
        
        const interpolate = (start, end) => {
            const result = Math.round(start + factor * (end - start))
                .toString(16)
                .padStart(2, '0');
            return result;
        };

        const [r1, g1, b1] = color1.match(hexRegex).map(hex => parseInt(hex, 16));
        const [r2, g2, b2] = color2.match(hexRegex).map(hex => parseInt(hex, 16));

        return `#${interpolate(r1, r2)}${interpolate(g1, g2)}${interpolate(b1, b2)}`;
    }

    updateCurrentColors(step) {
        this.currentColors = this.currentColors.map((color, index) =>
            ColorManager.interpolateColor(color, this.nextColors[index], step)
        );
    }

    setNextColors() {
        this.nextColors = this.usePresetColors ? 
            [this.presetColors[Math.floor(Math.random() * this.presetColors.length)],
             this.presetColors[Math.floor(Math.random() * this.presetColors.length)]] :
            this.generateRandomColors(2);
    }
}

class DirectionManager {
    constructor() {
        this.currentDirection = 0;
        this.nextDirection = this.getRandomDirection();
    }

    getRandomDirection() {
        return Math.floor(Math.random() * 360);
    }

    interpolateDirection(current, next, factor) {
        const delta = next - current;
        const shortestPath = delta > 180 ? delta - 360 : (delta < -180 ? delta + 360 : delta);
        return (current + shortestPath * factor + 360) % 360;
    }

    updateCurrentDirection(step) {
        this.currentDirection = this.interpolateDirection(
            this.currentDirection,
            this.nextDirection,
            step
        );
    }

    setNextDirection() {
        this.nextDirection = this.getRandomDirection();
    }
}
