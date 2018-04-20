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
        //TODO add health
        // Constructor
        function PlayScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Public Methods
        // ---------- START ------------
        // Initialize Game Variables and objects
        PlayScene.prototype.Start = function () {
            console.log('play start');
            // setup background sound
            this._BGMusic = createjs.Sound.play("BGMusic");
            this._BGMusic.loop = -1;
            this._BGMusic.volume = 0.3;
            this._weapon = new objects.Coin();
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
            //number of small dragons and their position
            this._dragonsNumber = 5;
            this, this._dragons = new Array();
            var grid = 0;
            for (var i = 0; i < this._dragonsNumber; i++) {
                this._dragons[i] = new objects.Dragon(grid, Math.random() * 250);
                grid += 160;
            }
            //boss
            this._boss = new objects.Boss1("boss1");
            //scoreboard
            this._scoreBoard = new managers.ScoreBoard();
            managers.Game.scoreBoardManager = this._scoreBoard;
            this._explosions = new Array();
            this._expCount = 0;
            this._bossKilled = false;
            this._dragonsKilled = 0;
            this._dragonsKillGoal = 20;
            this.alpha = 0;
            this._fadeIn = false;
            this.Main();
        };
        // ---------- END START ------------
        // ---------- UPDATE ------------
        PlayScene.prototype.Update = function () {
            var _this = this;
            if (this._dragonsKilled < this._dragonsKillGoal) {
                this._fireBackground.Update();
            }
            if (this.alpha < 1 && !this._fadeIn) {
                this.alpha += 0.025;
                return;
            }
            this._fadeIn = true;
            this._plane.Update();
            this._weapon.Update();
            if (managers.Collision.Check(this._plane, this._weapon)) {
                this._weapon.Reset();
            }
            // check collision between plane and dragon
            this._dragons.forEach(function (dragon) {
                dragon.Update();
                if (managers.Collision.Check(dragon, _this._plane)) {
                    dragon.RemoveFromScreen();
                }
                if (_this._dragonsKilled >= _this._dragonsKillGoal) {
                    dragon.StopSpawn();
                }
            });
            //make boss come down and atack
            if (this._dragonsKilled >= this._dragonsKillGoal) {
                console.log('boss time');
                this._ticker = createjs.Ticker.getTicks();
                var ticker_1 = createjs.Ticker.getTicks();
                this._bossHealthBorder.alpha = 1;
                this._bossHealthBar.alpha = 1;
                this._boss.Update();
                if (ticker_1 % 70 == 0 && this._boss.y >= 140 && !this._bossKilled) {
                    this._boss.FireAtack();
                }
            }
            this._bulletManager.Update();
            //TODO check collision when boss comes down
            //check collision player bullets with boss
            this._bulletManager.Bullets.forEach(function (bullet) {
                if (_this._boss.x == 400 && _this._boss.y >= 140 && managers.Collision.Check(bullet, _this._boss)) {
                    _this._bossCurrentHealth--;
                    if (_this._bossCurrentHealth >= 0) {
                        _this._bossHealthBar.set({ scaleY: _this._bossCurrentHealth / _this._bossHealth });
                    }
                    if (_this._bossCurrentHealth <= 0) {
                        //this._boss.RemoveFromScreen();
                        //this.removeChild(this._boss);
                        _this._bossKilled = true;
                    }
                    bullet.Reset();
                }
            });
            //check collision player bullets with small dragons
            for (var i = 0; i < this._bulletManager.Bullets.length; i++) {
                for (var j = 0; j < this._dragons.length; j++) {
                    if (managers.Collision.Check(this._bulletManager.Bullets[i], this._dragons[j])) {
                        //if havent upgrated weapon yet
                        if (!managers.Game.upgrade && this._dragonsKilled == 15) {
                            this._weapon.x = this._dragons[j].x;
                            this._weapon.y = this._dragons[j].y;
                        }
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
            //make dragons atack
            var ticker = createjs.Ticker.getTicks();
            if (!this._bossKilled) {
                if (ticker % 100 == 0) {
                    this._dragons.forEach(function (dragon) {
                        dragon.Fire();
                    });
                }
            }
            this._scoreBoard.HighScore = this._scoreBoard.Score;
            //fade scene after boss killed
            if ((this._scoreBoard.Lives <= 0 || this._bossKilled) && this.alpha > 0) {
                if (this._bossKilled) {
                    var ticker_2 = createjs.Ticker.getTicks();
                    if (ticker_2 % 7 == 0 && this._expCount < 20) {
                        this._explosions[this._expCount] = new objects.smallExplosion();
                        this._explosions[this._expCount].x = this._boss.x - this._boss.width / 3 + Math.random() * 2 / 3 * this._boss.width;
                        this._explosions[this._expCount].y = this._boss.y - this._boss.height / 3 + Math.random() * 2 / 3 * this._boss.height;
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
        };
        // ---------- END UPDATE ------------
        // ---------- MAIN ------------
        // This is where the fun happens
        PlayScene.prototype.Main = function () {
            var _this = this;
            // add fireBackground to the scene
            this.addChild(this._fireBackground);
            //add boss health progress bar
            this.addChild(this._bossHealthBorder);
            this.addChild(this._bossHealthBar);
            //add gem
            this.addChild(this._weapon);
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
            this.on("click", function () {
                if (this._scoreBoard.Lives > 0) {
                    if (managers.Game.upgrade) {
                        this._plane.BulletCombo();
                    }
                    else {
                        this._plane.BulletFire();
                    }
                }
            });
        };
        return PlayScene;
    }(objects.Scene));
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map