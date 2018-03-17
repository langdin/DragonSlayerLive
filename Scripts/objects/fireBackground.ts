module objects {
    export class FireBackground extends createjs.Bitmap {
      // Private Instance Variables
      private _dy: number;
  
      // Public Properties
  
      // Constructors
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager.getResult("fireBackground"));
        this.Start();
      }
  
      // Private Methods
      private _reset():void {
        this.y = -400;
      }
  
      private _checkBounds():void {
        if(this.y >= 0) {
          this._reset();
        }
      }
  
      private _move():void {
        if (objects.Game.scoreBoardManager.Score < 2000) {
          this.y += this._dy;
        }
      }
  
      // Public Methods
  
      // Initialization
      public Start():void {
        this._dy = 5; // move 5 pixels down every frame
        this._reset();
      }
  
      // Updates the Object every frame
      public Update():void {
        this._move();
        this._checkBounds();
      }
  
    }
  }
  