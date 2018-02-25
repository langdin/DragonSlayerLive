module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    private _fireBackground: objects.FireBackground;
    private _plane: objects.Plane;
    private _island: objects.Island;

    //private _dragons: objects.Dragon[];
    //private _dragonNum: number;
    //private _DragonPositionX: number;

    private _planeBullets: objects.PlaneBullets[];
    private _planeBulletsNum: number;
    private _planeBulletsCount: number;

    private _engineSound: createjs.AbstractSoundInstance;

    private _scoreBoard: managers.ScoreBoard;

    // Public Properties


    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods

    private _Shoot(): void {
      //console.log("piu")
      if(this._planeBulletsCount == 50) {
        this._planeBulletsCount = 0;
      }
      this._planeBullets[this._planeBulletsCount].SetXY(this._plane.x, this._plane.y - 30);
      this._planeBulletsCount++;
      
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      // setup background sound
      this._engineSound = createjs.Sound.play("engine");
      this._engineSound.loop = -1;
      this._engineSound.volume = 0.3;

      //this._dragonNum = 2;

      this._planeBulletsNum = 50;
      this._planeBulletsCount = 0;

      this._fireBackground = new objects.FireBackground(this.assetManager);

      this._plane = new objects.Plane(this.assetManager);
      this._island = new objects.Island(this.assetManager);

      //create dragons array
      //this._dragons = new Array<objects.Dragon>();

      this._planeBullets = new Array<objects.PlaneBullets>();

      
      for (let i = 0; i < this._planeBulletsNum; i++) {
        this._planeBullets[i] = new objects.PlaneBullets(this.assetManager);
      }

      //add dragons to array
      //this._DragonPositionX = 250;
      //for (let count = 0; count < this._dragonNum; count++) {
      //  this._dragons[count] = new objects.Dragon(this.assetManager, this._DragonPositionX);
      //  this._DragonPositionX += 300;
      //}

      this._scoreBoard = new managers.ScoreBoard();
      objects.Game.scoreBoardManager = this._scoreBoard;


      this.Main();
    }

    public Update(): void {
      this._fireBackground.Update();
      this._plane.Update();
      this._island.Update();

      // check collision between plane and island
      managers.Collision.Check(this._plane, this._island);

      //update each dragon
      //this._dragons.forEach(dragon => {
        //dragon.Update();
        // check collision between plane and the current dragon
        //managers.Collision.Check(this._plane, dragon);
      //});

      //update each plane bullet
      let j = 0
      this._planeBullets.forEach(bullet => {
        bullet.Update();
        // check collision between island and the current bullet
        if(managers.Collision.Check(this._island, bullet)){
          this._island.x = 900;
          bullet.x = 900;
        }
      });


      if (this._scoreBoard.Lives <= 0) {
        this._engineSound.stop();
        objects.Game.currentScene = config.Scene.OVER;
      }

      if(objects.Game.keyboardManager.shoot) {
        this._Shoot();
      }
    }

    // This is where the fun happens
    public Main(): void {
      // add fireBackground to the scene

      this.addChild(this._fireBackground);

      // add island to this scene
      this.addChild(this._island);

      // add plane to this scene
      this.addChild(this._plane);

      // add dragons to the scene
      //this._dragons.forEach(dragon => {
      //  this.addChild(dragon);
      //});

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
