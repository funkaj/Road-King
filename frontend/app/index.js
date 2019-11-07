import Phaser from "phaser";
import Koji from 'koji-tools';
import SceneMainMenu from "./SceneMainMenu.js";
import SceneMain from "./SceneMain.js";
import SceneGameOver from "./SceneGameOver.js";
import Entities from "./Entities.js";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-scaffold",
  background: SceneMain.background,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneGameOver,
  ],
  // scene: {
  //   preload: preload,
  //   create: create
  // },
  pixelArt: true,
  roundPixels: true
};

        window.addEventListener('resize', () => document.location.reload());
        window.addEventListener("orientationchange", (e) => document.location.reload(e));


const game = new Phaser.Game(config);
