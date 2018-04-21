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
      [1, 1, 450, 396, 0, 0, 0],
    [1, 399, 510, 298, 0, 0, 0],
    [1, 699, 347, 108, 0, 0, 0],
    [1, 809, 347, 108, 0, 0, 0],
    [350, 699, 347, 108, 0, 0, 0],
    [350, 809, 347, 108, 0, 0, 0],
    [453, 1, 503, 301, 0, 0, 0],
    [453, 304, 70, 65, 0, 0, 0],
    [513, 371, 512, 295, 0, 0, 0],
    [513, 668, 31, 29, 0, 0, 0],
    [546, 668, 31, 29, 0, 0, 0],
    [579, 668, 31, 29, 0, 0, 0],
    [612, 668, 31, 29, 0, 0, 0],
    [645, 668, 31, 29, 0, 0, 0],
    [678, 668, 32, 28, 0, 0, 0],
    [525, 304, 70, 58, 0, 0, 0],
    [597, 304, 60, 49, 0, 0, 0],
    [659, 304, 37, 37, 0, 0, 0],
    [698, 304, 35, 34, 0, 0, 0],
    [698, 340, 29, 29, 0, 0, 0],
    [729, 340, 15, 29, 0, 0, 0],
    [712, 668, 434, 248, 0, 0, 0],
    [958, 1, 510, 295, 0, 0, 0],
    [1027, 298, 476, 301, 0, 0, 0],
    [1470, 1, 394, 259, 0, 0, 0],
    [1148, 601, 421, 268, 0, 0, 0],
    [1505, 262, 385, 259, 0, 0, 0],
    [1571, 523, 312, 272, 0, -22, -34]
  ],
  
  "animations": {
    "boss2": { 
      "frames": [0, 8, 22, 23, 1, 6],
      "speed": 0.12
    },
    "nextButton": { "frames": [2] },
    "playNowButton": { "frames": [3] },
    "restartButton": { "frames": [4] },
    "startButton": { "frames": [5] },
    "player": { 
        "frames": [7, 15],
        "speed": 0.1
    },
    "smallexplosion": { 
        "frames": [9,10,11,12,13,19] ,
        "speed": 0.5
    },
    "dragonBullet": { "frames": [14] },
    "dragon": { "frames": [16] },
    "bossBullet": { "frames": [17] },
    "gem": { "frames": [18] },
    "planeBullet": { "frames": [20] },
    "boss1": { 
      "frames": [27, 26, 24, 21, 25],
      "speed": 0.12
     }
  }

  };

  assetManifest = [
    { id: "gem", src: "./Assets/images/gem.png" }, 
    { id: "heart", src: "./Assets/images/life.png" }, 
    { id: "fireBackground", src: "./Assets/images/fireBackground.jpg" }, 
    { id: "lava", src: "./Assets/images/lava.jpg" },
    { id: "fire3", src: "./Assets/images/fire3.jpg" },
    { id: "startBackground", src: "./Assets/images/startBackground.png" },
    { id: "gameOver", src: "./Assets/images/gameOver.jpg" },
    { id: "winBG", src: "./Assets/images/winBG.jpg" },
    { id: "introduction", src: "./Assets/images/introduction.jpg" },
    { id: "tutorial", src: "./Assets/images/tutorial.jpg" },
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
      case config.Scene.INTRO:
        currentScene = new scenes.Intro(assetManager);
        break;
      case config.Scene.INSTRUCTION:
        currentScene = new scenes.Instructions(assetManager);
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
