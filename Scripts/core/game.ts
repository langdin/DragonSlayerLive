/// <reference path="_references.ts"/>

// IIFE - Immediately Invoked Function Expression
(function(){

  // Game Variables
  let canvas = document.getElementById("canvas");
  let stage:createjs.Stage;
  let helloLabel: objects.Label;
  let clickMeButton: objects.Button;
  let assetManager: createjs.LoadQueue;
  let assetManifest: any[];
  let currentScene: objects.Scene;
  let currentState: number;
  let keyBoardManager: managers.Keyboard;

  assetManifest = [
    {id: "fireBackground", src:"./Assets/images/lava.jpg"},
    {id: "startBackground", src:"./Assets/images/startBackground.png"},
    {id: "playNowButton", src:"./Assets/images/playNowButton.png"},
    {id: "restartButton", src:"./Assets/images/restartButton.png"},
    {id: "dragon", src:"./Assets/images/dragon.png"},
    {id: "boss1", src:"./Assets/images/boss1.png"},
    {id: "boss2", src:"./Assets/images/boss2.png"},
    {id: "titleImg", src:"./Assets/images/titleImg.png"},
    {id: "gameOverImg", src:"./Assets/images/gameOverImg.png"},
    {id: "planeBullet", src:"./Assets/images/planeBullet.png"},
    {id: "fireBullet", src:"./Assets/images/fireBullet.png"},
    {id: "plane", src:"./Assets/images/player.png"},
    {id: "engine", src:"./Assets/audio/engine.ogg"},
    {id: "thunder", src:"./Assets/audio/thunder.ogg"},
    {id: "yay", src:"./Assets/audio/yay.ogg"},
    {id: "planeShot", src:"./Assets/audio/planeShot.mp3"},
    {id: "gameOverSound", src:"./Assets/audio/gameOverSound.mp3"}
  ];

  // preloads assets
  function Init():void {
    console.log("Initialization Started...");
    assetManager = new createjs.LoadQueue(); // creates the assetManager object
    assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
    assetManager.loadManifest(assetManifest);
    assetManager.on("complete", Start, this);
  }

  function Start():void {
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
    Main();
  }

  function Update():void {
    // if the scene that is playing returns another current scene
    // then call Main again and switch the scene
    if(currentState != managers.Game.currentScene) {
      Main();
    }

    currentScene.Update();

    stage.update(); // redraws the stage
  }

  function Main():void {
    stage.removeAllChildren();

    switch(managers.Game.currentScene) {
      case config.Scene.START:
      currentScene = new scenes.StartScene(assetManager);
      break;
      case config.Scene.PLAY:
      currentScene = new scenes.PlayScene(assetManager);
      break;
      case config.Scene.PLAY2:
      currentScene = new scenes.PlayScene2(assetManager);
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
