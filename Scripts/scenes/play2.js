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
    var PlayScene2 = /** @class */ (function (_super) {
        __extends(PlayScene2, _super);
        // Public Properties
        // Constructor
        function PlayScene2(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // Initialize Game Variables and objects
        PlayScene2.prototype.Start = function () {
            // setup background sound
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1;
            this._engineSound.volume = 0.3;
            this._planeBulletManager = new managers.PlaneBullet(this.assetManager);
            managers.Game.planeBulletManger = this._planeBulletManager;
            this._bossHealth = 20;
            this._fireBackground = new objects.FireBackground(this.assetManager);
            this._plane = new objects.Plane(this.assetManager);
            managers.Game.plane = this._plane;
            this._dragonsNumber = 5;
            this, this._dragons = new Array();
            for (var i = 0; i < this._dragonsNumber; i++) {
                this._dragons[i] = new objects.Dragon(this.assetManager, Math.random() * 350);
            }
            this._boss = new objects.Boss1(this.assetManager, "boss2");
            this._scoreBoard = managers.Game.scoreBoardManager;
            this._bossKilled = false;
            this._dragonsKilled = 0;
            this.Main();
        };
        PlayScene2.prototype.Update = function () {
            var _this = this;
            if (this._dragonsKilled < 30) {
                this._fireBackground.Update();
            }
            this._plane.Update();
            // check collision between plane and dragon
            this._dragons.forEach(function (dragon) {
                dragon.Update();
                if (managers.Collision.Check(dragon, _this._plane)) {
                    dragon.x = 1200;
                }
                if (_this._dragonsKilled >= 30) {
                    dragon.StopSpawn();
                }
                if (dragon.y > 850 && _this._dragonsKilled >= 30) {
                    _this._boss.Reset();
                    _this._boss.Update();
                }
            });
            this._planeBulletManager.Update();
            //check collision player bullets with boss
            this._planeBulletManager.Bullets.forEach(function (bullet) {
                if (managers.Collision.Check(bullet, _this._boss)) {
                    _this._bossHealth--;
                    if (_this._bossHealth == 0) {
                        _this._boss.x = 3000;
                        _this.removeChild(_this._boss);
                        _this._bossKilled = true;
                    }
                    bullet.x = -1000;
                }
            });
            //check collision player bullets with small dragons
            for (var i = 0; i < this._planeBulletManager.Bullets.length; i++) {
                for (var j = 0; j < this._dragons.length; j++) {
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
                managers.Game.currentScene = config.Scene.OVER;
            }
            this._scoreBoard.HighScore = this._scoreBoard.Score;
            //press  space to shoot
            //if(objects.Game.keyboardManager.shoot) {
            //  this._Shoot();
            //}
        };
        // This is where the fun happens
        PlayScene2.prototype.Main = function () {
            var _this = this;
            // add fireBackground to the scene
            this.addChild(this._fireBackground);
            // add dragons to this scene
            this._dragons.forEach(function (dragon) {
                _this.addChild(dragon);
            });
            // add plane to this scene
            this.addChild(this._plane);
            this.addChild(this._boss);
            // add the Lives Label
            this.addChild(this._scoreBoard.LivesLabel);
            // add the Score Label
            this.addChild(this._scoreBoard.ScoreLabel);
            //add bullets 
            this._planeBulletManager.Bullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            // this.on("click", this._Shoot);
            this.on("click", this._plane.BulletFire);
        };
        return PlayScene2;
    }(objects.Scene));
    scenes.PlayScene2 = PlayScene2;
})(scenes || (scenes = {}));
//# sourceMappingURL=play2.js.map