import Entities from "./Entities.js"

//Creating Laser Particle for Player 

class PlayerLaser extends Entities {
  constructor(scene, x, y) {
    super(scene, x, y, "sprLaserPlayer");
    this.body.velocity.y = -200; // Shooting up
  }
}

export default PlayerLaser