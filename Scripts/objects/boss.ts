module objects {
  export class Boss1 extends objects.GameObject {
    // Private Instance Variables
    private _currentBullet: number;
    private _direction: number; 
    private _directionIncrement: number;

    // Public Properties


    // Constructors
    constructor(assetManager: createjs.LoadQueue, name: string) {
      super(assetManager, name);
      this.Start();
    }

    // Private Methods
    private _Fire(direction:number) {
      managers.Game.bulletManger.BossBullets[this._currentBullet].SetDirectoin(direction);
      managers.Game.bulletManger.BossBullets[this._currentBullet].x = this.x + 70;
      managers.Game.bulletManger.BossBullets[this._currentBullet].y = this.y - 30;
      this._currentBullet++;
      if(this._currentBullet > 59) {
        this._currentBullet = 0;
      }
    }

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
      this._dy = 3;
      this.x = -2000
      this.y = -this.height - 20;
      this._currentBullet = 0;
      this._direction = 0;
      this._directionIncrement = 2;
    }

    // Updates the Object every frame
    public Update(): void {
      if (this.y < 120) {
        this.Move();
      }
      this.CheckBounds();
    }

    public RemoveFromScreen(): void {
      this.x = 3000;
      this.y = 3000;
    }

    public FireTriple(): void {
      this._Fire(this._direction - 2);
      this._Fire(this._direction);
      this._Fire(this._direction + 2);
      this._direction += this._directionIncrement;
      if(this._direction == 2) {
        this._directionIncrement = -2;
      } else if(this._direction == -4) {
        this._directionIncrement = 2;
      }
    }
  }
}
