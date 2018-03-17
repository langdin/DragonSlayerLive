module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _fireBackground: objects.FireBackground;
    private _plane: objects.Plane;

    private _dragons: objects.Dragon[];
    private _dragonsNumber: number;

    private _boss1: objects.Boss1;
    private _bossHealth: number;

    private _planeBullets: objects.PlaneBullets[];
    private _planeBulletsNum: number;
    private _planeBulletsCount: number;

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
    //when player shoots
    private _Shoot(): void {
      if(this._planeBulletsCount == 50) {
        this._planeBulletsCount = 0;
      }
      this._planeBullets[this._planeBulletsCount].SetXY(this._plane.x, this._plane.y - 30);
      this._planeBulletsCount++;
      this._planeShotSound = createjs.Sound.play("planeShot");
      this._planeShotSound.volume = 0.1;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      // setup background sound
      this._engineSound = createjs.Sound.play("engine");
      this._engineSound.loop = -1;
      this._engineSound.volume = 0.3;

      this._planeBulletsNum = 50;
      this._planeBulletsCount = 0;

      this._bossHealth = 10;

      this._fireBackground = new objects.FireBackground(this.assetManager);

      this._plane = new objects.Plane(this.assetManager);

      this._dragonsNumber = 5;
      this,this._dragons = new Array<objects.Dragon>();
      for (let i = 0; i < this._dragonsNumber; i++) {
        this._dragons[i] = new objects.Dragon(this.assetManager, Math.random()* 250);
      }

      this._boss1 = new objects.Boss1(this.assetManager, "boss1");

      this._planeBullets = new Array<objects.PlaneBullets>();

      
      for (let i = 0; i < this._planeBulletsNum; i++) {
        this._planeBullets[i] = new objects.PlaneBullets(this.assetManager);
      }

      this._scoreBoard = new managers.ScoreBoard();
      objects.Game.scoreBoardManager = this._scoreBoard;

      this._bossKilled = false;
      this._dragonsKilled = 0;
      this.Main();
    }

    public Update(): void {
      if(this._dragonsKilled < 5) {
        this._fireBackground.Update();
      }
      this._plane.Update();

      // check collision between plane and dragon
      this._dragons.forEach(dragon => {
        dragon.Update();
        if(managers.Collision.Check(dragon, this._plane)) {
          dragon.x = 1200;
        }

        if(this._dragonsKilled >= 5) {
          dragon.StopSpawn();
        }

        if(dragon.y > 850 && this._dragonsKilled >= 5) {
          //console.log('boss time')
          this._boss1.Update();

        }
      });

      //update each planebullet and check collision with boss
      this._planeBullets.forEach(bullet => {
           bullet.Update(); 

           if (managers.Collision.Check(bullet, this._boss1)) {
                this._bossHealth--;
                if (this._bossHealth == 0) {
                  this._boss1.x = 1800;
                  this.removeChild(this._boss1);
                  this._bossKilled = true;
                }
                bullet.x = 900;
            }
      });

      //check collission bullets with each small dragon
      for(let i = 0; i < this._planeBullets.length; i++) {
        for(let j = 0; j < this._dragons.length; j++) {
          if(managers.Collision.Check(this._planeBullets[i], this._dragons[j])) {
            //move dragon and bullet out of canvas
              this._planeBullets[i].x = -900;
              this._dragons[j].x = 900;
              this._dragonsKilled++;
          }
        }
      }
      

      //objects.Game.currentScene = config.Scene.OVER;
      if (this._scoreBoard.Lives <= 0) {
        this._engineSound.stop();
        objects.Game.currentScene = config.Scene.OVER;
      }

      if(this._bossKilled == true) {
        this._engineSound.stop();
        objects.Game.currentScene = config.Scene.PLAY2;
      }
      //press  space to shoot
      //if(objects.Game.keyboardManager.shoot) {
      //  this._Shoot();
      //}
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

      this.addChild(this._boss1);

      // add the Lives Label
      this.addChild(this._scoreBoard.LivesLabel);

      // add the Score Label
      this.addChild(this._scoreBoard.ScoreLabel);

      this._planeBullets.forEach(bullet => {
        this.addChild(bullet);
      });


      this.on("click", this._Shoot);

    }
  }
}
