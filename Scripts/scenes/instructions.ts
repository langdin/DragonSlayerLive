module scenes {
    export class Instructions extends objects.Scene {
      // Private Instance Variables
      private _startBackground: createjs.Bitmap;
      private _titleImg: objects.TitleImg;
      private _startButton: objects.Button;
      private _load: createjs.Shape;
  
      // Public Properties
  
      // Constructor
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager);
  
        this.Start();
      }
  
      // Private Mathods
      private _StartButtonClick(): void {
        managers.Game.fade = true;
        //this._load.graphics.beginFill("red").drawRect(0, 0, 30, 200);
      }
  
  
      // Public Methods
  
      // Initialize Game Variables and objects
      public Start(): void {
        this._load = new createjs.Shape();
        this._load.x = 20;
        this._load.y = 400;
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
        let ticker: number = createjs.Ticker.getTicks();
        let i = ticker*5;
        //this._load.graphics.beginFill("#C33").setStrokeStyle(3).beginStroke("rgba(232,230,231, 1)")
        //.drawRect(0, 0, 30, -200+(i*5));
      }
  
      // This is where the fun happens
      public Main(): void {
        // add background of this page
        this.addChild(this._startBackground);
  
        // add title image
        this.addChild(this._titleImg);
  
        // add the startButton to the scene
        this.addChild(this._startButton);
  
        this.addChild(this._load);
  
        this._startButton.on("click", this._StartButtonClick);
      }
    }
  }
  