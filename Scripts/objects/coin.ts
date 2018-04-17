module objects {
  export class Coin extends createjs.Bitmap {
    // private instance variables
    private _dy;
    private _dx;
    // public properties
    public width: number;
    public height: number;
    public halfWidth: number;
    public halfHeight: number;
    public isColliding: boolean;
    // constructors
    constructor() {
      super(managers.Game.assetManager.getResult("gem"));
      this.name = "gem";
      this._initialize();
      this.Start();
    }

    // private methods
    private _initialize(): void {
      this.width = this.getBounds().width;
      this.height = this.getBounds().height;
      this.halfWidth = this.width * 0.5;
      this.halfHeight = this.height * 0.5;
      this.regX = this.halfWidth;
      this.regY = this.halfHeight;
      this.isColliding = false;
    }
    // public methods
    public Start(): void {
      this.x = -1000;
      this.y = -1000;
    }

    public Update(): void {
      this.Move();
      this.CheckBounds();
    }

    public CheckBounds(): void {

    }

    public Move(): void {
      this.y += 2;
    }

    public Reset(): void {
      this.x = -1000;
      this.y = -1000;
    }
  }
}
