# Space Shooter Template (Phaser 3.0)

Welcome,
to the old-fashion space pixel shooting game with a long title and great ambitions.
The template could be expended in different ways, such as adding new sounds, new enemies. 
Code at the moment is designed to be easily expanded. Please use the according to classes to do so.
A template gives the old feeling of the pixel game with hard but unique controls and roughness enemies.
Parts easily can be customized and the game could be turned into even craziest ideas.
With different components and easy-to-understand class system, it is really easy to even insert new functionalities.
Phaser 3.0 makes a wonderful and solid library, so you don't have to care about physics and lots of other things.
Feel free to contact creator, me - "FrostyDog" on Discord for any help.
Good luck and shoot them all!

Space Shooter Space Shooter Template (Phaser 3.0) project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/)
that includes hot-reloading for development and production-ready builds.

Loading images via JavaScript module `import` is also supported.

## Writing Code

You can edit any files in the [frontend/app](#~/frontend/app/index.js!visual) folder.

## Customizing Template

3 Visual Customization Controls (VCCs) have been added to the template. These can be quickly modified to your application.   
 - [Game Setting](#~/.koji/customization/settings.json!visual) - Change the game settings. Make the game harder or easier.
 - [Images](#~/.koji/customization/images.json!visual) - Change the icon.
 - [Metadata] (#~/.koji/customization/metadata.json!visual) - Change the metadata of the game.
 - [Sounds](#~/.koji/customization/sounds.json!visual) - Change sounds in the game.


## Controls

For mobile devices and devices with a smaller screen ( less than 700 px width) feel free to use costume controller.
Just touch any area on the left from player to love left and any right area to move right accordingly.

For bigger screen ( more than 700 px) feel free to use old and known "WASD" keys controller to move in a different direction.
Also, use the SPACE key to shoot.


## Size of the assets.
There is no strict preferred size of any image or visual asset.
Because the game is pixel based - any assets could be used in various sizes, even in the smallest ones.
Feel free to use any kind of sizes. 
Keep in mind, that lesser values would result in better productivity.

 ## Structure
### ~/frontend
 Everything that is needed for development is in this folder.
### ~/frontend/app 
The main directory that contains the engine of the game, main classes, and logic.

The main game consists of 3 main Scenes:
 - index.js - Initializing document. Connects all 3 scenes and configuration of Phaser 3.0.
 - SceneMain.js - gameplay is written there
 - SceneGameOver.js - Game over the screen with the possibility of a restart
 - SceneMainMenu.js - Main menu screen with the play button and ability to mute/unmute sounds.
 - Entities.js - main class for any actor in the game. Consists of main features for Player and Enemies.
 - PlyerLaser.js - class for the behavior of the PLayer's laser particle.
 - EnemyLaser.js - class for the behavior of the Enemy's laser particle.


## Any Questions?

Join our [Discord Server](https://discord.gg/eQuMJF6) for Koji for any software questions or bugs.   
You are free to message to [the template creator](https://gokoji.com/profile/frostydog)

