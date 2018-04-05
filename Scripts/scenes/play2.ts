module scenes {
  export class PlayScene2 extends objects.Scene {
    // Private Instance Variables
    private _fireBackground: objects.FireBackground;
    private _plane: objects.Plane;

    private _dragons: objects.Dragon[];
    private _dragonsNumber: number;

    private _boss: objects.Boss1;
    private _bossHealth: number;

    private _bulletManager: managers.Bullet;

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

    // Private Mathods


    // Public Methods

     // ---------- START ------------

    // Initialize Game Variables and objects
    public Start(): void {
      // setup background sound
      this._engineSound = createjs.Sound.play("engine");
      this._engineSound.loop = -1;
      this._engineSound.volume = 0.3;

      this._bulletManager = new managers.Bullet(this.assetManager);
      managers.Game.bulletManger = this._bulletManager;

      this._bossHealth = 20;

      this._fireBackground = new objects.FireBackground(this.assetManager);

      this._plane = new objects.Plane(this.assetManager);
      managers.Game.plane = this._plane;

      this._dragonsNumber = 5;
      this, this._dragons = new Array<objects.Dragon>();
      let grid = 0;
      for (let i = 0; i < this._dragonsNumber; i++) {
        this._dragons[i] = new objects.Dragon(this.assetManager, grid , Math.random() * 250);
        grid += 160;
      }

      this._boss = new objects.Boss1(this.assetManager, "boss2");

      this._scoreBoard = managers.Game.scoreBoardManager;

      this._bossKilled = false;
      this._dragonsKilled = 0;
      this.Main();
    }

    // ---------- END START ------------


     // ---------- UPDATE ------------

    public Update(): void {
      if (this._dragonsKilled < 30) {
        this._fireBackground.Update();
      }
      this._plane.Update();

      // check collision between plane and dragon
      this._dragons.forEach(dragon => {
        dragon.Update();
        if (managers.Collision.Check(dragon, this._plane)) {
          dragon.RemoveFromScreen();
        }

        if (this._dragonsKilled >= 30) {
          dragon.StopSpawn();
        }
      });

      //make boss come down and atack
      if (this._dragonsKilled >= 30) {
        console.log('boss time');
        let ticker: number = createjs.Ticker.getTicks();
        if (ticker > 500) {
          this._boss.Update();
        }
        if(ticker % 40 == 0 && this._boss.y >= 120) {
          this._boss.FireTriple();
        }
      }

      this._bulletManager.Update();

      //check collision player bullets with boss
      this._bulletManager.Bullets.forEach(bullet => {
        if (managers.Collision.Check(bullet, this._boss)) {
          this._bossHealth--;
          if (this._bossHealth == 0) {
            this._boss.RemoveFromScreen();
            this.removeChild(this._boss);
            this._bossKilled = true;
          }
          bullet.Reset();
        }
      });

      //check collision player bullets with small dragons
      for (let i = 0; i < this._bulletManager.Bullets.length; i++) {
        for (let j = 0; j < this._dragons.length; j++) {
          if (managers.Collision.Check(this._bulletManager.Bullets[i], this._dragons[j])) {
            //move dragon and bullet out of canvas
            this._bulletManager.Bullets[i].Reset();
            this._dragons[j].RemoveFromScreen();
            this._dragonsKilled++;
          }
        }
      }

      //check collision dragon bullets with player
      this._bulletManager.DragonBullets.forEach(bullet => {
        if (managers.Collision.Check(bullet, this._plane)) {
          bullet.Reset();
        }
      });


      //objects.Game.currentScene = config.Scene.OVER;
      if (this._scoreBoard.Lives <= 0) {
        this._engineSound.stop();
        managers.Game.currentScene = config.Scene.OVER;
      }

      if (this._bossKilled == true) {
        this._engineSound.stop();
        managers.Game.currentScene = config.Scene.OVER;
      }

      this._scoreBoard.HighScore = this._scoreBoard.Score;

      let ticker:number = createjs.Ticker.getTicks();
      if (ticker % 100 == 0) {
        this._dragons.forEach(dragon => {
          dragon.Fire();
        })
      }
    }


    // ---------- END UPDATE ------------


    // ---------- MAIN ------------


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
      this._bulletManager.Bullets.forEach(bullet => {
        this.addChild(bullet);
      });

      //add bullets for dragons
      this._bulletManager.DragonBullets.forEach(bullet => {
        this.addChild(bullet);
      });

      // this.on("click", this._Shoot);
      this.on("click", this._plane.BulletFire);
    }

    // ---------- END MAIN ------------
  }
}
