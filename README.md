# Background Generator

A powerful JavaScript library for creating smooth, dynamic background gradients with advanced customization options. This library provides an easy way to add beautiful, animated gradient backgrounds to any webpage with extensive configuration options and performance optimizations.

## Features

- 🎨 Smooth transitions between colors with configurable durations
- 🔄 Dynamic gradient direction changes
- ⚡ Optimized performance using requestAnimationFrame
- 🎯 Customizable color presets and random color generation
- 🌫️ Optional blur and overlay effects
- 🎮 Playback control (play/pause/toggle)
- 🎛️ Extensive configuration options
- 📱 Responsive and mobile-friendly
- 🔧 Easy to integrate and customize

## Installation

### Download
Download the `background-generator.js` file and include it in your HTML:
```html
<script src="path/to/background-generator.js"></script>
```

## Usage

### Basic Usage
```javascript
// Create a new instance with default settings
new GradientBackground();
```

### Advanced Configuration
```javascript
const gradient = new GradientBackground({
    // Animation settings
    interval: 50,                // Update interval in milliseconds
    transitionDuration: 3000,    // Transition duration in milliseconds
    
    // Target element
    targetSelector: '.background',
    
    // Color settings
    colorCount: 4,
    usePresetColors: true,
    presetColors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'],
    minBrightness: 40,
    maxBrightness: 80,
    
    // Visual effects
    useBlur: true,
    blurAmount: '5px',
    useOverlay: true,
    overlayColor: 'rgba(0, 0, 0, 0.05)',
    
    // Playback control
    enableAutoPlay: true
});
```

### Playback Control
```javascript
gradient.play();

gradient.pause();

gradient.toggle();
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `interval` | Number | 100 | Update interval in milliseconds |
| `transitionDuration` | Number | 4000 | Duration of color transitions |
| `targetSelector` | String | 'body' | CSS selector for target elements |
| `colorCount` | Number | 5 | Number of colors to use |
| `colorStops` | Number | 2 | Number of color stops in the gradient |
| `usePresetColors` | Boolean | false | Use preset colors instead of random |
| `presetColors` | Array | [...] | Array of preset color hex codes |
| `minBrightness` | Number | 30 | Minimum brightness for random colors |
| `maxBrightness` | Number | 85 | Maximum brightness for random colors |
| `enableAutoPlay` | Boolean | true | Start animation automatically |
| `useBlur` | Boolean | false | Enable backdrop blur effect |
| `blurAmount` | String | '10px' | Blur effect intensity |
| `useOverlay` | Boolean | false | Enable color overlay |
| `overlayColor` | String | 'rgba(0,0,0,0.1)' | Overlay color with opacity |

## Examples

### Basic Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic Background Generator</title>
    <script src="background-generator.js"></script>
    <style>
        body {
            height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            color: white;
        }
    </style>
</head>
<body>
    <h1>Dynamic Background</h1>
    <script>
        new GradientBackground();
    </script>
</body>
</html>
```

### Custom Preset Colors
```javascript
new GradientBackground({
    usePresetColors: true,
    presetColors: [
        '#ff6b6b',
        '#4ecdc4',
        '#45b7d1',
        '#96ceb4',
        '#ffeead'
    ],
    transitionDuration: 3000
});
```

### With Visual Effects
```javascript
new GradientBackground({
    useBlur: true,
    blurAmount: '5px',
    useOverlay: true,
    overlayColor: 'rgba(0, 0, 0, 0.1)',
    interval: 50,
    transitionDuration: 2000
});
```

## Performance Considerations

- Uses `requestAnimationFrame` for smooth animations
- Implements event debouncing for window resize events
- Caches DOM queries and computed values
- Optimizes color interpolation calculations
