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
    {id: "fireBackground", src:"./Assets/images/fireBackground.jpg"},
    {id: "startBackground", src:"./Assets/images/startBackground.png"},
    {id: "playNowButton", src:"./Assets/images/playNowButton.png"},
    {id: "dragon", src:"./Assets/images/dragon.png"},
    {id: "titleImg", src:"./Assets/images/titleImg.png"},
    {id: "planeBullet", src:"./Assets/images/planeBullet.png"},
    {id: "startButton", src:"./Assets/images/startButton.png"},
    {id: "nextButton", src:"./Assets/images/nextButton.png"},
    {id: "backButton", src:"./Assets/images/backButton.png"},
    {id: "plane", src:"./Assets/images/player.png"},
    {id: "island", src:"./Assets/images/island.png"},
    {id: "engine", src:"./Assets/audio/engine.ogg"},
    {id: "thunder", src:"./Assets/audio/thunder.ogg"},
    {id: "yay", src:"./Assets/audio/yay.ogg"}
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

    objects.Game.stage = stage; // create a reference to the stage
    objects.Game.currentScene = config.Scene.START;
    currentState = config.Scene.START;

    keyBoardManager = new managers.Keyboard();
    objects.Game.keyboardManager = keyBoardManager;
    Main();
  }

  function Update():void {
    // if the scene that is playing returns another current scene
    // then call Main again and switch the scene
    if(currentState != objects.Game.currentScene) {
      Main();
    }

    currentScene.Update();

    stage.update(); // redraws the stage
  }

  function Main():void {
    stage.removeAllChildren();

    switch(objects.Game.currentScene) {
      case config.Scene.START:
      currentScene = new scenes.StartScene(assetManager);
      break;
      case config.Scene.PLAY:
      currentScene = new scenes.PlayScene(assetManager);
      break;
      case config.Scene.OVER:
      currentScene = new scenes.OverScene(assetManager);
      break;
    }
    currentState = objects.Game.currentScene;
    stage.addChild(currentScene);
  }

  window.onload = Init;

})();
