module objects {
  export class Dragon extends objects.GameObject {
    // Private Instance Variables
    private _posX: number;
    private _posY: number;
    private _stopSpawn: boolean;
    private _currentBullet: number;

    // Public Properties


    // Constructors
    constructor(posX: number, posY: number) {
      super("dragon");
      this._posX = posX;
      this._posY = posY;
      this._stopSpawn = false;
      this.Start();
    }

    // Private Methods

    // Public Methods

    // Initialization
    public Reset(): void {
      if (!this._stopSpawn) {
        this.x = (Math.random() * (160 - this.width)) + this.halfWidth + this._posX;
        this.y = -this.height;
        //this.y = -(this.height + this._posY) - 20;
        //console.log("spawn")
      }
    }

    public RemoveFromScreen(): void {
      this.x = 1000;
      this.y = 1000;
    }

    public CheckBounds(): void {
      // check the bottom border
      if (this.y >= 600 + this.height) {
        this.Reset();
      }

    }

    public StopSpawn() {
      this._stopSpawn = true;
      //console.log('change spawn')
    }

    public Move(): void {
      //if(objects.Game.scoreBoardManager.Score < 2000) {
      this.y += this._dy;
      //} 
    }

    public Start(): void {
      this._dy = 2;
      this._currentBullet = this._posX/160;
      this.Reset();
    }

    // Updates the Object every frame
    public Update(): void {
      this.Move();
      this.CheckBounds();
    }

    public Fire() {
      managers.Game.bulletManger.DragonBullets[this._currentBullet].x = this.x - 5;
      managers.Game.bulletManger.DragonBullets[this._currentBullet].y = this.y + this.halfHeight + 10;
      this._currentBullet += 5
      if(this._currentBullet > 19) {
        this._currentBullet = this._posX/160;
      }
    }
  }
}
