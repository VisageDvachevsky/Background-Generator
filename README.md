# Background-Generator
 Background generator on JavaScript

## Usage
1. Include the script in your HTML file:

   ```html
      <script type="module" src="background-generator.js"></script>
   ```
2. Create an instance of BackgroundGenerator and start it in your main.js:
    ```javascript
      import { SmartGradientGenerator } from './background-generator';

      const gradientGenerator = new SmartGradientGenerator();
      setInterval(() => gradientGenerator.applySmartGradient(), 5000);
    ```

