module scenes {
  export class OverScene extends objects.Scene {
    // Private Instance Variables
    private _overBackground: createjs.Bitmap;
    private _gameOverImg: objects.GameOverImg;
    private _restartButton: objects.Button;
    private _gameOverSound: createjs.AbstractSoundInstance;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods

    private _backButtonClick():void {
      objects.Game.currentScene = config.Scene.PLAY;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      //this._gameOverSound = createjs.Sound.play("gameOverSound");
      //this._gameOverSound.volume = .3;
      this._overBackground = new createjs.Bitmap(this.assetManager.getResult("startBackground"));
      this._gameOverImg = new objects.GameOverImg(this.assetManager);
      this._restartButton = new objects.Button(this.assetManager, "restartButton", 400, 340);

      this.Main();
    }

    public Update(): void {
    }

    // This is where the fun happens
    public Main(): void {
      // add the welcome label to the scene
      this.addChild(this._overBackground);

      // add game over img
      this.addChild(this._gameOverImg);

      // add the baclButton to the scene
      this.addChild(this._restartButton);

      this._restartButton.on("click", this._backButtonClick);
    }
  }
}
