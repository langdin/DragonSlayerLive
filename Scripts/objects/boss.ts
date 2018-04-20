module objects {
  export class Boss1 extends objects.GameObject {
    // Private Instance Variables
    private _currentBullet: number;
    //bullet direction
    private _direction: number;
    private _directionIncrement: number;
    // fire in stright line or not
    private _simpleShot: boolean;

    // Public Properties


    // Constructors
    constructor(name: string) {
      super(name);
      this.Start();
    }

    // Private Methods
    private _Fire(direction: number) {
      managers.Game.bulletManger.BossBullets[this._currentBullet].SetDirectoin(direction);
      managers.Game.bulletManger.BossBullets[this._currentBullet].simpleShot = this._simpleShot;
      if (this.name == 'boss1') {
        managers.Game.bulletManger.BossBullets[this._currentBullet].x = this.x + 120;
        managers.Game.bulletManger.BossBullets[this._currentBullet].y = this.y - 50;
      } else if (this.name == 'boss2') {
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
      if (this.name == 'boss1') {
        if (this.y >= 140) {
          this.y = 140
        }
      } else if (this.name == 'boss2') {
        if (this.y >= 180) {
          this.y = 180
        }
      }

    }
    

    public Move(): void {
      this.y += this._dy;
    }

    public Start(): void {
      this._dy = 3;
      this.x = 400;
      if (this.name == 'boss1') {
        this.y = -500;
      } else if (this.name == 'boss2') {
        this.y = -600;
      }
      this._currentBullet = 0;
      this._direction = 0;
      this._directionIncrement = 2;
      this._simpleShot = true;
    }

    // Updates the Object every frame
    public Update(): void {
      this.Move();
      this.CheckBounds();
    }

    public RemoveFromScreen(): void {
      this.x = 3000;
      this.y = 3000;
    }

    //TODO fore boss3 make shooting multiple patterns
    public FireAtack(): void {
      if(managers.Game.currentScene == config.Scene.PLAY) {
        this._simpleShot = true;
        this._Fire(this._direction);
        this._Fire(this._direction + 2);
        this._Fire(this._direction + -2);
      } else if(managers.Game.currentScene == config.Scene.PLAY2) {
        this._simpleShot = false;
        this._Fire(this._direction - 2);
        this._Fire(this._direction - 4);
        this._Fire(this._direction);
      } else if(managers.Game.currentScene == config.Scene.PLAY3) {
        if (this.name == 'boss1') {
          this._simpleShot = true;
          this._Fire(this._direction);
          this._Fire(this._direction + 2);
          this._Fire(this._direction - 2);
          this._Fire(this._direction + 4);
          this._Fire(this._direction - 4);
        } else if (this.name == 'boss2') {
          this._simpleShot = false;
          this._Fire(this._direction - 2);
          this._Fire(this._direction - 4);
          this._Fire(this._direction - 6);
          this._Fire(this._direction);
        }
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
