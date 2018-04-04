module objects {
  export class Boss1 extends objects.GameObject {
    // Private Instance Variables


    // Public Properties


    // Constructors
    constructor(assetManager: createjs.LoadQueue, name: string) {
      super(assetManager, name);
      this.Start();
    }

    // Private Methods

    // Public Methods

    // Initialization
    public Reset(): void {
      this.x = 400;
    }

    public CheckBounds(): void {
      // check the bottom border
      if (this.y >= - this.height) {
        this.Reset();
      }

    }

    public Move(): void {
      this.y += this._dy;
    }

    public Start(): void {
      this._dy = 5;
      this.x = -2000
      this.y = -this.height - 20;
    }

    // Updates the Object every frame
    public Update(): void {
      if (this.y < 120) {
        this.Move();
      }
      this.CheckBounds();
    }

  }
}
