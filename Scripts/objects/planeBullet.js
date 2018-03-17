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
    var PlaneBullets = /** @class */ (function (_super) {
        __extends(PlaneBullets, _super);
        // Private Instance Variables
        // Public Properties
        // Constructors
        function PlaneBullets(assetManager) {
            var _this = _super.call(this, assetManager, "planeBullet") || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        // Public Methods
        // Initialization
        PlaneBullets.prototype.Reset = function () {
        };
        PlaneBullets.prototype.CheckBounds = function () {
            if (this.y == 0 - this.height) {
                this.x == 900;
            }
        };
        PlaneBullets.prototype.SetXY = function (x, y) {
            this.x = x;
            this.y = y;
        };
        PlaneBullets.prototype.Move = function () {
            this.y -= this._dy;
        };
        PlaneBullets.prototype.Start = function () {
            this._dy = 10;
        };
        // Updates the Object every frame
        PlaneBullets.prototype.Update = function () {
            this.Move();
        };
        return PlaneBullets;
    }(objects.GameObject));
    objects.PlaneBullets = PlaneBullets;
})(objects || (objects = {}));
//# sourceMappingURL=planeBullet.js.map