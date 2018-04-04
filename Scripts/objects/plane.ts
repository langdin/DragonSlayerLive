module objects {
  export class Plane extends objects.GameObject {
    // Private Instance Variables


    // Public Properties


    // Constructors
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager, "plane");
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
      this.x = 320;
      this.y = 530;
    }

    // Updates the Object every frame
    public Update(): void {
      this.Move();
      this.CheckBounds();
    }

    public BulletFire(): void {
      let currentBullet = managers.Game.planeBulletManger.CurrentBullet;
      managers.Game.planeBulletManger.Bullets[currentBullet].x = managers.Game.plane.x;
      managers.Game.planeBulletManger.Bullets[currentBullet].y = managers.Game.plane.y - 30;
      managers.Game.planeBulletManger.CurrentBullet++;
      if(managers.Game.planeBulletManger.CurrentBullet > 49) {
        managers.Game.planeBulletManger.CurrentBullet = 0;
      }
      let planeShotSound = createjs.Sound.play("planeShot");
      planeShotSound.volume = 0.1;
    }
  }
}
