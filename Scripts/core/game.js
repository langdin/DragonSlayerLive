/// <reference path="_references.ts"/>
// IIFE - Immediately Invoked Function Expression
(function () {
    // Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    var clickMeButton;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyBoardManager;
    assetManifest = [
        { id: "fireBackground", src: "./Assets/images/fireBackground.jpg" },
        { id: "startBackground", src: "./Assets/images/startBackground.png" },
        { id: "playNowButton", src: "./Assets/images/playNowButton.png" },
        { id: "restartButton", src: "./Assets/images/restartButton.png" },
        { id: "dragon", src: "./Assets/images/dragon.png" },
        { id: "titleImg", src: "./Assets/images/titleImg.png" },
        { id: "planeBullet", src: "./Assets/images/planeBullet.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "backButton", src: "./Assets/images/backButton.png" },
        { id: "plane", src: "./Assets/images/player.png" },
        { id: "island", src: "./Assets/images/island.png" },
        { id: "engine", src: "./Assets/audio/engine.ogg" },
        { id: "thunder", src: "./Assets/audio/thunder.ogg" },
        { id: "yay", src: "./Assets/audio/yay.ogg" },
        { id: "planeShot", src: "./Assets/audio/planeShot.mp3" },
        { id: "gameOverSound", src: "./Assets/audio/gameOverSound.mp3" }
    ];
    // preloads assets
    function Init() {
        console.log("Initialization Started...");
        assetManager = new createjs.LoadQueue(); // creates the assetManager object
        assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
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
    function Update() {
        // if the scene that is playing returns another current scene
        // then call Main again and switch the scene
        if (currentState != objects.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update(); // redraws the stage
    }
    function Main() {
        stage.removeAllChildren();
        switch (objects.Game.currentScene) {
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
//# sourceMappingURL=game.js.map