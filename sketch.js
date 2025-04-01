/* Add Description in the future
 * 


 */

let camAngle = 0;
let camRadius = 300;
let camSpeed = 0.015;

let flowField = [[[]]]
let particles = []
let tOff = 0
let dimensionWidth = 600
let dimensionHeight = 600
let dimensionDepth = 600

let simplex;

const settings = {
  seed: 3,
};
simplex = new OpenSimplexNoise(settings.seed);


// play around with these parameters for different results
const flowFieldResolution = 10      // resolution of grid vectors
const tstep = 0.01                  // how quick the vectors (direction of particles) change
const numberOfParticles = 1000      
const flowGridResolution = 5        // how different the adjacent cell vectors are within the perlin space (recommended 5)
let sFlow, flowStrength = 1              // how much the direction of the particle velocity is influenced by the field vector
let sCentre, centreStrength = 0
const maxSpeed = 2                  // maximum (and usually average) speed of the particles
const backgroundColor = [2, 2, 50]  // r,g,b 
const particleColor = [255, 255, 255, 100]  // r,g,b,hue
/* adds a random factor to the color of each particle. format: [[RedStart, RedEnd], [GreenStart, GreenEnd], [BlueStart, BlueEnd]] 
 * To keep the original color with no changes, set to [[1, 1], [1, 1], [1, 1]]
 * Example: 
 * if set to [[1, 1], [0, 1], [0, 1]], green and blue components of the original color have a chance to be reduced
 * and hence the particles will be mostly influenced by the red component of the initial color
*/
const randomColorScale = [[1, 1], [0.3, 0.7], [0.3, 0.7]]  


function setup() {
  MainCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
  background(backgroundColor);
  flowField = updateFlowField(0, flowGridResolution);
  particles = createParticles(numberOfParticles);
  createSliders();
  
  strokeWeight(2);

  setupCameraOrbit(600, 0.01);
}

function draw() {
  background(backgroundColor);

  //orbitControl();
  updateCameraOrbit();

  push();
  noFill();
  stroke(255, 255, 255, 10);
  strokeWeight(1);
  sphere(50);
  stroke(255, 255, 255, 70);
  box(dimensionWidth);
  pop();


  translate(-dimensionWidth/2, -dimensionHeight/2, -dimensionDepth/2);
  
  displayParticles(particles, flowField, flowFieldResolution)
  //displayFlowField(flowField);
  flowField = updateFlowField(tOff, flowGridResolution)
  tOff += tstep

  updateSliders();

  

}

function updateFlowField(tOff, resolution) {
  let array = [[[]]]
  for (let x = 0; x <= flowFieldResolution; x++) {
    for (let y = 0; y <= flowFieldResolution; y++) {
      for (let z = 0; z <= flowFieldResolution; z++) {
        let theta = simplex.noise4D(x / resolution, y / resolution, z / resolution, tOff) * TWO_PI; // azimuth
        let phi = simplex.noise4D((x + 1000) / resolution, (y + 1000) / resolution, (z + 1000) / resolution, tOff) * PI; // polar
        array[x][y].push(createVector(sin(phi) * cos(theta), cos(phi), sin(phi) * sin(theta)));
      } 
      array[x].push([])
    }
    array.push([[]])
  }
  
  return array
}

// Show small lines pointing to the direction of the vector in a given cell within a grid
function displayFlowField(field) {
  for (let x = 0; x < flowFieldResolution; x++) {
    for (let y = 0; y < flowFieldResolution; y++) {
      for (let z = 0; z < flowFieldResolution; z++) {
        push()
        stroke(255)
        translate(x * dimensionWidth / flowFieldResolution, y * dimensionHeight / flowFieldResolution, z * dimensionHeight / flowFieldResolution)
        
        line(0, 0, 0, field[x][y][z].x * 20, field[x][y][z].y * 20, field[x][y][z].z * 20);
        pop()
      }
    }
  }
}

// create particle objects array (see classes.js for class definition)
function createParticles(numOfParticles) {
  array = []
  for (let i = 0; i < numOfParticles; i++) {
    adjustedColor = [particleColor[0] * random(randomColorScale[0][0], randomColorScale[0][1]), particleColor[1] * random(randomColorScale[1][0], randomColorScale[1][1]), particleColor[2] * random(randomColorScale[2][0], randomColorScale[2][1]), particleColor[3]]
    array.push(new Particle(maxSpeed, adjustedColor))
  }
  return array
}

// display and update particles 
function displayParticles(array, flowField, flowFieldResolution) {
  push()
  for (let particle of array) {
    particle.applyFlowForce(flowField, flowFieldResolution, flowStrength)
    particle.move(centreStrength)
    particle.show()
  }
  pop()
}


function createSliders() {
  sFlow = createSlider(0, 20, flowStrength, 0.5);
  sFlow.position(10, 10);
  sFlow.addClass("sliders");

  sCentre = createSlider(0.0001, 0.002, centreStrength, 0.00005);
  sCentre.position(10, 50);
  sCentre.addClass("sliders"); 
}

function updateSliders() {
  flowStrength = sFlow.value();
  centreStrength = sCentre.value();

}

function setupCameraOrbit(radius = 300, speed = 0.01) {
  camRadius = radius;
  camSpeed = speed;
}

function updateCameraOrbit() {
  let camX = camRadius * cos(camAngle);
  let camZ = camRadius * sin(camAngle);
  let camY = camRadius * 0.3 * sin(camAngle * 0.5); // optional vertical bob

  camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0); // looking at center
  camAngle += camSpeed;
}