import Phaser from "phaser";
import SceneMainMenu from "./SceneMainMenu.js"


//Entities class that is based for any Actors in the game - PLayer - enemies

class Entities extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);

    }

    

// Explotion and destroying logic for actors

    explode(canDestroy) {
        if (!this.getData("isDead")) {


            if (this.shootTimer !== undefined) {
                if (this.shootTimer) {
                    this.shootTimer.remove(false);
                }
            }
            this.setAngle(0);
            this.body.setVelocity(0, 0);
                if (canDestroy) {
                    this.destroy();
                }
                else {
                    this.setVisible(false);
                }

            this.setData("isDead", true);
        }
    }

    // If Player destroyed - change scene to Game Over one.

    onDestroy() {
        this.scene.time.addEvent({ // go to game over scene
            delay: 1000,
            callback: function () {
                this.scene.scene.start("SceneGameOver");
            },
            callbackScope: this,
            loop: false
        });
    }

}

export default Entities