/* Particle class.
 *  Entities: 
 *      Position - x,y vector with initial random position within the screen dimensions
 *      PreviousPosition - used for show() method to make the trace more seamless
 *      Velocity - vx, vy vector influenced by the acceleration entity
 *      Accelaration - ax, ay vector influenced by the flow field
 *      MaxSpeed - constraint to defluence the effect of long positive accelaration periods within the perlin space
 *      Color - each particle has a color set upon instantiation
 *  Methods:
 *      updatePreviousPosition() - copies the current position before it's updated
 *      edges() - ensures each particle stays within the canvas at all times by wrapping edges 
 *      applyFlowForce() - changes acceleration of the particle based on the flow field vector within its grid cell
 *      move() - changes the position, velocity and calls edges(). Sets acceleration to 0 after use.
 *      show() - displays the trace by drawing a line between the current and previous position
*/
class Particle {
    constructor(maxSpeed, color) {
        this.position = createVector(random(dimensionWidth), random(dimensionHeight), random(dimensionDepth))
        this.previousPosition = this.position.copy()
        this.velocity = createVector(0, 0, 0)
        this.acceleration = createVector(0, 0, 0)
        this.maxSpeed = maxSpeed
        this.color = color

    }    
    show() {
        push()
        noFill()
        stroke(this.color[0], this.color[1], this.color[2], this.color[3])
        line(this.position.x, this.position.y, this.position.z, this.previousPosition.x, this.previousPosition.y, this.previousPosition.z)
        this.updatePreviousPosition()
        pop()
        return this.position
    }
    move(centreStrength) {
        this.edges()
        this.centreAttraction(centreStrength, 0);
        this.velocity.limit(this.maxSpeed)
        this.velocity.add(this.acceleration)
        this.position.add(this.velocity)
        this.acceleration.mult(0)
    }
    applyFlowForce(flowField, flowFieldResolution, strength) {
        let ix = int(map(this.position.x, 0, dimensionWidth, 0, flowFieldResolution - 1))
        let iy = int(map(this.position.y, 0, dimensionHeight, 0, flowFieldResolution - 1))
        let iz = int(map(this.position.z, 0, dimensionDepth, 0, flowFieldResolution - 1))
        this.acceleration.add(flowField[ix][iy][iz])
        this.acceleration.mult(strength)
    }
    edges() {
        if (this.position.x < 0) {
            this.position.x = dimensionWidth;
            this.updatePreviousPosition()
        }
        else if (this.position.x > dimensionWidth) {
            this.position.x = 0;
            this.updatePreviousPosition()
        }
        if (this.position.y < 0) {
            this.position.y = dimensionHeight;
            this.updatePreviousPosition()
        }
        else if (this.position.y > dimensionHeight) {
            this.position.y = 0;
            this.updatePreviousPosition()
        }
        if (this.position.z < 0) {
            this.position.z = dimensionHeight;
            this.updatePreviousPosition()
        }
        else if (this.position.z > dimensionHeight) {
            this.position.z = 0;
            this.updatePreviousPosition()
        }

    }
    updatePreviousPosition() {
        this.previousPosition = this.position.copy()
    }
    centreAttraction(scale, limit) {
        let centreDirectionVector = createVector(dimensionWidth/2 - this.position.x, dimensionHeight/2 - this.position.y, dimensionDepth/2 - this.position.z);
        let effectStrength = (pow((dimensionWidth/2 - this.position.x), 2) + pow(dimensionHeight/2 - this.position.y, 2) + pow(dimensionDepth/2 - this.position.z,2)) * scale
        centreDirectionVector.mult(effectStrength);
        centreDirectionVector.limit(limit);
        this.acceleration.add(centreDirectionVector);
    }
}

