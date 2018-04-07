module objects {
  export class Boss1 extends objects.GameObject {
    // Private Instance Variables
    private _currentBullet: number;
    private _direction: number;
    private _directionIncrement: number;
    private _name: String;

    // Public Properties


    // Constructors
    constructor(name: string) {
      super(name);
      this._name = name;
      this.Start();
    }

    // Private Methods
    private _Fire(direction: number) {
      managers.Game.bulletManger.BossBullets[this._currentBullet].SetDirectoin(direction);
      if (this._name == 'boss1') {
        managers.Game.bulletManger.BossBullets[this._currentBullet].x = this.x + 120;
        managers.Game.bulletManger.BossBullets[this._currentBullet].y = this.y - 50;
      } else if (this._name == 'boss2') {
        managers.Game.bulletManger.BossBullets[this._currentBullet].x = this.x + 230;
        managers.Game.bulletManger.BossBullets[this._currentBullet].y = this.y - 50;
      }

      this._currentBullet++;
      if (this._currentBullet > 29) {
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
      this.x = -2000;
      this.y = -this.height - 20;
      this._currentBullet = 0;
      this._direction = 0;
      this._directionIncrement = 2;
    }

    // Updates the Object every frame
    public Update(): void {
      if (this._name == 'boss1') {
        if (this.y < 140) {
          this.Move();
        }
      } else if (this._name == 'boss2') {
        if (this.y < 180) {
          this.Move();
        }
      }
      this.CheckBounds();
    }

    public RemoveFromScreen(): void {
      this.x = 3000;
      this.y = 3000;
    }

    public FireTriple(): void {
      if (this._name == 'boss1') {
        this._Fire(this._direction - 2);
        this._Fire(this._direction);
        this._Fire(this._direction + 2);
      } else if (this._name == 'boss2') {
        this._Fire(this._direction - 4);
        this._Fire(this._direction - 2);
        this._Fire(this._direction);
        this._Fire(this._direction + 2);
      }
      this._direction += this._directionIncrement;
      if (this._direction == 2) {
        this._directionIncrement = -2;
      } else if (this._direction == -4) {
        this._directionIncrement = 2;
      }
    }
  }
}
