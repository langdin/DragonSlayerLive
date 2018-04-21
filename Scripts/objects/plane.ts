module objects {
  export class Plane extends objects.GameObject {
    // Private Instance Variables

    // Public Properties


    // Constructors
    constructor() {
      super("player");
      
      this.Start();
    }

    // Private Methods

    // Public Methods

    // Initialization
    public Reset(): void {

    }

    public CheckBounds(): void {
      // check the right boundary
      if (this.x >= 800 - this.halfWidth) {
        this.x = 800 - this.halfWidth;
      }

      // check the left boundary
      if (this.x <= this.halfWidth) {
        this.x = this.halfWidth;
      }

      // check the right boundary
      if (this.y >= 600 - this.halfHeight) {
        this.y = 600 - this.halfHeight;
      }

      // check the left boundary
      if (this.y <= this.halfHeight) {
        this.y = this.halfHeight;
      }
    }

    public Move(): void {
      // mouse control
      this.x = managers.Game.stage.mouseX;
      // keyboard controls
      //if(objects.Game.keyboardManager.moveLeft) {
      //  this.x -= 6;
      //}

      //if(objects.Game.keyboardManager.moveRight) {
      //  this.x += 6;
      //}

      //if(objects.Game.keyboardManager.moveForward) {
      //  this.y -= 6;
      //}

      //if(objects.Game.keyboardManager.moveBackward) {
      //  this.y += 6;
      //}
    }

    public Start(): void {
      this.x = 400;
      this.y = 530;
    }

    // Updates the Object every frame
    public Update(): void {
      this.Move();
      this.CheckBounds();
    }

    public BulletFire(double: boolean = false): void {
      let currentBullet = managers.Game.bulletManger.CurrentBullet;
      let dx = 0;
      if(double && (currentBullet+1) % 2 == 0) {
        dx = 10;
      } else if(double && (currentBullet+1) % 2 != 0) {
        dx = -10;
      }

      managers.Game.bulletManger.Bullets[currentBullet].x = managers.Game.plane.x + dx;
      managers.Game.bulletManger.Bullets[currentBullet].y = managers.Game.plane.y - 30;
      managers.Game.bulletManger.CurrentBullet++;
      if(managers.Game.bulletManger.CurrentBullet > 49) {
        managers.Game.bulletManger.CurrentBullet = 0;
      }
      let planeShotSound = createjs.Sound.play("planeShot");
      planeShotSound.volume = 0.2;
    }

    public BulletCombo(): void {
      this.BulletFire(true);
      this.BulletFire(true);
    }
  }
}
