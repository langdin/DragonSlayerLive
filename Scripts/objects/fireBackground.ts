module objects {
    export class FireBackground extends createjs.Bitmap {
      // Private Instance Variables
      private _dy: number;
  
      // Public Properties
  
      // Constructors
      constructor(assetManager: createjs.LoadQueue) {
        if(managers.Game.currentScene == config.Scene.PLAY) {
          super(assetManager.getResult("fireBackground"));
        } else if(managers.Game.currentScene == config.Scene.PLAY2) {
          super(assetManager.getResult("lava"));
        } else if(managers.Game.currentScene == config.Scene.PLAY3) {
          super(assetManager.getResult("lava"));
        }
        
        this.Start();
      }
  
      // Private Methods
      private _Reset():void {
        this.y = -680;
      }
  
      private _CheckBounds():void {
        if(this.y >= 0) {
          this._Reset();
        }
      }
  
      private _Move():void {
        //if (objects.Game.scoreBoardManager.Score < 2000) {
          this.y += this._dy;
        //}
      }
  
      // Public Methods
  
      // Initialization
      public Start():void {
        this._dy = 5; // move 5 pixels down every frame
        this._Reset();
      }
  
      // Updates the Object every frame
      public Update():void {
        this._Move();
        this._CheckBounds();
      }
  
    }
  }
  