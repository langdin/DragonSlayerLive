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
//# sourceMappingURL=smallExplosion.js.map