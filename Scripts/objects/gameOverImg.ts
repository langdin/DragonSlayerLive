module objects {
    export class GameOverImg extends createjs.Bitmap {
      // Private Instance Variables
  
      // Public Properties
  
      // Constructors
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager.getResult("gameOverImg"));
        this.Start();
      }
  
      // Private Methods
      private _reset():void {
      }
  
      private _checkBounds():void {
      }
  
      private _move():void {
      }
  
      // Public Methods
  
      // Initialization
      public Start():void {
          this.x = 170;
          this.y = 200;
      }
  
      // Updates the Object every frame
      public Update():void {
      }
  
    }
  }
  