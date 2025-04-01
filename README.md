# 🌬️ 3 Dimensional Flow Field Animation

This is a generative art project built with [p5.js](https://p5js.org/) that simulates particle movement influenced by a 3D flow field. Particles are dropped onto the canvas and follow a vector field generated using Perlin noise. Over time, they trace intricate, flowing paths, resulting in stunning and organic visuals.

---

## ✨ Demo

![flowfield-preview](preview.gif)  
*Add a GIF or screenshot of your output here*

---

## 🧠 How It Works

- The canvas is divided into a grid where each cell contains a directional vector.
- These vectors are generated using 3D Perlin noise (`x`, `y`, `z`), with the `z` axis changing over time for animated flow.
- Thousands of particles are initialized with random positions and move based on the vector direction in their current grid cell.
- As particles move, they draw lines from their previous to current positions, building a beautiful flow pattern.
- The system wraps particles around the canvas edges, creating an infinite-loop effect.

---

## 📁 Files

- `sketch.js` – Sets up the canvas, updates the flow field, and controls the animation loop.
- `particle.js` – Defines the `Particle` class and its behavior (movement, rendering, interaction with flow).

---

## 🧩 Key Features

- **Dynamic flow field** using Perlin noise
- **5,000 particles** for high-detail visuals
- **Color customization** and transparency blending
- **Wraparound boundaries** for continuous motion
- **Frame rate logging** for performance insight

---

## 🎨 Customization

You can change the following parameters in `sketch.js` to experiment with different visuals:

```js
const numberOfParticles = 5000
const flowStrength = 2
const maxSpeed = 4
const particleColor = [255, 255, 255, 5] // RGBA
const backgroundColor = [2, 2, 50]       // RGB
const flowGridResolution = 10
const flowFieldResolution = 30
```

You can also adjust how `p5.Vector.fromAngle(...)` is calculated inside `updateFlowField` for more dramatic or subtle directional changes.

---

## 🚀 Getting Started

To run this project:

1. Clone the repository or download the files.
2. Open `index.html` (not included here, but see below for an example).
3. Make sure p5.js is linked properly.
4. Open in browser and watch the particles dance!

Example `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js"></script>
    <script src="particle.js"></script>
    <script src="sketch.js"></script>
  </head>
  <body></body>
</html>
```

---

## 📸 Save Your Art

You can use the p5.js `save()` or `saveCanvas()` functions or enable the `saveGif()` line in `setup()` to capture animations.

---

## 🧪 Future Ideas

- Export stills or animations as high-res images or GIFs
- GUI for adjusting flow field or particle settings in real-time
- Add interactivity (e.g., mouse-based vector influence)
- Explore colored flow fields or multi-layered particle sets

---

## 🐾 Credits

Built with ❤️ using [p5.js](https://p5js.org/)
