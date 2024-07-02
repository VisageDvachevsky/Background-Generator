# Background-Generator

A JavaScript library for generating dynamic, transitioning background gradients. This script allows you to add smoothly transitioning background gradients to any webpage, with customizable colors and directions.

## Features

- Smoothly transitioning gradients between random colors.
- Randomly changing gradient directions.
- Customizable transition duration and update interval.

![Demo](assets/demo.gif)

## Installation

1. Download the `background-generator.js` file and include it in your HTML file:

   ```html
   <script src="background-generator.js"></script>
   ```

## Usage

### Basic Usage

To use the background generator, simply create a new instance of the `GradientBackground` class:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Background Generator Example</title>
    <script src="background-generator.js"></script>
</head>
<body>
    <script>
        // Create a new GradientBackground instance
        new GradientBackground();
    </script>
</body>
</html>
```

### Customization

You can customize the transition duration and update interval by passing parameters to the `GradientBackground` constructor. The default `interval` is 100ms, and the default `transitionDuration` is 4000ms (4 seconds).

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Customized Background Generator</title>
    <script src="background-generator.js"></script>
</head>
<body>
    <script>
        // Create a new GradientBackground instance with custom settings
        const interval = 200; // Update interval in milliseconds
        const transitionDuration = 5000; // Transition duration in milliseconds
        new GradientBackground(interval, transitionDuration);
    </script>
</body>
</html>
```

## Classes

### GradientBackground

The main class responsible for managing the gradient background.

#### Constructor

- `GradientBackground(interval = 100, transitionDuration = 4000)`

  - `interval`: The time (in milliseconds) between each update of the gradient.
  - `transitionDuration`: The time (in milliseconds) it takes for the gradient to transition from one set of colors and direction to the next.

### ColorManager

Handles the generation and interpolation of colors for the gradient.

#### Methods

- `generateRandomColors(count)`: Generates an array of random colors.
- `interpolateColor(color1, color2, factor)`: Interpolates between two colors.
- `updateCurrentColors(step)`: Updates the current colors by interpolating towards the next colors.
- `setNextColors()`: Generates new target colors for the next state.

### DirectionManager

Handles the generation and interpolation of directions for the gradient.

#### Methods

- `getRandomDirection()`: Generates a random direction angle between 0 and 360 degrees.
- `interpolateDirection(current, next, factor)`: Interpolates between the current and next direction angles.
- `updateCurrentDirection(step)`: Updates the current direction by interpolating towards the next direction.
- `setNextDirection()`: Generates a new target direction for the next state.

## Example

Here is a complete example showing how to use the `GradientBackground` class in your webpage:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Background Generator Example</title>
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
    <h1>Dynamic Background Gradient</h1>
    <script>
        // Create a new GradientBackground instance with default settings
        new GradientBackground();
    </script>
</body>
</html>
```

## Examples

Explore different usage examples:

- [Basic Example](examples/example1.html)
- [Customized Interval and Duration](examples/example2.html)
- [Multiple Instances](examples/example3.html)
- [Different Color Sets](examples/example4.html)
- [Pausing and Resuming Animation](examples/example5.html)

To view an example, open the corresponding HTML file in your browser.
