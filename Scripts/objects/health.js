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
//# sourceMappingURL=health.js.map