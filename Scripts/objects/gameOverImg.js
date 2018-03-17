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
    var GameOverImg = /** @class */ (function (_super) {
        __extends(GameOverImg, _super);
        // Private Instance Variables
        // Public Properties
        // Constructors
        function GameOverImg(assetManager) {
            var _this = _super.call(this, assetManager.getResult("gameOverImg")) || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        GameOverImg.prototype._reset = function () {
        };
        GameOverImg.prototype._checkBounds = function () {
        };
        GameOverImg.prototype._move = function () {
        };
        // Public Methods
        // Initialization
        GameOverImg.prototype.Start = function () {
            this.x = 170;
            this.y = 150;
        };
        // Updates the Object every frame
        GameOverImg.prototype.Update = function () {
        };
        return GameOverImg;
    }(createjs.Bitmap));
    objects.GameOverImg = GameOverImg;
})(objects || (objects = {}));
//# sourceMappingURL=gameOverImg.js.map