# Background-Generator
 Background generator on JavaScript

## Usage
1. Include the script in your HTML file:

   ```html
   <script type="module" src="main.js"></script>
   ```
2. Create an instance of BackgroundGenerator and start it in your main.js:
    ```javascript
    import BackgroundGenerator from "./background-generator.js";

    const options = {
    gradientInterval: 4500,
    initialColors: ['rgb(255, 0, 0)', 'rgb(0, 0, 255)'],
    };

    const backgroundGenerator = new BackgroundGenerator(options);
    backgroundGenerator.start();
    ```

