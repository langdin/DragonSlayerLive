module objects {
    export class Boss1 extends objects.GameObject {
      // Private Instance Variables
  
  
      // Public Properties
  
  
      // Constructors
      constructor(assetManager: createjs.LoadQueue) {
        super(assetManager, "boss");
        this.Start();
      }
  
      // Private Methods
  
      // Public Methods
  
      // Initialization
      public Reset():void {
        this.x = 400;
        this.y = -this.height;
      }
  
      public CheckBounds():void {
        // check the bottom border
        if(this.y >= 600 + this.height) {
          this.Reset();
        }
  
      }
  
      public Move():void {
        if(objects.Game.scoreBoardManager.Score >= 2000) {
            this.y += this._dy;
        }
      }
  
      public Start():void {
            this._dy = 5;
            this.Reset();
      }
  
      // Updates the Object every frame
      public Update():void {
        if( this.y < 120) {
            this.Move();
        }
        this.CheckBounds();
      }
  
    }
  }
  