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
    var PlayScene3 = /** @class */ (function (_super) {
        __extends(PlayScene3, _super);
        // Public Properties
        // Constructor
        function PlayScene3(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        // Public Methods
        // ---------- START ------------
        // Initialize Game Variables and objects
        PlayScene3.prototype.Start = function () {
            // setup background sound
            this._engineSound = createjs.Sound.play("engine");
            this._engineSound.loop = -1;
            this._engineSound.volume = 0.3;
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManger = this._bulletManager;
            this._bossHealth = 30;
            this._fireBackground = new objects.FireBackground(this.assetManager);
            console.log(this._fireBackground);
            this._plane = new objects.Plane();
            managers.Game.plane = this._plane;
            this._dragonsNumber = 5;
            this, this._dragons = new Array();
            var grid = 0;
            for (var i = 0; i < this._dragonsNumber; i++) {
                this._dragons[i] = new objects.Dragon(grid, Math.random() * 250);
                grid += 160;
            }
            this._boss = new objects.Boss1("boss2");
            this._scoreBoard = managers.Game.scoreBoardManager;
            this._bossKilled = false;
            this._dragonsKilled = 0;
            this.Main();
        };
        // ---------- END START ------------
        // ---------- UPDATE ------------
        PlayScene3.prototype.Update = function () {
            var _this = this;
            if (this._dragonsKilled < 30) {
                this._fireBackground.Update();
            }
            this._plane.Update();
            // check collision between plane and dragon
            this._dragons.forEach(function (dragon) {
                dragon.Update();
                if (managers.Collision.Check(dragon, _this._plane)) {
                    dragon.RemoveFromScreen();
                }
                if (_this._dragonsKilled >= 30) {
                    dragon.StopSpawn();
                }
            });
            //make boss come down and atack
            if (this._dragonsKilled >= 30) {
                console.log('boss time');
                var ticker_1 = createjs.Ticker.getTicks();
                if (ticker_1 > 500) {
                    this._boss.Update();
                }
                if (ticker_1 % 90 == 0 && this._boss.y >= 179) {
                    this._boss.FireTriple();
                }
            }
            this._bulletManager.Update();
            //check collision player bullets with boss
            this._bulletManager.Bullets.forEach(function (bullet) {
                if (_this._boss.x == 400 && _this._boss.y >= 170 && managers.Collision.Check(bullet, _this._boss)) {
                    _this._bossHealth--;
                    if (_this._bossHealth == 0) {
                        _this._boss.RemoveFromScreen();
                        _this.removeChild(_this._boss);
                        _this._bossKilled = true;
                    }
                    bullet.Reset();
                }
            });
            //check collision player bullets with small dragons
            for (var i = 0; i < this._bulletManager.Bullets.length; i++) {
                for (var j = 0; j < this._dragons.length; j++) {
                    if (managers.Collision.Check(this._bulletManager.Bullets[i], this._dragons[j])) {
                        //move dragon and bullet out of canvas
                        this._bulletManager.Bullets[i].Reset();
                        this._dragons[j].RemoveFromScreen();
                        this._dragonsKilled++;
                    }
                }
            }
            //check collision dragon bullets with player
            this._bulletManager.DragonBullets.forEach(function (bullet) {
                if (managers.Collision.Check(bullet, _this._plane)) {
                    bullet.Reset();
                }
            });
            //check collision boss bullets with player
            this._bulletManager.BossBullets.forEach(function (bullet) {
                if (managers.Collision.Check(bullet, _this._plane)) {
                    bullet.Reset();
                }
            });
            //objects.Game.currentScene = config.Scene.OVER;
            if (this._scoreBoard.Lives <= 0 && this.alpha <= 0) {
                this._engineSound.stop();
                managers.Game.currentScene = config.Scene.OVER;
            }
            this._scoreBoard.HighScore = this._scoreBoard.Score;
            //make dragons atack
            var ticker = createjs.Ticker.getTicks();
            if (!this._bossKilled) {
                if (ticker % 100 == 0) {
                    this._dragons.forEach(function (dragon) {
                        dragon.Fire();
                    });
                }
            }
            //fade scene after boss killed
            if ((this._scoreBoard.Lives <= 0 || this._bossKilled == true) && this.alpha > 0) {
                this.alpha -= .01;
            }
            //if boss killed and scene faded go to next scene
            if ((this._scoreBoard.Lives <= 0 || this._bossKilled == true) && this.alpha <= 0) {
                this._engineSound.stop();
                managers.Game.currentScene = config.Scene.OVER;
            }
        };
        // ---------- END UPDATE ------------
        // ---------- MAIN ------------
        // This is where the fun happens
        PlayScene3.prototype.Main = function () {
            var _this = this;
            // add fireBackground to the scene
            this.addChild(this._fireBackground);
            // add dragons to this scene
            this._dragons.forEach(function (dragon) {
                _this.addChild(dragon);
            });
            // add plane to this scene
            this.addChild(this._plane);
            //add boss to the scene
            this.addChild(this._boss);
            // add the Lives Label
            this.addChild(this._scoreBoard.LivesLabel);
            // add the Score Label
            this.addChild(this._scoreBoard.ScoreLabel);
            //add bullets 
            this._bulletManager.Bullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            //add bullets for dragons
            this._bulletManager.DragonBullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            //add bullets for dragons
            this._bulletManager.BossBullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            // this.on("click", this._Shoot);
            this.on("click", this._plane.BulletFire);
        };
        return PlayScene3;
    }(objects.Scene));
    scenes.PlayScene3 = PlayScene3;
})(scenes || (scenes = {}));
//# sourceMappingURL=play3.js.map