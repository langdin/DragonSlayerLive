module objects {
    export class StartBackground extends createjs.Bitmap {
      // Private Instance Variables
  
      // Public Properties
  
      // Constructors
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager.getResult("startBackground"));
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
      }
  
      // Updates the Object every frame
      public Update():void {
      }
  
    }
  }
  