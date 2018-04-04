module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _fireBackground: objects.FireBackground;
    private _plane: objects.Plane;

    private _dragons: objects.Dragon[];
    private _dragonsNumber: number;

    private _boss: objects.Boss1;
    private _bossHealth: number;

    private _planeBulletManager: managers.PlaneBullet;

    private _engineSound: createjs.AbstractSoundInstance;
    private _planeShotSound: createjs.AbstractSoundInstance;

    private _scoreBoard: managers.ScoreBoard;

    private _bossKilled: boolean;
    private _dragonsKilled: number;

    // Public Properties


    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      // setup background sound
      this._engineSound = createjs.Sound.play("engine");
      this._engineSound.loop = -1;
      this._engineSound.volume = 0.3;

      this._planeBulletManager = new managers.PlaneBullet(this.assetManager);
      managers.Game.planeBulletManger = this._planeBulletManager;

      this._bossHealth = 10;

      this._fireBackground = new objects.FireBackground(this.assetManager);

      this._plane = new objects.Plane(this.assetManager);
      managers.Game.plane = this._plane;

      this._dragonsNumber = 5;
      this, this._dragons = new Array<objects.Dragon>();
      for (let i = 0; i < this._dragonsNumber; i++) {
        this._dragons[i] = new objects.Dragon(this.assetManager, Math.random() * 250);
      }

      this._boss = new objects.Boss1(this.assetManager, "boss1");


      this._scoreBoard = new managers.ScoreBoard();
      managers.Game.scoreBoardManager = this._scoreBoard;

      this._bossKilled = false;
      this._dragonsKilled = 0;
      this.Main();
    }

    public Update(): void {
      if (this._dragonsKilled < 20) {
        this._fireBackground.Update();
      }
      this._plane.Update();

      // check collision between plane and dragon
      this._dragons.forEach(dragon => {
        dragon.Update();
        if (managers.Collision.Check(dragon, this._plane)) {
          dragon.x = 1200;
        }

        if (this._dragonsKilled >= 20) {
          dragon.StopSpawn();
        }

        if (dragon.y > 850 && this._dragonsKilled >= 20) {
          console.log('boss time');
          this._boss.Update();

        }
      });

      this._planeBulletManager.Update();

      //check collision player bullets with boss
      this._planeBulletManager.Bullets.forEach(bullet => {
        if (managers.Collision.Check(bullet, this._boss)) {
          this._bossHealth--;
          if (this._bossHealth == 0) {
            this._boss.x = 3000;
            this.removeChild(this._boss);
            this._bossKilled = true;
          }
          bullet.x = -1000;
        }
      });

      //check collision player bullets with small dragons
      for (let i = 0; i < this._planeBulletManager.Bullets.length; i++) {
        for (let j = 0; j < this._dragons.length; j++) {
          if (managers.Collision.Check(this._planeBulletManager.Bullets[i], this._dragons[j])) {
            //move dragon and bullet out of canvas
            this._planeBulletManager.Bullets[i].x = -1000;
            this._dragons[j].x = 1000;
            this._dragonsKilled++;
          }
        }
      }


      //objects.Game.currentScene = config.Scene.OVER;
      if (this._scoreBoard.Lives <= 0) {
        this._engineSound.stop();
        managers.Game.currentScene = config.Scene.OVER;
      }

      if (this._bossKilled == true) {
        this._engineSound.stop();
        managers.Game.currentScene = config.Scene.PLAY2;
      }
    }

    // This is where the fun happens
    public Main(): void {
      // add fireBackground to the scene
      this.addChild(this._fireBackground);

      // add dragons to this scene
      this._dragons.forEach(dragon => {
        this.addChild(dragon);
      })

      // add plane to this scene
      this.addChild(this._plane);

      this.addChild(this._boss);

      // add the Lives Label
      this.addChild(this._scoreBoard.LivesLabel);

      // add the Score Label
      this.addChild(this._scoreBoard.ScoreLabel);

      //add bullets 
      this._planeBulletManager.Bullets.forEach(bullet => {
        this.addChild(bullet);
      });


      // this.on("click", this._Shoot);
      this.on("click", this._plane.BulletFire);
    }
  }
}
