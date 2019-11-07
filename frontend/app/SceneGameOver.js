import Koji from "koji-tools"


class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: "SceneGameOver" });
    }
    // prelaoding class assets
    preload() {
        this.load.image("sprBtnRestart", Koji.config.images.btnrestart);
        this.load.image("sprBtnRestartHover", Koji.config.images.btnrestartHover);
        this.load.image("sprBg0", Koji.config.images.background);
        this.load.image("Soundon", Koji.config.images.soundon);
        this.load.image("Soundoff", Koji.config.images.soundoff);
        this.load.audio("bgm", Koji.config.sounds.backgroundMusic);

    }
    create() {

        // Background tile 
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

        // Game over Text 

        this.title = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.4, Koji.config.settings.gameoverText, {
            fontFamily: Koji.config.settings.textfont,
            fontSize: this.game.config.width * 0.05 + 9,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5); // Putting text in the middle
        // Creating restart button
        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnRestart"
        );
        this.btnRestart.setInteractive(); //Setting restart button to beinteractive 
        this.btnRestart.on("pointerover", function () {
            this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
        }, this);
        this.btnRestart.on("pointerout", function () {
            this.setTexture("sprBtnRestart");
        });
        this.btnRestart.on("pointerup", function () {
            this.scene.start("SceneMain");
        }, this);

    }
    update() {
        // Creating a background scrolling
        this.background.tilePositionY -= 0.5;
    }
}

export default SceneGameOver