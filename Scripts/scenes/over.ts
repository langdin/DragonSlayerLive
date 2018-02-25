module scenes {
  export class OverScene extends objects.Scene {
    // Private Instance Variables
    private _overLabel: objects.Label;
    private _backButton: objects.Button;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods

    private _backButtonClick():void {
      objects.Game.currentScene = config.Scene.PLAY;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      this._overLabel = new objects.Label("Game Over", "40px", "Consolas", "#000000", 400, 240, true);
      this._backButton = new objects.Button(this.assetManager, "backButton", 400, 340);
      this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {
      // add the welcome label to the scene
      this.addChild(this._overLabel);

      // add the baclButton to the scene
      this.addChild(this._backButton);

      this._backButton.on("click", this._backButtonClick);
    }
  }
}
