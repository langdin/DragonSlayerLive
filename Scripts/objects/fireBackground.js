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
    var FireBackground = /** @class */ (function (_super) {
        __extends(FireBackground, _super);
        // Public Properties
        // Constructors
        function FireBackground(assetManager) {
            var _this = _super.call(this, assetManager.getResult("fireBackground")) || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        FireBackground.prototype._reset = function () {
            this.y = -400;
        };
        FireBackground.prototype._checkBounds = function () {
            if (this.y >= 0) {
                this._reset();
            }
        };
        FireBackground.prototype._move = function () {
            if (objects.Game.scoreBoardManager.Score < 2000) {
                this.y += this._dy;
            }
        };
        // Public Methods
        // Initialization
        FireBackground.prototype.Start = function () {
            this._dy = 5; // move 5 pixels down every frame
            this._reset();
        };
        // Updates the Object every frame
        FireBackground.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        return FireBackground;
    }(createjs.Bitmap));
    objects.FireBackground = FireBackground;
})(objects || (objects = {}));
//# sourceMappingURL=fireBackground.js.map