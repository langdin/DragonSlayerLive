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
var config;
(function (config) {
    var Keys = /** @class */ (function () {
        function Keys() {
        }
        // arrow keys
        Keys.LEFT_ARROW = 37;
        Keys.RIGHT_ARROW = 39;
        Keys.UP_ARROW = 38;
        Keys.DOWN_ARROW = 40;
        // WASD keys
        Keys.W = 87;
        Keys.A = 65;
        Keys.S = 83;
        Keys.D = 68;
        // space bar
        Keys.SPACE = 32;
        return Keys;
    }());
    config.Keys = Keys;
})(config || (config = {}));
var config;
(function (config) {
    var Scene;
    (function (Scene) {
        Scene[Scene["START"] = 0] = "START";
        Scene[Scene["INTRO"] = 1] = "INTRO";
        Scene[Scene["INSTRUCTION"] = 2] = "INSTRUCTION";
        Scene[Scene["PLAY"] = 3] = "PLAY";
        Scene[Scene["PLAY2"] = 4] = "PLAY2";
        Scene[Scene["PLAY3"] = 5] = "PLAY3";
        Scene[Scene["OVER"] = 6] = "OVER";
    })(Scene = config.Scene || (config.Scene = {}));
})(config || (config = {}));
var managers;
(function (managers) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.HighScore = 0;
        Game.upgrade = false;
        return Game;
    }());
    managers.Game = Game;
})(managers || (managers = {}));
var objects;
(function (objects) {
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        // Private Instance Variables
        // Public Propoerties
        // Constructor
        function Label(labelString, fontSize, fontFamily, fontColour, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, labelString, fontSize + " " + fontFamily, fontColour) || this;
            if (isCentered) {
                _this.regX = _this.getMeasuredWidth() * 0.5;
                _this.regY = _this.getMeasuredHeight() * 0.5;
            }
            _this.x = x;
            _this.y = y;
            return _this;
        }
        return Label;
    }(createjs.Text));
    objects.Label = Label;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        // Constructor
        function Scene(assetManager) {
            var _this = _super.call(this) || this;
            _this.assetManager = assetManager;
            return _this;
        }
        // Private Methods
        // Public Methods
        Scene.prototype.Start = function () {
        };
        Scene.prototype.Update = function () {
        };
        Scene.prototype.Main = function () {
        };
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
var math;
(function (math) {
    var Vec2 = /** @class */ (function (_super) {
        __extends(Vec2, _super);
        //private instance variables
        //public properties
        // constructors
        function Vec2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return _super.call(this, x, y) || this;
        }
        // private methods
        // public methods
        // calculates the distance between two Vec2 objects
        Vec2.Distance = function (P1, P2) {
            return Math.floor(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)));
        };
        return Vec2;
    }(createjs.Point));
    math.Vec2 = Vec2;
})(math || (math = {}));
var objects;
(function (objects) {
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // Constructors
        function GameObject(imageString) {
            var _this = _super.call(this, managers.Game.textureAtlas, imageString) || this;
            _this.name = imageString;
            _this._initialize();
            return _this;
        }
        // Private Methods
        GameObject.prototype._initialize = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.isColliding = false;
        };
        // Public Methods
        // Initialization
        GameObject.prototype.Reset = function () {
        };
        GameObject.prototype.CheckBounds = function () {
        };
        GameObject.prototype.Move = function () {
        };
        GameObject.prototype.Start = function () {
        };
        // Updates the Object every frame
        GameObject.prototype.Update = function () {
        };
        return GameObject;
    }(createjs.Sprite));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var smallExplosion = /** @class */ (function (_super) {
        __extends(smallExplosion, _super);
        // private instance variables
        // public properties
        // constructors
        function smallExplosion() {
            var _this = _super.call(this, "smallexplosion") || this;
            _this.Start();
            return _this;
        }
        // private methods
        smallExplosion.prototype._animationEnded = function () {
            this.alpha = 0;
            this.off("animationend", this._animationEnded.bind(this), false);
            managers.Game.currentSceneObject.removeChild(this);
        };
        // public methods
        smallExplosion.prototype.Start = function () {
            this.on("animationend", this._animationEnded.bind(this), false);
        };
        smallExplosion.prototype.Update = function () {
        };
        return smallExplosion;
    }(objects.GameObject));
    objects.smallExplosion = smallExplosion;
})(objects || (objects = {}));
var managers;
(function (managers) {
    var Keyboard = /** @class */ (function () {
        // Constructors
        function Keyboard() {
            this.enabled = false;
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
            document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        }
        // private methods
        // public methods
        Keyboard.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case config.Keys.W:
                case config.Keys.UP_ARROW:
                    this.moveForward = true;
                    break;
                case config.Keys.A:
                case config.Keys.LEFT_ARROW:
                    this.moveLeft = true;
                    break;
                case config.Keys.S:
                case config.Keys.DOWN_ARROW:
                    this.moveBackward = true;
                    break;
                case config.Keys.D:
                case config.Keys.RIGHT_ARROW:
                    this.moveRight = true;
                    break;
                case config.Keys.SPACE:
                    this.shoot = true;
                    break;
            }
        };
        Keyboard.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case config.Keys.W:
                case config.Keys.UP_ARROW:
                    this.moveForward = false;
                    break;
                case config.Keys.A:
                case config.Keys.LEFT_ARROW:
                    this.moveLeft = false;
                    break;
                case config.Keys.S:
                case config.Keys.DOWN_ARROW:
                    this.moveBackward = false;
                    break;
                case config.Keys.D:
                case config.Keys.RIGHT_ARROW:
                    this.moveRight = false;
                    break;
                case config.Keys.SPACE:
                    this.shoot = false;
                    break;
            }
        };
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
var managers;
(function (managers) {
    var ScoreBoard = /** @class */ (function () {
        // constructors
        function ScoreBoard() {
            this._initialize();
        }
        Object.defineProperty(ScoreBoard.prototype, "Score", {
            // public properties
            get: function () {
                return this._score;
            },
            set: function (newScore) {
                this._score = newScore;
                this.ScoreLabel.text = "Score: " + this._score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Lives", {
            get: function () {
                return this._lives;
            },
            set: function (newLives) {
                this._lives = newLives;
                this.LivesLabel.text = "Lives: " + this._lives;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "HighScore", {
            get: function () {
                return this._highScore;
            },
            set: function (newHighScore) {
                this._highScore = newHighScore;
                this.HighScoreLabel.text = "High Score: " + this._highScore;
            },
            enumerable: true,
            configurable: true
        });
        // private methods
        ScoreBoard.prototype._initialize = function () {
            this.LivesLabel = new objects.Label("Lives: 0", "20px", "rockwell", "#FFFF00", 10, 10, false);
            this.ScoreLabel = new objects.Label("Score: 99999", "20px", "rockwell", "#FFFF00", 670, 10, false);
            this.HighScoreLabel = new objects.Label("High Score: 99999", "40px", "rockwell", "#FFFF00", 400, 300, true);
            this.Score = 0;
            this.Lives = 5;
            this.HighScore = 0;
        };
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        // constructors
        function Bullet() {
            this.Start();
        }
        // private methods
        Bullet.prototype._buildBulletPool = function () {
            for (var count = 0; count < this._bulletCount; count++) {
                this.Bullets[count] = new objects.PlaneBullet();
            }
            for (var count = 0; count < this._dragonBulletCount; count++) {
                this.DragonBullets[count] = new objects.FireBullet();
            }
            for (var count = 0; count < this._bossBulletCount; count++) {
                this.BossBullets[count] = new objects.BossBullet();
            }
        };
        // public methods
        Bullet.prototype.Start = function () {
            // set the default bullet count
            this._bulletCount = 50;
            this._dragonBulletCount = 50;
            this._bossBulletCount = 30;
            // create the bullet container
            this.Bullets = new Array();
            this.DragonBullets = new Array();
            this.BossBullets = new Array();
            // build bullet array
            this._buildBulletPool();
            // set the Current Bullet to 0
            this.CurrentBullet = 0;
        };
        Bullet.prototype.Update = function () {
            this.Bullets.forEach(function (bullet) {
                bullet.Update();
            });
            this.DragonBullets.forEach(function (bullet) {
                bullet.Update();
            });
            this.BossBullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        //TODO collision with 3rd boss // add object2 type
        Collision.Check = function (object1, object2) {
            // define points for both object1 and object2
            var P1 = new math.Vec2(object1.x, object1.y);
            var P2 = new math.Vec2(object2.x, object2.y);
            if (object2.name == "boss1" || object2.name == "boss2") {
                P2 = new math.Vec2(object2.x, object2.y - 99);
            }
            // check if there is a collision
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                    var explosion = void 0;
                    switch (object2.name) {
                        case "player":
                            if (managers.Game.scoreBoardManager.Lives > 0) {
                                managers.Game.scoreBoardManager.Lives -= 1;
                                explosion = new objects.smallExplosion();
                                explosion.x = object1.x;
                                explosion.y = object1.y;
                                managers.Game.currentSceneObject.addChild(explosion);
                                createjs.Sound.play("explosion");
                                managers.Game.upgrade = false;
                            }
                            break;
                        case "dragon":
                            managers.Game.scoreBoardManager.Score += 100;
                            explosion = new objects.smallExplosion();
                            explosion.x = object2.x;
                            explosion.y = object2.y;
                            managers.Game.currentSceneObject.addChild(explosion);
                            createjs.Sound.play("explosion");
                            break;
                        case "gem":
                            managers.Game.scoreBoardManager.Score += 300;
                            managers.Game.upgrade = true;
                            break;
                        case "heart":
                            if (managers.Game.scoreBoardManager.Lives > 0 && managers.Game.scoreBoardManager.Lives < 5) {
                                managers.Game.scoreBoardManager.Score += 300;
                                managers.Game.scoreBoardManager.Lives += 1;
                            }
                            break;
                        case "boss1":
                        case "boss2":
                            managers.Game.scoreBoardManager.Score += 200;
                            explosion = new objects.smallExplosion();
                            explosion.x = object1.x;
                            explosion.y = object1.y;
                            managers.Game.currentSceneObject.addChild(explosion);
                            createjs.Sound.play("explosion");
                            break;
                    }
                    return true;
                }
            }
            else {
                object2.isColliding = false;
                return false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
var objects;
(function (objects) {
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        // Private Instance Variables
        // Public Properties
        // Constructor
        function Button(imageString, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, imageString) || this;
            _this.x = x;
            _this.y = y;
            _this.on("mouseover", _this._mouseOver);
            _this.on("mouseout", _this._mouseOut);
            return _this;
        }
        // Private Methods
        Button.prototype._mouseOver = function () {
            this.alpha = 0.7;
        };
        Button.prototype._mouseOut = function () {
            this.alpha = 1.0;
        };
        return Button;
    }(objects.GameObject));
    objects.Button = Button;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var TitleImg = /** @class */ (function (_super) {
        __extends(TitleImg, _super);
        // Private Instance Variables
        // Public Properties
        // Constructors
        function TitleImg(assetManager) {
            var _this = _super.call(this, assetManager.getResult("titleImg")) || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        TitleImg.prototype._reset = function () {
        };
        TitleImg.prototype._checkBounds = function () {
        };
        TitleImg.prototype._move = function () {
        };
        // Public Methods
        // Initialization
        TitleImg.prototype.Start = function () {
            this.y = 200;
        };
        // Updates the Object every frame
        TitleImg.prototype.Update = function () {
        };
        return TitleImg;
    }(createjs.Bitmap));
    objects.TitleImg = TitleImg;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var FireBackground = /** @class */ (function (_super) {
        __extends(FireBackground, _super);
        // Public Properties
        // Constructors
        function FireBackground(assetManager) {
            var _this = this;
            if (managers.Game.currentScene == config.Scene.PLAY) {
                _this = _super.call(this, assetManager.getResult("fireBackground")) || this;
            }
            else if (managers.Game.currentScene == config.Scene.PLAY2) {
                _this = _super.call(this, assetManager.getResult("lava")) || this;
            }
            else if (managers.Game.currentScene == config.Scene.PLAY3) {
                _this = _super.call(this, assetManager.getResult("fire3")) || this;
            }
            _this.Start();
            return _this;
        }
        // Private Methods
        FireBackground.prototype._Reset = function () {
            this.y = -680;
        };
        FireBackground.prototype._CheckBounds = function () {
            if (this.y >= 0) {
                this._Reset();
            }
        };
        FireBackground.prototype._Move = function () {
            //if (objects.Game.scoreBoardManager.Score < 2000) {
            this.y += this._dy;
            //}
        };
        // Public Methods
        // Initialization
        FireBackground.prototype.Start = function () {
            this._dy = 5; // move 5 pixels down every frame
            this._Reset();
        };
        // Updates the Object every frame
        FireBackground.prototype.Update = function () {
            this._Move();
            this._CheckBounds();
        };
        return FireBackground;
    }(createjs.Bitmap));
    objects.FireBackground = FireBackground;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var GameOverImg = /** @class */ (function (_super) {
        __extends(GameOverImg, _super);
        // Private Instance Variables
        // Public Properties
        // Constructors
        function GameOverImg(assetManager) {
            var _this = _super.call(this, assetManager.getResult("gameOverImg")) || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        GameOverImg.prototype._reset = function () {
        };
        GameOverImg.prototype._checkBounds = function () {
        };
        GameOverImg.prototype._move = function () {
        };
        // Public Methods
        // Initialization
        GameOverImg.prototype.Start = function () {
            this.x = 170;
            this.y = 150;
        };
        // Updates the Object every frame
        GameOverImg.prototype.Update = function () {
        };
        return GameOverImg;
    }(createjs.Bitmap));
    objects.GameOverImg = GameOverImg;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Dragon = /** @class */ (function (_super) {
        __extends(Dragon, _super);
        // Public Properties
        // Constructors
        function Dragon(posX, posY) {
            var _this = _super.call(this, "dragon") || this;
            _this._posX = posX;
            _this._posY = posY;
            _this._stopSpawn = false;
            _this.Start();
            return _this;
        }
        // Private Methods
        // Public Methods
        // Initialization
        Dragon.prototype.Reset = function () {
            if (!this._stopSpawn) {
                this.x = (Math.random() * (this._pos - this.width)) + this.halfWidth + this._posX;
                this.y = -this.height;
                //this.y = -(this.height + this._posY) - 20;
                //console.log("spawn")
            }
        };
        Dragon.prototype.RemoveFromScreen = function () {
            this.x = 1000;
            this.y = 1000;
        };
        Dragon.prototype.CheckBounds = function () {
            // check the bottom border
            if (this.y >= 600 + this.height) {
                this.Reset();
            }
        };
        Dragon.prototype.StopSpawn = function () {
            this._stopSpawn = true;
            //console.log('change spawn')
        };
        Dragon.prototype.Move = function () {
            //if(objects.Game.scoreBoardManager.Score < 2000) {
            this.y += this._dy;
            //} 
        };
        Dragon.prototype.Start = function () {
            if (managers.Game.currentScene == config.Scene.PLAY) {
                this._pos = 160;
            }
            else if (managers.Game.currentScene == config.Scene.PLAY2) {
                this._pos = 133;
            }
            else if (managers.Game.currentScene == config.Scene.PLAY3) {
                this._pos = 133;
            }
            this._dy = 2;
            this._currentBullet = this._posX / this._pos;
            this.Reset();
        };
        // Updates the Object every frame
        Dragon.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Dragon.prototype.Fire = function () {
            managers.Game.bulletManger.DragonBullets[this._currentBullet].x = this.x - 5;
            managers.Game.bulletManger.DragonBullets[this._currentBullet].y = this.y + this.halfHeight + 10;
            this._currentBullet += 5;
            if (this._currentBullet > 49) {
                this._currentBullet = this._posX / this._pos;
            }
        };
        return Dragon;
    }(objects.GameObject));
    objects.Dragon = Dragon;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var PlaneBullet = /** @class */ (function (_super) {
        __extends(PlaneBullet, _super);
        // Private Instance Variables
        // Public Properties
        // Constructors
        function PlaneBullet() {
            var _this = _super.call(this, "planeBullet") || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        // Public Methods
        // Initialization
        PlaneBullet.prototype.Reset = function () {
            this.x = -1000;
            this.y = -1000;
        };
        PlaneBullet.prototype.CheckBounds = function () {
            if (this.y <= -this.height) {
                this.Reset();
            }
        };
        PlaneBullet.prototype.Move = function () {
            this.y -= this._dy;
        };
        PlaneBullet.prototype.Start = function () {
            this._dy = 8;
            this.Reset();
        };
        // Updates the Object every frame
        PlaneBullet.prototype.Update = function () {
            this.Move();
        };
        return PlaneBullet;
    }(objects.GameObject));
    objects.PlaneBullet = PlaneBullet;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var FireBullet = /** @class */ (function (_super) {
        __extends(FireBullet, _super);
        // Private Instance Variables
        // Public Properties
        // Constructors
        function FireBullet() {
            var _this = _super.call(this, "dragonBullet") || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        // Public Methods
        // Initialization
        FireBullet.prototype.Reset = function () {
            this.x = -1000;
            this.y = -1000;
        };
        FireBullet.prototype.CheckBounds = function () {
            if (this.y >= this.height + 600) {
                this.Reset();
            }
        };
        FireBullet.prototype.Move = function () {
            this.y += this._dy;
        };
        FireBullet.prototype.Start = function () {
            this._dy = 6;
            this.Reset();
        };
        // Updates the Object every frame
        FireBullet.prototype.Update = function () {
            this.Move();
        };
        return FireBullet;
    }(objects.GameObject));
    objects.FireBullet = FireBullet;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var BossBullet = /** @class */ (function (_super) {
        __extends(BossBullet, _super);
        // Constructors
        function BossBullet() {
            var _this = _super.call(this, "bossBullet") || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        // Public Methods
        // Initialization
        BossBullet.prototype.Reset = function () {
            this.x = -1000;
            this.y = -1000;
        };
        BossBullet.prototype.CheckBounds = function () {
            if (this.y >= this.height + 600) {
                this.Reset();
            }
        };
        BossBullet.prototype.Move = function () {
            if (this.x != -1000) {
                if (this.simpleShot) {
                    this._dy = 7;
                    this.x += this._direction;
                }
                else {
                    this._dy = 3;
                    var ticker = createjs.Ticker.getTicks();
                    if (ticker % 2 == 0) {
                        this.x = this.x + 15 * Math.sin(ticker / 10) + this._direction;
                    }
                }
            }
            this.y += this._dy;
        };
        BossBullet.prototype.Start = function () {
            this._dy = 3;
            this.Reset();
        };
        // Updates the Object every frame
        BossBullet.prototype.Update = function () {
            this.Move();
        };
        BossBullet.prototype.SetDirectoin = function (direction) {
            this._direction = direction;
        };
        return BossBullet;
    }(objects.GameObject));
    objects.BossBullet = BossBullet;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // Private Instance Variables
        // Public Properties
        // Constructors
        function Plane() {
            var _this = _super.call(this, "player") || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        // Public Methods
        // Initialization
        Plane.prototype.Reset = function () {
        };
        Plane.prototype.CheckBounds = function () {
            // check the right boundary
            if (this.x >= 800 - this.halfWidth) {
                this.x = 800 - this.halfWidth;
            }
            // check the left boundary
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            // check the right boundary
            if (this.y >= 600 - this.halfHeight) {
                this.y = 600 - this.halfHeight;
            }
            // check the left boundary
            if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        Plane.prototype.Move = function () {
            // mouse control
            this.x = managers.Game.stage.mouseX;
            // keyboard controls
            //if(objects.Game.keyboardManager.moveLeft) {
            //  this.x -= 6;
            //}
            //if(objects.Game.keyboardManager.moveRight) {
            //  this.x += 6;
            //}
            //if(objects.Game.keyboardManager.moveForward) {
            //  this.y -= 6;
            //}
            //if(objects.Game.keyboardManager.moveBackward) {
            //  this.y += 6;
            //}
        };
        Plane.prototype.Start = function () {
            this.x = 400;
            this.y = 530;
        };
        // Updates the Object every frame
        Plane.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Plane.prototype.BulletFire = function (double) {
            if (double === void 0) { double = false; }
            var currentBullet = managers.Game.bulletManger.CurrentBullet;
            var dx = 0;
            if (double && (currentBullet + 1) % 2 == 0) {
                dx = 10;
            }
            else if (double && (currentBullet + 1) % 2 != 0) {
                dx = -10;
            }
            managers.Game.bulletManger.Bullets[currentBullet].x = managers.Game.plane.x + dx;
            managers.Game.bulletManger.Bullets[currentBullet].y = managers.Game.plane.y - 30;
            managers.Game.bulletManger.CurrentBullet++;
            if (managers.Game.bulletManger.CurrentBullet > 49) {
                managers.Game.bulletManger.CurrentBullet = 0;
            }
            var planeShotSound = createjs.Sound.play("planeShot");
            planeShotSound.volume = 0.2;
        };
        Plane.prototype.BulletCombo = function () {
            this.BulletFire(true);
            this.BulletFire(true);
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Boss1 = /** @class */ (function (_super) {
        __extends(Boss1, _super);
        // Public Properties
        // Constructors
        function Boss1(name) {
            var _this = _super.call(this, name) || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        Boss1.prototype._Fire = function (direction) {
            managers.Game.bulletManger.BossBullets[this._currentBullet].SetDirectoin(direction);
            managers.Game.bulletManger.BossBullets[this._currentBullet].simpleShot = this._simpleShot;
            if (this.name == 'boss1') {
                managers.Game.bulletManger.BossBullets[this._currentBullet].x = this.x + 120;
                managers.Game.bulletManger.BossBullets[this._currentBullet].y = this.y - 50;
            }
            else if (this.name == 'boss2') {
                managers.Game.bulletManger.BossBullets[this._currentBullet].x = this.x + 230;
                managers.Game.bulletManger.BossBullets[this._currentBullet].y = this.y - 50;
            }
            this._currentBullet++;
            if (this._currentBullet > 29) {
                this._currentBullet = 0;
            }
        };
        // Public Methods
        // Initialization
        Boss1.prototype.Reset = function () {
            this.x = 400;
        };
        Boss1.prototype.CheckBounds = function () {
            if (this.name == 'boss1') {
                if (this.y >= 140) {
                    this.y = 140;
                }
            }
            else if (this.name == 'boss2') {
                if (this.y >= 180) {
                    this.y = 180;
                }
            }
        };
        Boss1.prototype.Move = function () {
            this.y += this._dy;
        };
        Boss1.prototype.Start = function () {
            this._dy = 3;
            this.x = 400;
            if (this.name == 'boss1') {
                this.y = -500;
            }
            else if (this.name == 'boss2') {
                this.y = -600;
            }
            this._currentBullet = 0;
            this._direction = 0;
            this._directionIncrement = 2;
            this._simpleShot = true;
        };
        // Updates the Object every frame
        Boss1.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Boss1.prototype.RemoveFromScreen = function () {
            this.x = 3000;
            this.y = 3000;
        };
        //TODO fore boss3 make shooting multiple patterns
        Boss1.prototype.FireAtack = function () {
            if (managers.Game.currentScene == config.Scene.PLAY) {
                this._simpleShot = true;
                this._Fire(this._direction);
                this._Fire(this._direction + 2);
                this._Fire(this._direction + -2);
            }
            else if (managers.Game.currentScene == config.Scene.PLAY2) {
                this._simpleShot = false;
                this._Fire(this._direction - 2);
                this._Fire(this._direction - 4);
                this._Fire(this._direction);
            }
            else if (managers.Game.currentScene == config.Scene.PLAY3) {
                if (this.name == 'boss1') {
                    this._simpleShot = true;
                    this._Fire(this._direction);
                    this._Fire(this._direction + 2);
                    this._Fire(this._direction - 2);
                    this._Fire(this._direction + 4);
                    this._Fire(this._direction - 4);
                }
                else if (this.name == 'boss2') {
                    this._simpleShot = false;
                    this._Fire(this._direction - 2);
                    this._Fire(this._direction - 4);
                    this._Fire(this._direction - 6);
                    this._Fire(this._direction);
                }
            }
            this._direction += this._directionIncrement;
            if (this._direction == 2) {
                this._directionIncrement = -2;
            }
            else if (this._direction == -4) {
                this._directionIncrement = 2;
            }
        };
        return Boss1;
    }(objects.GameObject));
    objects.Boss1 = Boss1;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Coin = /** @class */ (function (_super) {
        __extends(Coin, _super);
        // constructors
        function Coin() {
            var _this = _super.call(this, managers.Game.assetManager.getResult("gem")) || this;
            _this.name = "gem";
            _this._initialize();
            _this.Start();
            return _this;
        }
        // private methods
        Coin.prototype._initialize = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.isColliding = false;
        };
        // public methods
        Coin.prototype.Start = function () {
            this.x = -1000;
            this.y = -1000;
        };
        Coin.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Coin.prototype.CheckBounds = function () {
        };
        Coin.prototype.Move = function () {
            this.y += 1;
        };
        Coin.prototype.Reset = function () {
            this.x = -1000;
            this.y = -1000;
        };
        return Coin;
    }(createjs.Bitmap));
    objects.Coin = Coin;
})(objects || (objects = {}));
var objects;
(function (objects) {
    var Health = /** @class */ (function (_super) {
        __extends(Health, _super);
        // constructors
        function Health() {
            var _this = _super.call(this, managers.Game.assetManager.getResult("heart")) || this;
            _this.name = "heart";
            _this._initialize();
            _this.Start();
            return _this;
        }
        // private methods
        Health.prototype._initialize = function () {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.isColliding = false;
        };
        // public methods
        Health.prototype.Start = function () {
            this.x = -1000;
            this.y = -1000;
        };
        Health.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Health.prototype.CheckBounds = function () {
        };
        Health.prototype.Move = function () {
            this.y += 1;
        };
        Health.prototype.Reset = function () {
            this.x = -1000;
            this.y = -1000;
        };
        return Health;
    }(createjs.Bitmap));
    objects.Health = Health;
})(objects || (objects = {}));
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
            managers.Game.currentScene = config.Scene.PLAY;
        };
        // Public Methods
        // Initialize Game Variables and objects
        OverScene.prototype.Start = function () {
            if (managers.Game.scoreBoardManager.Lives == 0) {
                this._BGMusic = createjs.Sound.play("gameover");
                this._gameOverImg = new objects.GameOverImg(this.assetManager);
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
            this._restartButton.on("click", function () {
                managers.Game.currentScene = config.Scene.PLAY;
            });
        };
        return OverScene;
    }(objects.Scene));
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
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
            this._boss1Health = 70;
            this._boss2Health = 80;
            this._boss1CurrentHealth = 70;
            this._boss2CurrentHealth = 80;
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
            this._dragonsNumber = 6;
            this, this._dragons = new Array();
            var grid = 0;
            for (var i = 0; i < this._dragonsNumber; i++) {
                this._dragons[i] = new objects.Dragon(grid, Math.random() * 250);
                grid += 133;
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
                this._weaponUp.alpha = 1;
                this._weapon.Reset();
            }
            if (this._weaponUp.alpha > 0) {
                this._weaponUp.alpha -= 0.005;
            }
            this._health.Update();
            if (managers.Collision.Check(this._plane, this._health)) {
                var healthSound = createjs.Sound.play("gemSound");
                if (this._scoreBoard.Lives <= 5) {
                    this._healthUp.alpha = 1;
                }
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
                console.log('boss1 time');
                if (this._boss1.y >= 139) {
                    this._boss1HealthBorder.alpha = 1;
                    this._boss1HealthBar.alpha = 1;
                }
                var ticker_1 = createjs.Ticker.getTicks();
                this._boss1.Update();
                if (ticker_1 % 90 == 0 && this._boss1.y >= 140 && !this._boss1Killed) {
                    this._boss1.FireAtack();
                }
            }
            //make boss come down and atack after boss1
            if (this._boss1Killed) {
                console.log('boss2 time');
                if (this._boss1.y >= 139) {
                    this._boss2HealthBorder.alpha = 1;
                    this._boss2HealthBar.alpha = 1;
                }
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
                    this._expCount = 0;
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
            this.addChild(this._healthUp);
            this.addChild(this._weaponUp);
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
        // ---------- START ------------
        // Initialize Game Variables and objects
        PlayScene2.prototype.Start = function () {
            // setup background sound
            this._BGMusic = createjs.Sound.play("BGMusic");
            this._BGMusic.loop = -1;
            this._BGMusic.volume = 0.3;
            this._weapon = new objects.Coin();
            this._health = new objects.Health();
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManger = this._bulletManager;
            this._bossHealth = 70;
            this._bossCurrentHealth = 70;
            // progress bar for boss health
            this._bossHealthBar = new createjs.Shape().set({ x: 20, y: 400, scaleY: 1 });
            this._bossHealthBar.graphics.beginFill("red").drawRect(0, 0, 30, -200);
            this._bossHealthBorder = new createjs.Shape().set({ x: 17, y: 403 });
            this._bossHealthBorder.graphics.beginFill("white").drawRect(0, 0, 36, -206);
            this._bossHealthBorder.alpha = 0;
            this._bossHealthBar.alpha = 0;
            this._fireBackground = new objects.FireBackground(this.assetManager);
            this._plane = new objects.Plane();
            managers.Game.plane = this._plane;
            //health up label
            this._healthUp = new objects.Label("health up", "10px", "rockwell", "#FFFF00", this._plane.x, this._plane.y - 45, false);
            this._healthUp.alpha = 0;
            //weapon up label
            this._weaponUp = new objects.Label("weapon up", "10px", "rockwell", "#FFFF00", this._plane.x, this._plane.y - 45, false);
            this._weaponUp.alpha = 0;
            this._dragonsNumber = 6;
            this, this._dragons = new Array();
            var grid = 0;
            for (var i = 0; i < this._dragonsNumber; i++) {
                this._dragons[i] = new objects.Dragon(grid, Math.random() * 250);
                grid += 133;
            }
            this._boss = new objects.Boss1("boss2");
            this._scoreBoard = managers.Game.scoreBoardManager;
            this._explosions = new Array();
            this._expCount = 0;
            this._bossKilled = false;
            this._dragonsKilled = 0;
            this._dragonsKillGoal = 30;
            this.alpha = 0;
            this._fadeIn = false;
            this.Main();
        };
        // ---------- END START ------------
        // ---------- UPDATE ------------
        PlayScene2.prototype.Update = function () {
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
                this._weaponUp.alpha = 1;
                this._weapon.Reset();
            }
            if (this._weaponUp.alpha > 0) {
                this._weaponUp.alpha -= 0.005;
            }
            this._health.Update();
            if (managers.Collision.Check(this._plane, this._health)) {
                var healthSound = createjs.Sound.play("gemSound");
                if (this._scoreBoard.Lives <= 5) {
                    this._healthUp.alpha = 1;
                }
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
            //make boss come down and atack
            if (this._dragonsKilled >= this._dragonsKillGoal) {
                console.log('boss time');
                if (this._boss.y >= 179) {
                    this._bossHealthBorder.alpha = 1;
                    this._bossHealthBar.alpha = 1;
                }
                var ticker_5 = createjs.Ticker.getTicks();
                this._boss.Update();
                if (ticker_5 % 90 == 0 && this._boss.y >= 179 && !this._bossKilled) {
                    this._boss.FireAtack();
                }
            }
            this._bulletManager.Update();
            //check collision player bullets with boss
            this._bulletManager.Bullets.forEach(function (bullet) {
                if (_this._boss.x == 400 && _this._boss.y >= 180 && managers.Collision.Check(bullet, _this._boss)) {
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
                        if (this._dragonsKilled == 24) {
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
            if (!this._bossKilled) {
                if (ticker % 100 == 0) {
                    this._dragons.forEach(function (dragon) {
                        dragon.Fire();
                    });
                }
            }
            //fade scene after boss killed
            if ((this._scoreBoard.Lives <= 0 || this._bossKilled == true) && this.alpha > 0) {
                var ticker_6 = createjs.Ticker.getTicks();
                if (this._bossKilled) {
                    if (ticker_6 % 7 == 0 && this._expCount < 20) {
                        this._explosions[this._expCount] = new objects.smallExplosion();
                        this._explosions[this._expCount].x = this._boss.x - this._boss.width / 3 + Math.random() * 2 / 3 * this._boss.width;
                        this._explosions[this._expCount].y = this._boss.y - this._boss.height / 3 + Math.random() * 2 / 3 * this._boss.height;
                        managers.Game.currentSceneObject.addChild(this._explosions[this._expCount]);
                        createjs.Sound.play("explosion");
                        this._expCount++;
                    }
                }
                else if (this._scoreBoard.Lives <= 0) {
                    if (ticker_6 % 7 == 0 && this._expCount < 20) {
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
            if (this._bossKilled && this.alpha <= 0) {
                this._BGMusic.stop();
                managers.Game.currentScene = config.Scene.PLAY3;
            }
            if (this._scoreBoard.Lives <= 0 && this.alpha <= 0) {
                this._BGMusic.stop();
                managers.Game.currentScene = config.Scene.OVER;
            }
        };
        // ---------- END UPDATE ------------
        // ---------- MAIN ------------
        // This is where the fun happens
        PlayScene2.prototype.Main = function () {
            var _this = this;
            // add fireBackground to the scene
            this.addChild(this._fireBackground);
            //add boss health progress bar
            this.addChild(this._bossHealthBorder);
            this.addChild(this._bossHealthBar);
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
            this.addChild(this._healthUp);
            this.addChild(this._weaponUp);
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
        return PlayScene2;
    }(objects.Scene));
    scenes.PlayScene2 = PlayScene2;
})(scenes || (scenes = {}));
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
            this._health = new objects.Health();
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
            //health up label
            this._healthUp = new objects.Label("health up", "10px", "rockwell", "#FFFF00", this._plane.x, this._plane.y - 45, false);
            this._healthUp.alpha = 0;
            //weapon up label
            this._weaponUp = new objects.Label("weapon up", "10px", "rockwell", "#FFFF00", this._plane.x, this._plane.y - 45, false);
            this._weaponUp.alpha = 0;
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
            this._healthUp.x = this._plane.x;
            this._healthUp.y = this._plane.y - 45;
            this._weaponUp.x = this._plane.x;
            this._weaponUp.y = this._plane.y - 45;
            this._weapon.Update();
            if (managers.Collision.Check(this._plane, this._weapon)) {
                var gemSound = createjs.Sound.play("gemSound");
                this._weaponUp.alpha = 1;
                this._weapon.Reset();
            }
            if (this._weaponUp.alpha > 0) {
                this._weaponUp.alpha -= 0.005;
            }
            this._health.Update();
            if (managers.Collision.Check(this._plane, this._health)) {
                var healthSound = createjs.Sound.play("gemSound");
                if (this._scoreBoard.Lives <= 5) {
                    this._healthUp.alpha = 1;
                }
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
            //make boss come down and atack
            if (this._dragonsKilled >= this._dragonsKillGoal) {
                console.log('boss time');
                //this._cautionSound = createjs.Sound.play("caution");
                //this._cautionSound.loop = -1;
                //this._cautionSound.volume = 0.2;
                var ticker_7 = createjs.Ticker.getTicks();
                if (this._boss.y >= 139) {
                    this._bossHealthBorder.alpha = 1;
                    this._bossHealthBar.alpha = 1;
                }
                this._boss.Update();
                if (ticker_7 % 70 == 0 && this._boss.y >= 140 && !this._bossKilled) {
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
                        if (!managers.Game.upgrade && this._dragonsKilled == 9) {
                            this._weapon.x = this._dragons[j].x;
                            this._weapon.y = this._dragons[j].y;
                        }
                        if (this._dragonsKilled == 17) {
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
                var ticker_8 = createjs.Ticker.getTicks();
                if (this._bossKilled) {
                    if (ticker_8 % 7 == 0 && this._expCount < 20) {
                        this._explosions[this._expCount] = new objects.smallExplosion();
                        this._explosions[this._expCount].x = this._boss.x - this._boss.width / 3 + Math.random() * 2 / 3 * this._boss.width;
                        this._explosions[this._expCount].y = this._boss.y - this._boss.height / 3 + Math.random() * 2 / 3 * this._boss.height;
                        managers.Game.currentSceneObject.addChild(this._explosions[this._expCount]);
                        createjs.Sound.play("explosion");
                        this._expCount++;
                    }
                }
                else if (this._scoreBoard.Lives <= 0) {
                    if (ticker_8 % 7 == 0 && this._expCount < 20) {
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
            this.addChild(this._health);
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
            this.addChild(this._healthUp);
            this.addChild(this._weaponUp);
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
var scenes;
(function (scenes) {
    var Instructions = /** @class */ (function (_super) {
        __extends(Instructions, _super);
        // Public Properties
        // Constructor
        function Instructions(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        Instructions.prototype._StartButtonClick = function () {
            managers.Game.fade = true;
            //this._load.graphics.beginFill("red").drawRect(0, 0, 30, 200);
        };
        // Public Methods
        // Initialize Game Variables and objects
        Instructions.prototype.Start = function () {
            this._load = new createjs.Shape();
            this._load.x = 20;
            this._load.y = 400;
            this._startButton = new objects.Button("startButton", 380, 510);
            this._startBackground = new createjs.Bitmap(this.assetManager.getResult("tutorial"));
            managers.Game.fade = false;
            this.Main();
        };
        Instructions.prototype.Update = function () {
            if (managers.Game.fade) {
                this.alpha -= 0.025;
            }
            if (this.alpha <= 0) {
                managers.Game.currentScene = config.Scene.PLAY;
            }
            var ticker = createjs.Ticker.getTicks();
            var i = ticker * 5;
            //this._load.graphics.beginFill("#C33").setStrokeStyle(3).beginStroke("rgba(232,230,231, 1)")
            //.drawRect(0, 0, 30, -200+(i*5));
        };
        // This is where the fun happens
        Instructions.prototype.Main = function () {
            // add background of this page
            this.addChild(this._startBackground);
            // add title image
            // add the startButton to the scene
            this.addChild(this._startButton);
            this.addChild(this._load);
            this._startButton.on("click", this._StartButtonClick);
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var Intro = /** @class */ (function (_super) {
        __extends(Intro, _super);
        // Public Properties
        // Constructor
        function Intro(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        Intro.prototype._StartButtonClick = function () {
            managers.Game.fade = true;
            //this._load.graphics.beginFill("red").drawRect(0, 0, 30, 200);
        };
        // Public Methods
        // Initialize Game Variables and objects
        Intro.prototype.Start = function () {
            this._load = new createjs.Shape();
            this._load.x = 20;
            this._load.y = 400;
            this._startButton = new objects.Button("nextButton", 400, 510);
            this._startBackground = new createjs.Bitmap(this.assetManager.getResult("introduction"));
            managers.Game.fade = false;
            this.Main();
        };
        Intro.prototype.Update = function () {
            if (managers.Game.fade) {
                this.alpha -= 0.025;
            }
            if (this.alpha <= 0) {
                managers.Game.currentScene = config.Scene.INSTRUCTION;
            }
            var ticker = createjs.Ticker.getTicks();
            var i = ticker * 5;
            //this._load.graphics.beginFill("#C33").setStrokeStyle(3).beginStroke("rgba(232,230,231, 1)")
            //.drawRect(0, 0, 30, -200+(i*5));
        };
        // This is where the fun happens
        Intro.prototype.Main = function () {
            // add background of this page
            this.addChild(this._startBackground);
            // add title image
            // add the startButton to the scene
            this.addChild(this._startButton);
            this.addChild(this._load);
            this._startButton.on("click", this._StartButtonClick);
        };
        return Intro;
    }(objects.Scene));
    scenes.Intro = Intro;
})(scenes || (scenes = {}));
var scenes;
(function (scenes) {
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        // Public Properties
        // Constructor
        function StartScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        StartScene.prototype._StartButtonClick = function () {
            managers.Game.fade = true;
            //this._load.graphics.beginFill("red").drawRect(0, 0, 30, 200);
        };
        // Public Methods
        // Initialize Game Variables and objects
        StartScene.prototype.Start = function () {
            this._load = new createjs.Shape();
            this._load.x = 20;
            this._load.y = 400;
            this._titleImg = new objects.TitleImg(this.assetManager);
            this._startButton = new objects.Button("playNowButton", 400, 400);
            this._startBackground = new createjs.Bitmap(this.assetManager.getResult("startBackground"));
            managers.Game.fade = false;
            this.Main();
        };
        StartScene.prototype.Update = function () {
            if (managers.Game.fade) {
                this.alpha -= 0.025;
            }
            if (this.alpha <= 0) {
                managers.Game.currentScene = config.Scene.INTRO;
            }
            var ticker = createjs.Ticker.getTicks();
            var i = ticker * 5;
            //this._load.graphics.beginFill("#C33").setStrokeStyle(3).beginStroke("rgba(232,230,231, 1)")
            //.drawRect(0, 0, 30, -200+(i*5));
        };
        // This is where the fun happens
        StartScene.prototype.Main = function () {
            // add background of this page
            this.addChild(this._startBackground);
            // add title image
            this.addChild(this._titleImg);
            // add the startButton to the scene
            this.addChild(this._startButton);
            this.addChild(this._load);
            this._startButton.on("click", this._StartButtonClick);
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
/// <reference path="../../Scripts/managers/game.ts"/>
/// <reference path="../../Scripts/objects/label.ts"/>
/// <reference path="../../Scripts/config/keys.ts"/>
/// <reference path="../../Scripts/config/scene.ts"/>
/// <reference path="../../Scripts/objects/scene.ts"/>
/// <reference path="../../Scripts/math/vec2.ts"/>
/// <reference path="../../Scripts/objects/gameobject.ts"/>
/// <reference path="../../Scripts/objects/smallExplosion.ts"/>
/// <reference path="../../Scripts/managers/keyboard.ts"/>
/// <reference path="../../Scripts/managers/scoreboard.ts"/>
/// <reference path="../../Scripts/managers/bulletManager.ts"/>
/// <reference path="../../Scripts/managers/collision.ts"/>
/// <reference path="../../Scripts/objects/button.ts"/>
/// <reference path="../../Scripts/objects/titleImg.ts"/>
/// <reference path="../../Scripts/objects/fireBackground.ts"/>
/// <reference path="../../Scripts/objects/gameOverImg.ts"/>
/// <reference path="../../Scripts/objects/dragon.ts"/>
/// <reference path="../../Scripts/objects/planeBullet.ts"/>
/// <reference path="../../Scripts/objects/fireBullet.ts"/>
/// <reference path="../../Scripts/objects/bossBullet.ts"/>
/// <reference path="../../Scripts/objects/fireBackground.ts"/>
/// <reference path="../../Scripts/objects/plane.ts"/>
/// <reference path="../../Scripts/objects/planeBullet.ts"/>
/// <reference path="../../Scripts/objects/boss.ts"/>
/// <reference path="../../Scripts/objects/coin.ts"/>
/// <reference path="../../Scripts/objects/health.ts"/>
/// <reference path="../../Scripts/scenes/over.ts"/>
/// <reference path="../../Scripts/scenes/play3.ts"/>
/// <reference path="../../Scripts/scenes/play2.ts"/>
/// <reference path="../../Scripts/scenes/play.ts"/>
/// <reference path="../../Scripts/scenes/instructions.ts"/>
/// <reference path="../../Scripts/scenes/intro.ts"/>
/// <reference path="../../Scripts/scenes/start.ts"/>
/// <reference path="_references.ts"/>
// IIFE - Immediately Invoked Function Expression
(function () {
    // Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    var helloLabel;
    var clickMeButton;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    var keyBoardManager;
    var textureAtlasData;
    var textureAtlas;
    textureAtlasData = {
        "images": [
            "./Assets/sprites/textureAtlas.png"
        ],
        "frames": [
            [1, 1, 450, 396, 0, 0, 0],
            [1, 399, 510, 298, 0, 0, 0],
            [1, 699, 347, 108, 0, 0, 0],
            [1, 809, 347, 108, 0, 0, 0],
            [350, 699, 347, 108, 0, 0, 0],
            [350, 809, 347, 108, 0, 0, 0],
            [453, 1, 503, 301, 0, 0, 0],
            [453, 304, 70, 65, 0, 0, 0],
            [513, 371, 512, 295, 0, 0, 0],
            [513, 668, 31, 29, 0, 0, 0],
            [546, 668, 31, 29, 0, 0, 0],
            [579, 668, 31, 29, 0, 0, 0],
            [612, 668, 31, 29, 0, 0, 0],
            [645, 668, 31, 29, 0, 0, 0],
            [678, 668, 32, 28, 0, 0, 0],
            [525, 304, 70, 58, 0, 0, 0],
            [597, 304, 60, 49, 0, 0, 0],
            [659, 304, 37, 37, 0, 0, 0],
            [698, 304, 35, 34, 0, 0, 0],
            [698, 340, 29, 29, 0, 0, 0],
            [729, 340, 15, 29, 0, 0, 0],
            [712, 668, 434, 248, 0, 0, 0],
            [958, 1, 510, 295, 0, 0, 0],
            [1027, 298, 476, 301, 0, 0, 0],
            [1470, 1, 394, 259, 0, 0, 0],
            [1148, 601, 421, 268, 0, 0, 0],
            [1505, 262, 385, 259, 0, 0, 0],
            [1571, 523, 312, 272, 0, -22, -34]
        ],
        "animations": {
            "boss2": {
                "frames": [0, 8, 22, 23, 1, 6],
                "speed": 0.12
            },
            "nextButton": { "frames": [2] },
            "playNowButton": { "frames": [3] },
            "restartButton": { "frames": [4] },
            "startButton": { "frames": [5] },
            "player": {
                "frames": [7, 15],
                "speed": 0.1
            },
            "smallexplosion": {
                "frames": [9, 10, 11, 12, 13, 19],
                "speed": 0.5
            },
            "dragonBullet": { "frames": [14] },
            "dragon": { "frames": [16] },
            "bossBullet": { "frames": [17] },
            "gem": { "frames": [18] },
            "planeBullet": { "frames": [20] },
            "boss1": {
                "frames": [27, 26, 24, 21, 25],
                "speed": 0.12
            }
        }
    };
    assetManifest = [
        { id: "gem", src: "./Assets/images/gem.png" },
        { id: "heart", src: "./Assets/images/life.png" },
        { id: "fireBackground", src: "./Assets/images/fireBackground.jpg" },
        { id: "lava", src: "./Assets/images/lava.jpg" },
        { id: "fire3", src: "./Assets/images/fire3.jpg" },
        { id: "startBackground", src: "./Assets/images/startBackground.png" },
        { id: "gameOver", src: "./Assets/images/gameOver.jpg" },
        { id: "winBG", src: "./Assets/images/winBG.jpg" },
        { id: "introduction", src: "./Assets/images/introduction.jpg" },
        { id: "tutorial", src: "./Assets/images/tutorial.jpg" },
        { id: "titleImg", src: "./Assets/images/titleImg.png" },
        { id: "gameOverImg", src: "./Assets/images/gameOverImg.png" },
        { id: "BGMusic", src: "./Assets/audio/BGMusic.mp3" },
        { id: "planeShot", src: "./Assets/audio/Shot.mp3" },
        { id: "gemSound", src: "./Assets/audio/gem.mp3" },
        { id: "gameover", src: "./Assets/audio/GameoverOne.wav" },
        { id: "intro", src: "./Assets/audio/Introduction.mp3" },
        { id: "win", src: "./Assets/audio/Win.mp3" },
        { id: "caution", src: "./Assets/audio/caution.mp3" },
        { id: "explosion", src: "./Assets/audio/explosion.mp3" }
    ];
    // preloads assets
    function Init() {
        console.log("Initialization Started...");
        textureAtlas = new createjs.SpriteSheet(textureAtlasData);
        assetManager = new createjs.LoadQueue(); // creates the assetManager object
        assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20); // turn this on for buttons
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);
        managers.Game.stage = stage; // create a reference to the stage
        managers.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        keyBoardManager = new managers.Keyboard();
        managers.Game.keyboardManager = keyBoardManager;
        managers.Game.assetManager = assetManager;
        managers.Game.textureAtlas = textureAtlas;
        Main();
    }
    function Update() {
        // if the scene that is playing returns another current scene
        // then call Main again and switch the scene
        if (currentState != managers.Game.currentScene) {
            Main();
        }
        currentScene.Update();
        stage.update(); // redraws the stage
    }
    function Main() {
        stage.removeAllChildren();
        switch (managers.Game.currentScene) {
            case config.Scene.START:
                currentScene = new scenes.StartScene(assetManager);
                break;
            case config.Scene.INTRO:
                currentScene = new scenes.Intro(assetManager);
                break;
            case config.Scene.INSTRUCTION:
                currentScene = new scenes.Instructions(assetManager);
                break;
            case config.Scene.PLAY:
                currentScene = new scenes.PlayScene(assetManager);
                break;
            case config.Scene.PLAY2:
                currentScene = new scenes.PlayScene2(assetManager);
                break;
            case config.Scene.PLAY3:
                currentScene = new scenes.PlayScene3(assetManager);
                break;
            case config.Scene.OVER:
                currentScene = new scenes.OverScene(assetManager);
                break;
        }
        currentState = managers.Game.currentScene;
        managers.Game.currentSceneObject = currentScene;
        stage.addChild(currentScene);
    }
    window.onload = Init;
})();
//# sourceMappingURL=game.js.map