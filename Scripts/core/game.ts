/// <reference path="_references.ts"/>

// IIFE - Immediately Invoked Function Expression
(function () {

  // Game Variables
  let canvas = document.getElementById("canvas");
  let stage: createjs.Stage;
  let helloLabel: objects.Label;
  let clickMeButton: objects.Button;
  let assetManager: createjs.LoadQueue;
  let assetManifest: any[];
  let currentScene: objects.Scene;
  let currentState: number;
  let keyBoardManager: managers.Keyboard;
  let textureAtlasData: any;
  let textureAtlas: createjs.SpriteSheet;

  textureAtlasData = {

    "images": [
      "./Assets/sprites/textureAtlas.png"
    ],

    "frames": [
      [1, 1, 512, 295, 0, 0, 0],
      [515, 1, 385, 259, 0, 0, 0],
      [515, 262, 347, 108, 0, 0, 0],
      [1, 298, 510, 298, 0, 0, 0],
      [513, 372, 394, 259, 0, 0, 0],
      [1, 598, 510, 295, 0, 0, 0],
      [864, 262, 37, 37, 0, 0, 0],
      [864, 301, 32, 28, 0, 0, 0],
      [864, 331, 31, 29, 0, 0, 0],
      [513, 633, 347, 108, 0, 0, 0],
      [862, 633, 31, 29, 0, 0, 0],
      [862, 664, 31, 29, 0, 0, 0],
      [862, 695, 31, 29, 0, 0, 0],
      [862, 726, 31, 29, 0, 0, 0],
      [513, 743, 312, 272, 0, 0, 0],
      [827, 743, 29, 29, 0, 0, 0],
      [827, 774, 70, 65, 0, 0, 0],
      [827, 841, 70, 58, 0, 0, 0],
      [827, 901, 60, 49, 0, 0, 0],
      [889, 901, 15, 29, 0, 0, 0],
      [1, 895, 476, 301, 0, 0, 0],
      [479, 1017, 421, 268, 0, 0, 0],
      [1, 1198, 450, 396, 0, 0, 0],
      [453, 1287, 434, 248, 0, 0, 0]
  ],
  
  "animations": {
      "boss2": { 
          "frames": [22, 0, 5, 20, 3],
          "speed": 0.12
      },
      "boss1": { 
          "frames": [14, 1, 4, 23, 21],
          "speed": 0.12
      },
      "playNowButton": { "frames": [2] },
      "bossBullet": { "frames": [6] },
      "dragonBullet": { "frames": [7] },
      "smallexplosion": { 
          "frames": [8, 10, 11, 12, 15, 13],
          "speed": 0.5 
      },
      "restartButton": { "frames": [9] },
      "player": { 
          "frames": [16, 17],
          "speed": 0.1
       },
      "dragon": { "frames": [18] },
      "planeBullet": { "frames": [19] }
  }

  };

  assetManifest = [
    { id: "gem", src: "./Assets/images/gem.png" }, 
    { id: "fireBackground", src: "./Assets/images/fireBackground.jpg" }, 
    { id: "lava", src: "./Assets/images/lava.jpg" },
    { id: "startBackground", src: "./Assets/images/startBackground.png" },
    { id: "gameOver", src: "./Assets/images/gameOver.jpg" },
    { id: "titleImg", src: "./Assets/images/titleImg.png" },
    { id: "gameOverImg", src: "./Assets/images/gameOverImg.png" },
    { id: "BGMusic", src: "./Assets/audio/BGMusic.mp3" },
    { id: "planeShot", src: "./Assets/audio/Shot.mp3" },
    { id: "gemSound", src: "./Assets/audio/gem.mp3" },
    { id: "gameover", src: "./Assets/audio/GameoverOne.wav" },
    { id: "intro", src: "./Assets/audio/Introduction.mp3" },
    { id: "win", src: "./Assets/audio/Win.mp3" },
    { id: "caution", src: "./Assets/audio/caution.mp3" },
    { id: "explosion", src: "./Assets/audio/explosion.mp3" }
  ];

  // preloads assets
  function Init(): void {
    console.log("Initialization Started...");
    textureAtlas = new createjs.SpriteSheet(textureAtlasData);
    assetManager = new createjs.LoadQueue(); // creates the assetManager object
    assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
    assetManager.loadManifest(assetManifest);
    assetManager.on("complete", Start, this);
  }

  function Start(): void {
    console.log("Starting Application...")

    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // turn this on for buttons
    createjs.Ticker.framerate = 60; // 60 FPS
    createjs.Ticker.on("tick", Update);

    managers.Game.stage = stage; // create a reference to the stage
    managers.Game.currentScene = config.Scene.START;
    currentState = config.Scene.START;

    keyBoardManager = new managers.Keyboard();
    managers.Game.keyboardManager = keyBoardManager;
    managers.Game.assetManager = assetManager;
    managers.Game.textureAtlas = textureAtlas;
    Main();
  }

  function Update(): void {
    // if the scene that is playing returns another current scene
    // then call Main again and switch the scene
    if (currentState != managers.Game.currentScene) {
      Main();
    }

    currentScene.Update();

    stage.update(); // redraws the stage
  }

  function Main(): void {
    stage.removeAllChildren();

    switch (managers.Game.currentScene) {
      case config.Scene.START:
        currentScene = new scenes.StartScene(assetManager);
        break;
      case config.Scene.PLAY:
        currentScene = new scenes.PlayScene(assetManager);
        break;
      case config.Scene.PLAY2:
        currentScene = new scenes.PlayScene2(assetManager);
        break;
      case config.Scene.PLAY3:
        currentScene = new scenes.PlayScene3(assetManager);
        break;
      case config.Scene.OVER:
        currentScene = new scenes.OverScene(assetManager);
        break;
    }
    currentState = managers.Game.currentScene;
    managers.Game.currentSceneObject = currentScene;
    stage.addChild(currentScene);
  }

  window.onload = Init;

})();
