module scenes {
  export class StartScene extends objects.Scene {
    // Private Instance Variables
    private _startBackground: createjs.Bitmap;
    private _titleImg: objects.TitleImg;
    private _startButton: objects.Button;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods
    private _StartButtonClick(): void {
      managers.Game.fade = true;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._titleImg = new objects.TitleImg(this.assetManager);
      this._startButton = new objects.Button("playNowButton", 400, 400);
      this._startBackground = new createjs.Bitmap(this.assetManager.getResult("startBackground"));
      managers.Game.fade = false;
      this.Main();
    }

    public Update(): void {
      if (managers.Game.fade ) {
        this.alpha -= 0.025;
      }
      if(this.alpha <= 0) {
        managers.Game.currentScene = config.Scene.PLAY;
      }
    }

    // This is where the fun happens
    public Main(): void {
      // add background of this page
      this.addChild(this._startBackground);

      // add title image
      this.addChild(this._titleImg);

      // add the startButton to the scene
      this.addChild(this._startButton);

      this._startButton.on("click", this._StartButtonClick);
    }
  }
}
