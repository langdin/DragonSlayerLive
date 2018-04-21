module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _fireBackground: objects.FireBackground;
    private _plane: objects.Plane;

    private _dragons: objects.Dragon[];
    private _dragonsNumber: number;

    private _boss: objects.Boss1;
    private _bossHealth: number;
    private _bossCurrentHealth: number;

    private _bulletManager: managers.Bullet;

    //private _engineSound: createjs.AbstractSoundInstance;
    private _planeShotSound: createjs.AbstractSoundInstance;

    private _scoreBoard: managers.ScoreBoard;

    private _bossKilled: boolean;
    private _dragonsKilled: number;
    private _dragonsKillGoal: number;

    private _fadeIn: boolean;

    private _bossHealthBar: createjs.Shape;
    private _bossHealthBorder: createjs.Shape;

    private _weapon: objects.Coin;
    private _health: objects.Health;

    private _explosions: objects.smallExplosion[];
    private _expCount: number;

    private _BGMusic: createjs.AbstractSoundInstance;
    //private _cautionSound: createjs.AbstractSoundInstance;

    private _healthUp: objects.Label;
    private _weaponUp: objects.Label;

    // Public Properties

    //TODO add health
    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }


    // Public Methods

    // ---------- START ------------

    // Initialize Game Variables and objects
    public Start(): void {
      console.log('play start');
      // setup background sound
      this._BGMusic = createjs.Sound.play("BGMusic");
      this._BGMusic.loop = -1;
      this._BGMusic.volume = 0.3;

      this._weapon = new objects.Coin();
      this._health = new objects.Health();

      //bullets managers
      this._bulletManager = new managers.Bullet();
      managers.Game.bulletManger = this._bulletManager;

      //number of hits to kill boss
      this._bossHealth = 50;
      this._bossCurrentHealth = 50;
      // progress bar for boss health
      this._bossHealthBar = new createjs.Shape().set({ x: 20, y: 300, scaleY: 1 });
      this._bossHealthBar.graphics.beginFill("red").drawRect(0, 0, 30, -200);

      this._bossHealthBorder = new createjs.Shape().set({ x: 17, y: 303 });
      this._bossHealthBorder.graphics.beginFill("white").drawRect(0, 0, 36, -206);

      this._bossHealthBorder.alpha = 0;
      this._bossHealthBar.alpha = 0;

      // scene background
      this._fireBackground = new objects.FireBackground(this.assetManager);

      //player plane
      this._plane = new objects.Plane();
      managers.Game.plane = this._plane;

      //health up label
      this._healthUp = new objects.Label("health up", "10px", "rockwell", "#FFFF00", this._plane.x, this._plane.y - 45 , false);
      this._healthUp.alpha = 0;

      //weapon up label
      this._weaponUp = new objects.Label("weapon up", "10px", "rockwell", "#FFFF00", this._plane.x, this._plane.y - 45 , false);
      this._weaponUp.alpha = 0;

      //number of small dragons and their position
      this._dragonsNumber = 5;
      this, this._dragons = new Array<objects.Dragon>();
      let grid = 0;
      for (let i = 0; i < this._dragonsNumber; i++) {
        this._dragons[i] = new objects.Dragon(grid, Math.random() * 250);
        grid += 160;
      }

      //boss
      this._boss = new objects.Boss1("boss1");

      //scoreboard
      this._scoreBoard = new managers.ScoreBoard();
      managers.Game.scoreBoardManager = this._scoreBoard;

      this._explosions = new Array<objects.smallExplosion>();
      this._expCount = 0;

      this._bossKilled = false;
      this._dragonsKilled = 0;
      this._dragonsKillGoal = 20;
      this.alpha = 0;
      this._fadeIn = false;
      this.Main();
    }

    // ---------- END START ------------


    // ---------- UPDATE ------------

    public Update(): void {
      if (this._dragonsKilled < this._dragonsKillGoal) {
        this._fireBackground.Update();
      }
      if (this.alpha < 1 && !this._fadeIn) {
        this.alpha += 0.025;
        return;
      }
      this._fadeIn = true;

      this._plane.Update();

      this._healthUp.x = this._plane.x;
      this._healthUp.y = this._plane.y - 45;

      this._weaponUp.x = this._plane.x;
      this._weaponUp.y = this._plane.y - 45;

      this._weapon.Update();
      if (managers.Collision.Check(this._plane, this._weapon)) {
        let gemSound = createjs.Sound.play("gemSound");
        this._weaponUp.alpha = 1;
        this._weapon.Reset();
      }
      if(this._weaponUp.alpha > 0) {
        this._weaponUp.alpha -= 0.005;
      }

      this._health.Update();
      if (managers.Collision.Check(this._plane, this._health)) {
        let healthSound = createjs.Sound.play("gemSound");
        if(this._scoreBoard.Lives <= 5) {
          this._healthUp.alpha = 1;
        }
        this._health.Reset();
      }
      if(this._healthUp.alpha > 0) {
        this._healthUp.alpha -= 0.005;
      }

      // check collision between plane and dragon
      this._dragons.forEach(dragon => {
        dragon.Update();
        if (managers.Collision.Check(dragon, this._plane)) {
          dragon.RemoveFromScreen();
        }

        if (this._dragonsKilled >= this._dragonsKillGoal) {
          dragon.StopSpawn();
        }
      });

      //make boss come down and atack
      if (this._dragonsKilled >= this._dragonsKillGoal) {
        console.log('boss time');
        //this._cautionSound = createjs.Sound.play("caution");
        //this._cautionSound.loop = -1;
        //this._cautionSound.volume = 0.2;
        let ticker: number = createjs.Ticker.getTicks();
        if(this._boss.y >= 139) {
          this._bossHealthBorder.alpha = 1;
          this._bossHealthBar.alpha = 1;
        }
        
        this._boss.Update();
        
        if (ticker % 70 == 0 && this._boss.y >= 140 && !this._bossKilled) {
          this._boss.FireAtack();
        }
      }

      this._bulletManager.Update();

      //TODO check collision when boss comes down
      //check collision player bullets with boss
      this._bulletManager.Bullets.forEach(bullet => {
        if (this._boss.x == 400 && this._boss.y >= 140 && managers.Collision.Check(bullet, this._boss)) {
          this._bossCurrentHealth--;
          if (this._bossCurrentHealth >= 0) {
            this._bossHealthBar.set({ scaleY: this._bossCurrentHealth / this._bossHealth });
          }
          if (this._bossCurrentHealth <= 0) {
            //this._boss.RemoveFromScreen();
            //this.removeChild(this._boss);
            this._bossKilled = true;
          }
          bullet.Reset();
        }
      });

      //check collision player bullets with small dragons
      for (let i = 0; i < this._bulletManager.Bullets.length; i++) {
        for (let j = 0; j < this._dragons.length; j++) {
          if (managers.Collision.Check(this._bulletManager.Bullets[i], this._dragons[j])) {
            //if havent upgrated weapon yet
            if (!managers.Game.upgrade && this._dragonsKilled == 9) {
              this._weapon.x = this._dragons[j].x;
              this._weapon.y = this._dragons[j].y;
            }
            if (this._dragonsKilled == 17) {
              //TODO health up
              this._health.x = this._dragons[j].x;
              this._health.y = this._dragons[j].y;
            }
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

      //check collision boss bullets with player
      this._bulletManager.BossBullets.forEach(bullet => {
        if (managers.Collision.Check(bullet, this._plane)) {
          bullet.Reset();
        }
      });

      //make dragons atack
      let ticker: number = createjs.Ticker.getTicks();
      if (!this._bossKilled) {
        if (ticker % 100 == 0) {
          this._dragons.forEach(dragon => {
            dragon.Fire();
          })
        }
      }

      this._scoreBoard.HighScore = this._scoreBoard.Score;
      //fade scene after boss killed
      if ((this._scoreBoard.Lives <= 0 || this._bossKilled) && this.alpha > 0) {
        let ticker: number = createjs.Ticker.getTicks();
        if (this._bossKilled) {
          if (ticker % 7 == 0 && this._expCount < 20) {
            this._explosions[this._expCount] = new objects.smallExplosion();
            this._explosions[this._expCount].x = this._boss.x - this._boss.width / 3 + Math.random() * 2 / 3 * this._boss.width;
            this._explosions[this._expCount].y = this._boss.y - this._boss.height / 3 + Math.random() * 2 / 3 * this._boss.height;
            managers.Game.currentSceneObject.addChild(this._explosions[this._expCount]);
            createjs.Sound.play("explosion");
            this._expCount++;
          }
        } else if (this._scoreBoard.Lives <= 0) {
          if (ticker % 7 == 0 && this._expCount < 20) {
            this._explosions[this._expCount] = new objects.smallExplosion();
            this._explosions[this._expCount].x = this._plane.x - this._plane.width / 3 + Math.random() * 2 / 3 * this._plane.width;
            this._explosions[this._expCount].y = this._plane.y - this._plane.height / 3 + Math.random() * 2 / 3 * this._plane.height;
            managers.Game.currentSceneObject.addChild(this._explosions[this._expCount]);
            createjs.Sound.play("explosion");
            this._expCount++;
          }
        }
        this.alpha -= 0.004;
      }

      //objects.Game.currentScene = config.Scene.OVER;
      if (this._scoreBoard.Lives <= 0 && this.alpha <= 0) {
        this._BGMusic.stop();
        managers.Game.currentScene = config.Scene.OVER;
      }

      //if boss killed and scene faded go to next scene
      if (this._bossKilled && this.alpha <= 0) {
        this._BGMusic.stop();
        managers.Game.currentScene = config.Scene.PLAY2;
      }
    }

    // ---------- END UPDATE ------------


    // ---------- MAIN ------------

    // This is where the fun happens
    public Main(): void {
      // add fireBackground to the scene
      this.addChild(this._fireBackground);

      //add boss health progress bar
      this.addChild(this._bossHealthBorder);
      this.addChild(this._bossHealthBar);

      //add gem
      this.addChild(this._weapon);
      this.addChild(this._health);

      // add dragons to this scene
      this._dragons.forEach(dragon => {
        this.addChild(dragon);
      })

      // add plane to this scene
      this.addChild(this._plane);

      //add boss to the scene
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

      //add bullets for dragons
      this._bulletManager.BossBullets.forEach(bullet => {
        this.addChild(bullet);
      });

      this.addChild(this._healthUp);
      this.addChild(this._weaponUp);

      // this.on("click", this._Shoot);
      this.on("click", function () {
        if (this._scoreBoard.Lives > 0) {
          if (managers.Game.upgrade) {
            this._plane.BulletCombo();
          } else {
            this._plane.BulletFire();
          }
        }
      });
    }

    // ---------- END MAIN ------------
  }
}
