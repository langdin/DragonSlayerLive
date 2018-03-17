module objects {
  export class Dragon extends objects.GameObject {
    // Private Instance Variables
    private _posY: number;

    // Public Properties


    // Constructors
    constructor(assetManager: createjs.LoadQueue, posY) {
      super(assetManager, "dragon");
      this._posY = posY;
      this.Start();
    }

    // Private Methods

    // Public Methods

    // Initialization
    public Reset():void {
      this.x = (Math.random() * (800 - this.width)) + this.halfWidth;
      this.y = -(this.height+this._posY);
    }

    public CheckBounds():void {
      // check the bottom border
      if(this.y >= 600 + this.height) {
        this.Reset();
      }

    }

    public Move():void {
      if(objects.Game.scoreBoardManager.Score < 2000) {
        this.y += this._dy;
        
      } else {
        this.x = 1000;
      }
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
