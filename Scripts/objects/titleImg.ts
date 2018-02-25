module objects {
    export class titleImg extends createjs.Bitmap {
      // Private Instance Variables
  
      // Public Properties
  
      // Constructors
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager.getResult("titleImg"));
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
          this.y = 200;
      }
  
      // Updates the Object every frame
      public Update():void {
      }
  
    }
  }
  