var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var OverScene = /** @class */ (function (_super) {
        __extends(OverScene, _super);
        // Public Properties
        // Constructor
        function OverScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        OverScene.prototype._backButtonClick = function () {
            this._BGMusic.stop();
            managers.Game.currentScene = config.Scene.PLAY;
        };
        // Public Methods
        // Initialize Game Variables and objects
        OverScene.prototype.Start = function () {
            this._gameOverImg = new objects.GameOverImg(this.assetManager);
            if (managers.Game.scoreBoardManager.Lives == 0) {
                this._BGMusic = createjs.Sound.play("gameover");
                this._overBackground = new createjs.Bitmap(this.assetManager.getResult("gameOver"));
            }
            else {
                this._BGMusic = createjs.Sound.play("win");
                this._overBackground = new createjs.Bitmap(this.assetManager.getResult("winBG"));
            }
            this._BGMusic.volume = 0.3;
            this._restartButton = new objects.Button("restartButton", 400, 450);
            this._scoreBoard = managers.Game.scoreBoardManager;
            this.alpha = 0;
            this.Main();
        };
        OverScene.prototype.Update = function () {
            if (this.alpha < 1) {
                this.alpha += 0.025;
            }
        };
        // This is where the fun happens
        OverScene.prototype.Main = function () {
            // add the welcome label to the scene
            this.addChild(this._overBackground);
            // add game over img
            this.addChild(this._gameOverImg);
            // add the baclButton to the scene
            this.addChild(this._restartButton);
            this.addChild(this._scoreBoard.HighScoreLabel);
            this._restartButton.on("click", this._backButtonClick);
        };
        return OverScene;
    }(objects.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map