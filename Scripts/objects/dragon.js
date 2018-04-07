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
                this.x = (Math.random() * (160 - this.width)) + this.halfWidth + this._posX;
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
            this._dy = 2;
            this._currentBullet = this._posX / 160;
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
            if (this._currentBullet > 19) {
                this._currentBullet = this._posX / 160;
            }
        };
        return Dragon;
    }(objects.GameObject));
    objects.Dragon = Dragon;
})(objects || (objects = {}));
//# sourceMappingURL=dragon.js.map