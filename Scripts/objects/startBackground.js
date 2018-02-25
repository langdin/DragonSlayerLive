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
    var StartBackground = /** @class */ (function (_super) {
        __extends(StartBackground, _super);
        // Private Instance Variables
        // Public Properties
        // Constructors
        function StartBackground(assetManager) {
            var _this = _super.call(this, assetManager.getResult("startBackground")) || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        StartBackground.prototype._reset = function () {
        };
        StartBackground.prototype._checkBounds = function () {
        };
        StartBackground.prototype._move = function () {
        };
        // Public Methods
        // Initialization
        StartBackground.prototype.Start = function () {
        };
        // Updates the Object every frame
        StartBackground.prototype.Update = function () {
        };
        return StartBackground;
    }(createjs.Bitmap));
    objects.StartBackground = StartBackground;
})(objects || (objects = {}));
//# sourceMappingURL=startBackground.js.map