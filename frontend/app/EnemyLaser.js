import Entities from "./Entities.js"

// Enemy Laser Class 

class EnemyLaser extends Entities {
  constructor(scene, x, y) {
    super(scene, x, y, "sprLaserEnemy");
    this.body.velocity.y = 200; // Shoot down
  }
}


export default EnemyLaser