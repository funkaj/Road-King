import Entities from "./Entities.js"
import PlayerLaser from "./PlayerLaser.js"

class Player extends Entities {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player")
        this.setData("speed", 285); // Speed PLaer for the desktop's screen (big ones)
        this.setData("isShooting", false);
        this.setData("timerShootDelay", 10);
        this.setData("timerShootTick", this.getData("timerShootDelay") - 1);

    }
    // Logic for movement 


    moveUp() {
        this.body.velocity.y = -this.getData("speed");
    }
    moveDown() {
        this.body.velocity.y = this.getData("speed");

    }
    moveLeft() {
        this.body.velocity.x = -this.getData("speed");

    }
    moveRight() {
        this.body.velocity.x = this.getData("speed");
    }



    update() {
        //Position in the game
        this.body.setVelocity(0, 0);
        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

        // Creating a manual shooting delay - so shooting would look natural and logical

        if (this.getData("isShooting")) {
            if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
                this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
            }
            else { // when the "manual timer" is triggered:
                var laser = new PlayerLaser(this.scene, this.x, this.y);
                this.scene.playerLasers.add(laser);
                laser.setScale(this.scene.game.config.height * 0.0035)

                this.setData("timerShootTick", 0);
            }
        }
    }

}

export default Player