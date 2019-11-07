import Koji from "koji-tools"
import Player from "./Player.js"
import Enemy0 from "./Enemy.js"

class SceneMain extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMain" });
    }

    preload() {
        // Loading assets from Koji
        this.load.image("sprBg0", Koji.config.images.background);
        this.load.image("sprEnemy0", Koji.config.images.enemy1);
        this.load.image("sprLaserEnemy", Koji.config.images.enemylaser);
        this.load.image("sprLaserPlayer", Koji.config.images.playerlaser);
        this.load.image("sprPlayer", Koji.config.images.mouse);
        this.load.image("mcontrvert", Koji.config.images.mcontrvert);
        this.load.image("mcontrhori", Koji.config.images.mcontrhori);
        this.load.image("mcontr", Koji.config.images.mcontr);
        this.load.image("SoundOn", Koji.config.images.soundon);
        this.load.image("Soundoff", Koji.config.images.soundoff);
        this.load.audio("bgm", Koji.config.sounds.backgroundMusic);
        
    }
    // Pushhing enemies by type in the array
    getEnemiesByType(type) {
        var arr = [];
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            if (enemy.getData("type") == type) {
                arr.push(enemy);
            }
        }
        return arr;
    }



    create() {
        // Background creation
        this.background = this.add.tileSprite(
            this.game.config.width / 2,
            this.game.config.height / 2,
            this.game.config.width,
            this.game.config.height, 'sprBg0');

         // music toggle button logic and creation
        // loading global variable
        this.bgm = window.music;
        
        if (window.soundEnable == true) {
            this.soundbtn = this.add.sprite(
                20,
                20,
                "Soundon"
            )
        } else {
            this.soundbtn = this.add.sprite(
                20,
                20,
                "Soundoff")
        }
        
        this.soundbtn.setInteractive();

        this.soundbtn.on("pointerup", function () {
            if (window.soundEnable == true) {
                this.soundbtn.setTexture("Soundoff");
                this.bgm.setMute(true)
                window.soundEnable = false;
            } else {
                this.soundbtn.setTexture("Soundon");
            this.bgm.setMute(false)
                window.soundEnable = true;
            }
        }, this);

        // Creating Anumation of the explition 
        this.anims.create({
            key: "sprExplosion",
            frames: this.anims.generateFrameNumbers("sprExplosion"),
            frameRate: 20,
            repeat: 0
        });
        // Setting a player from the Player Class
        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.80,
            "sprPlayer"
        );

        //Size of the player

        this.player.setScale(this.game.config.height * 0.0010)
        // Controllers for Desktop
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        // Button Controllers for Mobile for the futher extension
        // if (this.game.config.width < 700) {
        //     this.input.addPointer(3);

        //     this.upBtn = this.add.sprite(this.game.config.width * 0.2 + 20, this.game.config.height * 0.75, 'mcontrvert').setScale(this.game.config.width * 0.00075).setScrollFactor(0).setInteractive();
        //     this.downBtn = this.add.sprite(this.game.config.width * 0.2 + 20, this.game.config.height * 0.9, 'mcontrvert').setScale(this.game.config.width * 0.00075).setScrollFactor(0).setInteractive();
        //     this.leftBtn = this.add.sprite(this.game.config.width * 0.1 + 10, this.game.config.height * 0.85 - 10, 'mcontrhori').setScale(this.game.config.width * 0.00070).setScrollFactor(0).setInteractive();
        //     this.rightBtn = this.add.sprite(this.game.config.width * 0.3 + 30, this.game.config.height * 0.85 - 10, 'mcontrhori').setScale(this.game.config.width * 0.00070).setScrollFactor(0).setInteractive();

        //     this.shootBtn = this.add.sprite(this.game.config.width * 0.75, this.game.config.height * 0.85 - 10, 'mcontr').setScale(this.game.config.height * 0.001).setScrollFactor(0).setInteractive();
        //     this.shootBtn.alpha = 0.08
        //     this.upBtn.alpha = 0.08
        //     this.downBtn.alpha = 0.08
        //     this.leftBtn.alpha = 0.08
        //     this.rightBtn.alpha = 0.08

        // }

        // Grouping enemies, player, lasers for the easier controloing reasons
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();
        // Logic of the ship spawning 
        this.time.addEvent({
            delay: Koji.config.settings.spawnspeed, //change to lesser value for ships to spawn faster
            callback: function () {
                var enemy = null;
                // Logic for random soawning of the enemies of different types - also a possiblity for future extensions.
                if (Phaser.Math.Between(0, 10) >= 3) {
                    var enemy = new Enemy0(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                } // else spawn another enemy - enemy1
                if (enemy !== null) {
                    enemy.setScale(Phaser.Math.Between(this.game.config.height * 0.0015, this.game.config.height * 0.0015 + 3) * 0.1);
                    this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });
        // Adding physical collision for player laser with enemy
        this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                }
                enemy.explode(true);
                playerLaser.destroy();
            }

        });

        // Adding physical collision enemy with player

        this.physics.add.overlap(this.player, this.enemies, function (player, enemy) {
            if (!player.getData("isDead") &&
                !enemy.getData("isDead")) {
                player.explode(false);
                player.onDestroy()
                enemy.explode(true);
            }
        });


        // Adding physical collision enemy laser with player

        this.physics.add.overlap(this.player, this.enemyLasers, function (player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
                player.explode(false);
                player.onDestroy()
                laser.destroy();
            }
        });




        // code for the adding music
        this.sfx = {
            explosions: [
                this.sound.add("sndExplode0"),
            ],
            bgm: this.sound.add('bgm')
        };
    };



    update() {

        //Mobile swipe controlling

        // Controllers for Mobile (click right or left from Player to move it)

        this.input.on("pointerdown", function (event) {
            this.pointerX = event.x;
            this.pointerY = event.y;

            if (this.player.x > this.pointerX) {
                this.keyA.isDown = true
            }
            else if (this.player.x < this.pointerX) {
                this.keyD.isDown = true
            }
            if (this.game.config.width < 700) {
                this.keySpace.isDown = true
            }
        }, this
        )

        this.input.on("pointerup", function () {
            this.keyW.isDown = false
            this.keyD.isDown = false
            this.keyA.isDown = false
            this.keyS.isDown = false
            // this.keySpace.isDown = false
        }, this)




        // Scroll background
        this.background.tilePositionY -= 0.5;

        //WASD controlling. If plyer is not dead yet - he can move and shoot with the WASD and Spacebar keys

        if (!this.player.getData("isDead")) {
            this.player.update();
            if (this.keyW.isDown) {
                this.player.moveUp();
            }
            else if (this.keyS.isDown) {
                this.player.moveDown();
            }
            if (this.keyA.isDown) {
                this.player.moveLeft();
            }
            else if (this.keyD.isDown) {
                this.player.moveRight();
            }
            if (this.keySpace.isDown) {
                this.player.setData("isShooting", true);
            }
            else {
                this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
                this.player.setData("isShooting", false);
            }
        }

        // Destroy enemy and erase from the scene after they are out of the window
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            enemy.update();
            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {
                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy();
                    }
                    enemy.destroy();
                }
            }

        }
        // destroying lasers after they are out of the window
        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
            var laser = this.playerLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }

    }

}
export default SceneMain