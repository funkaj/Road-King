import Koji from "koji-tools"


// sound global variables variables
window.soundEnable = true;
window.music;

class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMainMenu" });
    }
    preload() {
        this.load.image("sprBtnPlay", Koji.config.images.btnplay);
        this.load.image("sprBtnPlayHover", Koji.config.images.btnplayHover);
        this.load.image("sprBg0", Koji.config.images.background);
        this.load.image("Soundon", Koji.config.images.soundon);
        this.load.image("Soundoff", Koji.config.images.soundoff);
        this.load.audio("bgm", Koji.config.sounds.backgroundMusic);
    }
    create() {
        //Creating background 

        this.background = this.add.tileSprite(
            this.game.config.width / 2,
            this.game.config.height / 2,
            this.game.config.width,
            this.game.config.height, 'sprBg0');


        // music toggle button logic and creation
        window.music = this.sound.add("bgm");
        window.music.play({
            mute: false,
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        })

        this.soundbtn = this.add.sprite(
            20,
            20,
            "Soundon"
        )
        this.soundbtn.setInteractive();

        this.soundbtn.on("pointerup", function () {
            if (window.soundEnable == true) {
                this.soundbtn.setTexture("Soundoff");
                window.music.setMute(true)
                window.soundEnable = false;
            } else {
                this.soundbtn.setTexture("Soundon");
                window.music.setMute(false)
                window.soundEnable = true;
            }
        }, this);

        // Creation and logic for play Button

        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnPlay"
        );

        this.btnPlay.setScale(1.2)

        this.btnPlay.setInteractive();

        this.btnPlay.on("pointerover", function () {
            this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
            //this.sfx.btnOver.play(); // play the button over sound
        }, this);

        this.btnPlay.on("pointerout", function () {
            this.setTexture("sprBtnPlay");
        });

        this.btnPlay.on("pointerup", function () {
            //  this.btnPlay.setTexture("sprBtnPlay");
            this.scene.start("SceneMain");
        }, this);

        //creating a title

        this.title = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.4, Koji.config.settings.name, {
            fontFamily: Koji.config.settings.textfont,
            fontSize: this.game.config.width * 0.05 + 9,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        if (this.game.config.width < 700) {

            this.instruction = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.7, Koji.config.settings.instructionsMobile, {
                fontFamily: Koji.config.settings.textfont,
                fontSize: this.game.config.width * 0.03 + 1,
                fontStyle: 'bold',
                color: '#ffffff',
                align: 'center'
            });
            this.instruction2 = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.7 + 20, Koji.config.settings.instructionsMobile2, {
                fontFamily: Koji.config.settings.textfont,
                fontSize: this.game.config.width * 0.03 + 1,
                fontStyle: 'bold',
                color: '#ffffff',
                align: 'center'
            });
            this.instruction.setOrigin(0.5);
            this.instruction2.setOrigin(0.5);
        }

        if (this.game.config.width > 700) {

            this.instruction = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.7, Koji.config.settings.instructionsDesktop, {
                fontFamily: 'monospace',
                fontSize: this.game.config.width * 0.03 + 1,
                fontStyle: 'bold',
                color: '#ffffff',
                align: 'center'
            });
            this.instruction.setOrigin(0.5);
        }
    }
    update() {
        // scrolling background
        this.background.tilePositionY -= 0.5;
    }
}

export default SceneMainMenu