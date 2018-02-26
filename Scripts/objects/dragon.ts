module objects {
  export class Dragon extends objects.GameObject {
    // Private Instance Variables


    // Public Properties


    // Constructors
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager, "dragon");
      this.Start();
    }

    // Private Methods

    // Public Methods

    // Initialization
    public Reset():void {
      this.x = (Math.random() * (800 - this.width)) + this.halfWidth;
      this.y = -this.height;
    }

    public CheckBounds():void {
      // check the bottom border
      if(this.y >= 600 + this.height) {
        this.Reset();
      }

    }

    public Move():void {
      this.y += this._dy;
    }

    public Start():void {
      this._dy = 5;
      this.Reset();
    }

    // Updates the Object every frame
    public Update():void {
      this.Move();
      this.CheckBounds();
    }

  }
}
