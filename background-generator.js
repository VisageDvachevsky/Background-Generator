class GradientBackground {
    constructor(interval = 100, transitionDuration = 4000) {
        this.interval = interval;
        this.transitionDuration = transitionDuration;
        this.colorManager = new ColorManager(5);
        this.directionManager = new DirectionManager();
        this.colorChangeCounter = 0;
        this.colorChangeThreshold = Math.floor(transitionDuration / interval); 
        this.init();
    }

    updateGradient() {
        const step = 1 / this.colorChangeThreshold; 
        this.colorManager.updateCurrentColors(step);
        this.directionManager.updateCurrentDirection(step);
        this.setGradient(this.colorManager.currentColors, this.directionManager.currentDirection);

        this.colorChangeCounter++;
        if (this.colorChangeCounter >= this.colorChangeThreshold) {
            this.colorChangeCounter = 0;
            this.colorManager.setNextColors();
            this.directionManager.setNextDirection();
        }
    }

    setGradient(colors, direction) {
        document.body.style.backgroundImage = `linear-gradient(${direction}deg, ${colors.join(', ')})`;
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.style.transition = `background-image ${this.transitionDuration / 1000}s ease-in-out`;
            this.setGradient(this.colorManager.currentColors, this.directionManager.currentDirection);

            setInterval(() => this.updateGradient(), this.interval);
        });
    }
}

class ColorManager {
    constructor(colorCount) {
        this.colorCount = colorCount;
        this.colors = this.generateRandomColors(colorCount);
        [this.currentColors, this.nextColors] = [this.colors.slice(0, 2), this.colors.slice(2, 4)];
    }

    static getRandomColor() {
        return `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;
    }

    generateRandomColors(count) {
        return Array.from({ length: count }, ColorManager.getRandomColor);
    }

    static interpolateColor(color1, color2, factor) {
        const interpolate = (start, end) => Math.round(start + factor * (end - start)).toString(16).padStart(2, '0');
        const [r1, g1, b1] = color1.match(/\w\w/g).map(hex => parseInt(hex, 16));
        const [r2, g2, b2] = color2.match(/\w\w/g).map(hex => parseInt(hex, 16));
        return `#${interpolate(r1, r2)}${interpolate(g1, g2)}${interpolate(b1, b2)}`;
    }

    updateCurrentColors(step) {
        this.currentColors = this.currentColors.map((color, index) =>
            ColorManager.interpolateColor(color, this.nextColors[index], step)
        );
    }

    setNextColors() {
        this.nextColors = this.generateRandomColors(2);
    }
}

class DirectionManager {
    constructor() {
        this.currentDirection = 0;
        this.nextDirection = DirectionManager.getRandomDirection();
    }

    static getRandomDirection() {
        return Math.floor(Math.random() * 360);
    }

    static interpolateDirection(current, next, factor) {
        const delta = next - current;
        const direction = delta > 180 ? current - factor * (360 - delta) : current + factor * delta;
        return (direction + 360) % 360;
    }

    updateCurrentDirection(step) {
        this.currentDirection = DirectionManager.interpolateDirection(this.currentDirection, this.nextDirection, step);
    }

    setNextDirection() {
        this.nextDirection = DirectionManager.getRandomDirection();
    }
}

new GradientBackground();
