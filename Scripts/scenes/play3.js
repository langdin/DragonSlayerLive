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
            this._BGMusic = createjs.Sound.play("BGMusic");
            this._BGMusic.loop = -1;
            this._BGMusic.volume = 0.3;
            this._weapon = new objects.Coin();
            this._health = new objects.Health();
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManger = this._bulletManager;
            this._boss1Health = 80;
            this._boss2Health = 100;
            this._boss1CurrentHealth = 80;
            this._boss2CurrentHealth = 100;
            // progress bar for boss1 health
            this._boss1HealthBar = new createjs.Shape().set({ x: 20, y: 400, scaleY: 1 });
            this._boss1HealthBar.graphics.beginFill("red").drawRect(0, 0, 30, -200);
            this._boss1HealthBorder = new createjs.Shape().set({ x: 17, y: 403 });
            this._boss1HealthBorder.graphics.beginFill("white").drawRect(0, 0, 36, -206);
            this._boss1HealthBorder.alpha = 0;
            this._boss1HealthBar.alpha = 0;
            // progress bar for boss2 health
            this._boss2HealthBar = new createjs.Shape().set({ x: 20, y: 400, scaleY: 1 });
            this._boss2HealthBar.graphics.beginFill("red").drawRect(0, 0, 30, -200);
            this._boss2HealthBorder = new createjs.Shape().set({ x: 17, y: 403 });
            this._boss2HealthBorder.graphics.beginFill("white").drawRect(0, 0, 36, -206);
            this._boss2HealthBorder.alpha = 0;
            this._boss2HealthBar.alpha = 0;
            this._boss1 = new objects.Boss1("boss1");
            this._boss2 = new objects.Boss1("boss2");
            this._fireBackground = new objects.FireBackground(this.assetManager);
            this._plane = new objects.Plane();
            managers.Game.plane = this._plane;
            //health up label
            this._healthUp = new objects.Label("health up", "10px", "rockwell", "#FFFF00", this._plane.x, this._plane.y - 45, false);
            this._healthUp.alpha = 0;
            //weapon up label
            this._weaponUp = new objects.Label("weapon up", "10px", "rockwell", "#FFFF00", this._plane.x, this._plane.y - 45, false);
            this._weaponUp.alpha = 0;
            this._dragonsNumber = 7;
            this, this._dragons = new Array();
            var grid = 0;
            for (var i = 0; i < this._dragonsNumber; i++) {
                this._dragons[i] = new objects.Dragon(grid, Math.random() * 250);
                grid += 114;
            }
            this._scoreBoard = managers.Game.scoreBoardManager;
            this._explosions = new Array();
            this._expCount = 0;
            this._boss1Killed = false;
            this._boss2Killed = false;
            this._dragonsKilled = 0;
            this._dragonsKillGoal = 35;
            this.alpha = 0;
            this._fadeIn = false;
            this.Main();
        };
        // ---------- END START ------------
        // ---------- UPDATE ------------
        PlayScene3.prototype.Update = function () {
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
            this._healthUp.x = this._plane.x;
            this._healthUp.y = this._plane.y - 45;
            this._weaponUp.x = this._plane.x;
            this._weaponUp.y = this._plane.y - 45;
            this._weapon.Update();
            if (managers.Collision.Check(this._plane, this._weapon)) {
                var gemSound = createjs.Sound.play("gemSound");
                this._weapon.Reset();
            }
            if (this._weaponUp.alpha > 0) {
                this._weaponUp.alpha -= 0.005;
            }
            this._health.Update();
            if (managers.Collision.Check(this._plane, this._health)) {
                var healthSound = createjs.Sound.play("gemSound");
                this._healthUp.alpha = 1;
                this._health.Reset();
            }
            if (this._healthUp.alpha > 0) {
                this._healthUp.alpha -= 0.005;
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
            //make boss come down and atack after small dragons killed
            if (this._dragonsKilled >= this._dragonsKillGoal) {
                //console.log('boss1 time');
                this._boss1HealthBorder.alpha = 1;
                this._boss1HealthBar.alpha = 1;
                var ticker_1 = createjs.Ticker.getTicks();
                this._boss1.Update();
                if (ticker_1 % 90 == 0 && this._boss1.y >= 140 && !this._boss1Killed) {
                    this._boss1.FireAtack();
                }
            }
            //make boss come down and atack after boss1
            if (this._boss1Killed) {
                console.log('boss2 time');
                this._boss2HealthBorder.alpha = 1;
                this._boss2HealthBar.alpha = 1;
                var ticker_2 = createjs.Ticker.getTicks();
                this._boss2.Update();
                if (ticker_2 % 90 == 0 && this._boss2.y >= 179 && !this._boss2Killed) {
                    this._boss2.FireAtack();
                }
            }
            this._bulletManager.Update();
            //check collision player bullets with boss1
            this._bulletManager.Bullets.forEach(function (bullet) {
                if (_this._boss1.x == 400 && _this._boss1.y >= 140 && managers.Collision.Check(bullet, _this._boss1)) {
                    _this._boss1CurrentHealth--;
                    if (_this._boss1CurrentHealth >= 0) {
                        _this._boss1HealthBar.set({ scaleY: _this._boss1CurrentHealth / _this._boss1Health });
                    }
                    if (_this._boss1CurrentHealth <= 0) {
                        //this._boss.RemoveFromScreen();
                        //this.removeChild(this._boss);
                        _this._boss1Killed = true;
                        _this.removeChild(_this._boss1HealthBar);
                        _this.removeChild(_this._boss1HealthBorder);
                    }
                    bullet.Reset();
                }
            });
            //check collision player bullets with boss2
            this._bulletManager.Bullets.forEach(function (bullet) {
                if (_this._boss2.x == 400 && _this._boss2.y >= 180 && managers.Collision.Check(bullet, _this._boss2)) {
                    _this._boss2CurrentHealth--;
                    console.log(_this._boss2CurrentHealth);
                    if (_this._boss2CurrentHealth >= 0) {
                        _this._boss2HealthBar.set({ scaleY: _this._boss2CurrentHealth / _this._boss2Health });
                    }
                    if (_this._boss2CurrentHealth <= 0) {
                        //this._boss.RemoveFromScreen();
                        //this.removeChild(this._boss);
                        console.log('boss2 killed');
                        _this._boss2Killed = true;
                        //this.removeChild(this._boss2HealthBar);
                        //this.removeChild(this._boss2HealthBorder);
                    }
                    bullet.Reset();
                }
            });
            //check collision player bullets with small dragons
            for (var i = 0; i < this._bulletManager.Bullets.length; i++) {
                for (var j = 0; j < this._dragons.length; j++) {
                    if (managers.Collision.Check(this._bulletManager.Bullets[i], this._dragons[j])) {
                        //if havent upgrated weapon yet
                        if (!managers.Game.upgrade && this._dragonsKilled == 17) {
                            this._weapon.x = this._dragons[j].x;
                            this._weapon.y = this._dragons[j].y;
                        }
                        if (this._dragonsKilled == 28) {
                            //TODO health up
                            this._health.x = this._dragons[j].x;
                            this._health.y = this._dragons[j].y;
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
            this._scoreBoard.HighScore = this._scoreBoard.Score;
            //make dragons atack
            var ticker = createjs.Ticker.getTicks();
            if (!this._boss1Killed) {
                if (ticker % 100 == 0) {
                    this._dragons.forEach(function (dragon) {
                        dragon.Fire();
                    });
                }
            }
            if (this._boss1Killed) {
                var ticker_3 = createjs.Ticker.getTicks();
                if (ticker_3 % 7 == 0 && this._expCount < 20) {
                    //TODO added explosion only on this level
                    this._explosions[this._expCount] = new objects.smallExplosion();
                    this._explosions[this._expCount].x = this._boss1.x - this._boss1.width / 3 + Math.random() * 2 / 3 * this._boss1.width;
                    this._explosions[this._expCount].y = this._boss1.y - this._boss1.height / 3 + Math.random() * 2 / 3 * this._boss1.height;
                    managers.Game.currentSceneObject.addChild(this._explosions[this._expCount]);
                    createjs.Sound.play("explosion");
                    this._expCount++;
                }
                this._boss1.alpha -= 0.005;
                if (ticker_3 % 300 == 0) {
                    this._boss1.RemoveFromScreen();
                    this.removeChild(this._boss1);
                }
            }
            //fade scene after boss killed
            if ((this._scoreBoard.Lives <= 0 || this._boss2Killed == true) && this.alpha > 0) {
                var ticker_4 = createjs.Ticker.getTicks();
                if (this._boss2Killed) {
                    console.log('boss2 killed');
                    if (ticker_4 % 7 == 0 && this._expCount < 20) {
                        //TODO added explosion only on this level
                        this._explosions[this._expCount] = new objects.smallExplosion();
                        this._explosions[this._expCount].x = this._boss2.x - this._boss2.width / 3 + Math.random() * 2 / 3 * this._boss2.width;
                        this._explosions[this._expCount].y = this._boss2.y - this._boss2.height / 3 + Math.random() * 2 / 3 * this._boss2.height;
                        managers.Game.currentSceneObject.addChild(this._explosions[this._expCount]);
                        createjs.Sound.play("explosion");
                        this._expCount++;
                    }
                }
                else if (this._scoreBoard.Lives <= 0) {
                    if (ticker_4 % 7 == 0 && this._expCount < 20) {
                        this._explosions[this._expCount] = new objects.smallExplosion();
                        this._explosions[this._expCount].x = this._plane.x - this._plane.width / 3 + Math.random() * 2 / 3 * this._plane.width;
                        this._explosions[this._expCount].y = this._plane.y - this._plane.height / 3 + Math.random() * 2 / 3 * this._plane.height;
                        managers.Game.currentSceneObject.addChild(this._explosions[this._expCount]);
                        createjs.Sound.play("explosion");
                        this._expCount++;
                    }
                }
                this.alpha -= 0.004;
            }
            //if boss killed and scene faded go to next scene
            if ((this._scoreBoard.Lives <= 0 || this._boss2Killed == true) && this.alpha <= 0) {
                this._BGMusic.stop();
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
            //add boss health progress bar
            this.addChild(this._boss1HealthBorder);
            this.addChild(this._boss1HealthBar);
            //add boss health progress bar
            this.addChild(this._boss2HealthBorder);
            this.addChild(this._boss2HealthBar);
            //add gem
            this.addChild(this._weapon);
            this.addChild(this._health);
            // add dragons to this scene
            this._dragons.forEach(function (dragon) {
                _this.addChild(dragon);
            });
            // add plane to this scene
            this.addChild(this._plane);
            //add boss to the scene
            this.addChild(this._boss1);
            //add boss to the scene
            this.addChild(this._boss2);
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
        return PlayScene3;
    }(objects.Scene));
    scenes.PlayScene3 = PlayScene3;
})(scenes || (scenes = {}));
//# sourceMappingURL=play3.js.map