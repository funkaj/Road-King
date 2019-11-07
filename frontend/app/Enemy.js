import Entities from "./Entities.js"
import EnemyLaser from "./EnemyLaser.js"
import Koji from "koji-tools"

// Adding some enemies features

class Enemy0 extends Entities {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy0", "EnemyShip");
    this.body.velocity.y = Phaser.Math.Between(Koji.config.settings.minenemyspeed, Koji.config.settings.maxenemyspeed);

    // Shooting for the enemies 

    this.shootTimer = this.scene.time.addEvent({
      delay: Phaser.Math.Between(Koji.config.settings.minshootspeed, Koji.config.settings.maxshootspeed), // Delay beetwen enemy's shoots
      callback: function () {
        var laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y
        );
        laser.setScale(2.5);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

// Class of the the second enemy - for the possibile expansion of the tempalte

class Enemy1 extends Entities {
  constructor(scene, x, y) {
    super(scene, x, y, "sprEnemy1", "Enemy2Ship");
    this.body.velocity.y = Phaser.Math.Between(Koji.config.settings.maxenemyspeed, Koji.config.settings.maxenemyspeed);
  }
}

export default Enemy0
