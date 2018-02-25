module objects {
  export class Dragon extends objects.GameObject {
    // Private Instance Variables


    // Public Properties


    // Constructors
    constructor(assetManager: createjs.LoadQueue, xPos: number) {
      super(assetManager, "dragon");
      this.x = xPos;
      this.Start();
    }

    // Private Methods

    // Public Methods

    // Initialization


    public Move(): void {
      if (this.y < 100) {
        this.y += 7;
      }
    }

    public Start(): void {
      this.y = -100;
    }

    // Updates the Object every frame
    public Update(): void {
      this.Move();
      this.CheckBounds();
    }

  }
}
