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
        PlayScene.prototype._Shoot = function () {
            //console.log("piu")
            if (this._planeBulletsCount == 50) {
                this._planeBulletsCount = 0;
            }
            this._planeBullets[this._planeBulletsCount].SetXY(this._plane.x, this._plane.y - 30);
            this._planeBulletsCount++;
        };
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
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
            this._planeBullets = new Array();
            for (var i = 0; i < this._planeBulletsNum; i++) {
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
        };
        PlayScene.prototype.Update = function () {
            var _this = this;
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
            var j = 0;
            this._planeBullets.forEach(function (bullet) {
                bullet.Update();
                // check collision between island and the current bullet
                if (managers.Collision.Check(_this._island, bullet)) {
                    _this._island.x = 900;
                    bullet.x = 900;
                }
            });
            if (this._scoreBoard.Lives <= 0) {
                this._engineSound.stop();
                objects.Game.currentScene = config.Scene.OVER;
            }
            if (objects.Game.keyboardManager.shoot) {
                this._Shoot();
            }
        };
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            // add fireBackground to the scene
            var _this = this;
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