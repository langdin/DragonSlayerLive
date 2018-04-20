module scenes {
  export class OverScene extends objects.Scene {
    // Private Instance Variables
    private _overBackground: createjs.Bitmap;
    private _gameOverImg: objects.GameOverImg;
    private _restartButton: objects.Button;
    private _gameOverSound: createjs.AbstractSoundInstance;
    private _scoreBoard: managers.ScoreBoard;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods

    private _backButtonClick():void {
      managers.Game.currentScene = config.Scene.PLAY;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      //this._gameOverSound = createjs.Sound.play("gameOverSound");
      //this._gameOverSound.volume = .3;
      this._overBackground = new createjs.Bitmap(this.assetManager.getResult("gameOver"));
      this._gameOverImg = new objects.GameOverImg(this.assetManager);
      this._restartButton = new objects.Button("restartButton", 400, 400);
      this._scoreBoard = managers.Game.scoreBoardManager;
      this.alpha = 0;
      this.Main();
    }

    public Update(): void {
      if(this.alpha < 1) {
        this.alpha += 0.025;
      }
    }

    // This is where the fun happens
    public Main(): void {
      // add the welcome label to the scene
      this.addChild(this._overBackground);

      // add game over img
      this.addChild(this._gameOverImg);

      // add the baclButton to the scene
      this.addChild(this._restartButton);

      this.addChild(this._scoreBoard.HighScoreLabel);

      this._restartButton.on("click", this._backButtonClick);
    }
  }
}
