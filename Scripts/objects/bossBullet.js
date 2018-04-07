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
                    this.x = this.x + this._direction;
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
//# sourceMappingURL=bossBullet.js.map