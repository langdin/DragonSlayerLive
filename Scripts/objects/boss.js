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
            if (this.name == 'boss1') {
                this._simpleShot = true;
                this._Fire(this._direction);
                this._Fire(this._direction + 2);
                this._Fire(this._direction + -2);
            }
            else if (this.name == 'boss2') {
                this._simpleShot = false;
                this._Fire(this._direction - 2);
                this._Fire(this._direction - 4);
                this._Fire(this._direction);
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
//# sourceMappingURL=boss.js.map