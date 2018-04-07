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
//# sourceMappingURL=fireBullet.js.map