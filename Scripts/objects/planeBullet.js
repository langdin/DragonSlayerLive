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
    var PlaneBullet = /** @class */ (function (_super) {
        __extends(PlaneBullet, _super);
        // Private Instance Variables
        // Public Properties
        // Constructors
        function PlaneBullet(assetManager) {
            var _this = _super.call(this, assetManager, "planeBullet") || this;
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
            this._dy = 10;
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
//# sourceMappingURL=planeBullet.js.map