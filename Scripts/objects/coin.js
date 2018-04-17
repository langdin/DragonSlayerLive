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
            this.y += 2;
        };
        Coin.prototype.Reset = function () {
            this.x = -1000;
            this.y = -1000;
        };
        return Coin;
    }(createjs.Bitmap));
    objects.Coin = Coin;
})(objects || (objects = {}));
//# sourceMappingURL=coin.js.map