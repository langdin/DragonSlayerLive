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
    var PlayScene = /** @class */ (function (_super) {
        __extends(PlayScene, _super);
        // Public Properties
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        //when player shoots
        PlayScene.prototype._Shoot = function () {
            if (this._planeBulletsCount == 50) {
                this._planeBulletsCount = 0;
            }
            this._planeBullets[this._planeBulletsCount].SetXY(this._plane.x, this._plane.y - 30);
            this._planeBulletsCount++;
            this._planeShotSound = createjs.Sound.play("planeShot");
            this._planeShotSound.volume = 0.1;
        };
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
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
            this._planeBullets = new Array();
            for (var i = 0; i < this._planeBulletsNum; i++) {
                this._planeBullets[i] = new objects.PlaneBullets(this.assetManager);
            }
            this._scoreBoard = new managers.ScoreBoard();
            objects.Game.scoreBoardManager = this._scoreBoard;
            this.Main();
        };
        PlayScene.prototype.Update = function () {
            var _this = this;
            this._fireBackground.Update();
            this._plane.Update();
            //this._island.Update();
            this._dragon.Update();
            // check collision between plane and dragon
            if (managers.Collision.Check(this._plane, this._dragon)) {
                this._dragon.x = 900;
            }
            //update each plane bullet
            var j = 0;
            this._planeBullets.forEach(function (bullet) {
                bullet.Update();
                // check collision between island and the current bullet
                if (managers.Collision.Check(_this._dragon, bullet)) {
                    _this._dragon.x = 900;
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
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            // add fireBackground to the scene
            var _this = this;
            this.addChild(this._fireBackground);
            // add dragon to this scene
            this.addChild(this._dragon);
            // add plane to this scene
            this.addChild(this._plane);
            // add the Lives Label
            this.addChild(this._scoreBoard.LivesLabel);
            // add the Score Label
            this.addChild(this._scoreBoard.ScoreLabel);
            this._planeBullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            this.on("click", this._Shoot);
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map