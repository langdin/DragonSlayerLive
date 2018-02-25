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
    var Dragon = /** @class */ (function (_super) {
        __extends(Dragon, _super);
        // Private Instance Variables
        // Public Properties
        // Constructors
        function Dragon(assetManager, xPos) {
            var _this = _super.call(this, assetManager, "dragon") || this;
            _this.x = xPos;
            _this.Start();
            return _this;
        }
        // Private Methods
        // Public Methods
        // Initialization
        Dragon.prototype.Move = function () {
            if (this.y < 100) {
                this.y += 7;
            }
        };
        Dragon.prototype.Start = function () {
            this.y = -100;
        };
        // Updates the Object every frame
        Dragon.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        return Dragon;
    }(objects.GameObject));
    objects.Dragon = Dragon;
})(objects || (objects = {}));
//# sourceMappingURL=dragon.js.map