class SmartGradientGenerator {
  constructor() {
    this.previousGradient = {
      colors: this.generatePreviousGradientArray(70),
      direction: 0,
    };
  }

  applySmartGradient() {
    const newColors = this.generateSimilarColors(this.previousGradient.colors);
    const gradientDirection =
      (this.previousGradient.direction + this.randomInRange(-25, 25) + 360) % 360;
    const newGradient = `linear-gradient(${gradientDirection}deg, ${newColors[0]}, ${newColors[1]})`;

    const backgroundElement = document.createElement("div");
    backgroundElement.className = "background-overlay";
    backgroundElement.style.backgroundImage = newGradient;
    document.body.appendChild(backgroundElement);

    setTimeout(() => {
      document.body.removeChild(backgroundElement);
      document.body.style.backgroundImage = newGradient;
    }, 1000);

    this.previousGradient.colors = newColors;
    this.previousGradient.direction = gradientDirection;
  }

  randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateSimilarColors(baseColors) {
    const similarColors = [];

    for (const baseColor of baseColors) {
      const color = this.parseRGB(baseColor);
      const hueShift = this.randomInRange(-35, 35);
      const newColor = this.adjustHue(color, hueShift);
      similarColors.push(newColor);
    }

    return similarColors;
  }

  parseRGB(rgbString) {
    const [r, g, b] = rgbString.match(/\d+/g);
    return { r: parseInt(r), g: parseInt(g), b: parseInt(b) };
  }

  adjustHue(color, degrees) {
    const { r, g, b } = color;
    const hsl = this.rgbToHsl(r, g, b);

    const newHue = (hsl.h + degrees + 360) % 360;
    const newRgb = this.hslToRgb(newHue, hsl.s, hsl.l);

    return `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`;
  }

  rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else if (max === b) {
        h = (r - g) / d + 4;
      }

      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r, g, b;

    if (h >= 0 && h < 60) {
      r = c; g = x; b = 0;
    } else if (h >= 60 && h < 120) {
      r = x; g = c; b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0; g = c; b = x;
    } else if (h >= 180 && h < 240) {
      r = 0; g = x; b = c;
    } else if (h >= 240 && h < 300) {
      r = x; g = 0; b = c;
    } else if (h >= 300 && h < 360) {
      r = c; g = 0; b = x;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
  }

  generatePreviousGradientArray(count) {
    const gradientArray = [];
    for (let i = 0; i < count; i++) {
      gradientArray.push(this.generateRandomRGB());
    }
    return gradientArray;
  }

  generateRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

const gradientGenerator = new SmartGradientGenerator();
setInterval(() => gradientGenerator.applySmartGradient(), 5000);
