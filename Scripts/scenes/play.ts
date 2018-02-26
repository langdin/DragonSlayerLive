module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _fireBackground: objects.FireBackground;
    private _plane: objects.Plane;
    //private _island: objects.Island;
    private _dragon: objects.Dragon;

    private _planeBullets: objects.PlaneBullets[];
    private _planeBulletsNum: number;
    private _planeBulletsCount: number;

    private _engineSound: createjs.AbstractSoundInstance;
    private _planeShotSound: createjs.AbstractSoundInstance;

    private _scoreBoard: managers.ScoreBoard;

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

      this._fireBackground = new objects.FireBackground(this.assetManager);

      this._plane = new objects.Plane(this.assetManager);
      //this._island = new objects.Island(this.assetManager);
      this._dragon = new objects.Dragon(this.assetManager);

      this._planeBullets = new Array<objects.PlaneBullets>();

      
      for (let i = 0; i < this._planeBulletsNum; i++) {
        this._planeBullets[i] = new objects.PlaneBullets(this.assetManager);
      }

      this._scoreBoard = new managers.ScoreBoard();
      objects.Game.scoreBoardManager = this._scoreBoard;


      this.Main();
    }

    public Update(): void {
      this._fireBackground.Update();
      this._plane.Update();
      //this._island.Update();
      this._dragon.Update();

      // check collision between plane and dragon
      if(managers.Collision.Check(this._plane, this._dragon)) {
        this._dragon.x = 900;
      }

      //update each plane bullet
      let j = 0
      this._planeBullets.forEach(bullet => {
        bullet.Update();
        // check collision between island and the current bullet
        if(managers.Collision.Check(this._dragon, bullet)){
          this._dragon.x = 900;
          bullet.x = 900;
        }
      });


      if (this._scoreBoard.Lives <= 0) {
        this._engineSound.stop();
        objects.Game.currentScene = config.Scene.OVER;
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

      // add dragon to this scene
      this.addChild(this._dragon);

      // add plane to this scene
      this.addChild(this._plane);

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
