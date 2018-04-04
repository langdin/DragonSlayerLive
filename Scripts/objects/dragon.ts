module objects {
  export class Dragon extends objects.GameObject {
    // Private Instance Variables
    private _posY: number;
    private _stopSpawn: boolean;

    // Public Properties


    // Constructors
    constructor(assetManager: createjs.LoadQueue, posY) {
      super(assetManager, "dragon");
      this._posY = posY;
      this._stopSpawn = false;
      this.Start();
    }

    // Private Methods

    // Public Methods

    // Initialization
    public Reset():void {
      if(!this._stopSpawn) {
        this.x = (Math.random() * (800 - this.width)) + this.halfWidth;
        this.y = -(this.height+this._posY) - 20;
        //console.log("spawn")
      }
    }

    public CheckBounds():void {
      // check the bottom border
      if(this.y >= 600 + this.height) {
        this.Reset();
      }

    }

    public StopSpawn() {
      this._stopSpawn = true;
      //console.log('change spawn')
    }

    public Move():void {
      //if(objects.Game.scoreBoardManager.Score < 2000) {
        this.y += this._dy;
      //} 
    }

    public Start():void {
      this._dy = 4;
    
      this.Reset();
    }

    // Updates the Object every frame
    public Update():void {
      this.Move();

      this.CheckBounds();
    }

  }
}
