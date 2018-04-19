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
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // Private Instance Variables
        // Public Properties
        // Constructors
        function Plane() {
            var _this = _super.call(this, "player") || this;
            _this.Start();
            return _this;
        }
        // Private Methods
        // Public Methods
        // Initialization
        Plane.prototype.Reset = function () {
        };
        Plane.prototype.CheckBounds = function () {
            // check the right boundary
            if (this.x >= 800 - this.halfWidth) {
                this.x = 800 - this.halfWidth;
            }
            // check the left boundary
            if (this.x <= this.halfWidth) {
                this.x = this.halfWidth;
            }
            // check the right boundary
            if (this.y >= 600 - this.halfHeight) {
                this.y = 600 - this.halfHeight;
            }
            // check the left boundary
            if (this.y <= this.halfHeight) {
                this.y = this.halfHeight;
            }
        };
        Plane.prototype.Move = function () {
            // mouse control
            this.x = managers.Game.stage.mouseX;
            // keyboard controls
            //if(objects.Game.keyboardManager.moveLeft) {
            //  this.x -= 6;
            //}
            //if(objects.Game.keyboardManager.moveRight) {
            //  this.x += 6;
            //}
            //if(objects.Game.keyboardManager.moveForward) {
            //  this.y -= 6;
            //}
            //if(objects.Game.keyboardManager.moveBackward) {
            //  this.y += 6;
            //}
        };
        Plane.prototype.Start = function () {
            this.x = 400;
            this.y = 530;
        };
        // Updates the Object every frame
        Plane.prototype.Update = function () {
            this.Move();
            this.CheckBounds();
        };
        Plane.prototype.BulletFire = function (double) {
            if (double === void 0) { double = false; }
            var currentBullet = managers.Game.bulletManger.CurrentBullet;
            var dx = 0;
            if (double && (currentBullet + 1) % 2 == 0) {
                dx = 10;
            }
            else if (double && (currentBullet + 1) % 2 != 0) {
                dx = -10;
            }
            managers.Game.bulletManger.Bullets[currentBullet].x = managers.Game.plane.x + dx;
            managers.Game.bulletManger.Bullets[currentBullet].y = managers.Game.plane.y - 30;
            managers.Game.bulletManger.CurrentBullet++;
            if (managers.Game.bulletManger.CurrentBullet > 49) {
                managers.Game.bulletManger.CurrentBullet = 0;
            }
            var planeShotSound = createjs.Sound.play("planeShot");
            //planeShotSound.volume = 0.1;
        };
        Plane.prototype.BulletCombo = function () {
            this.BulletFire(true);
            this.BulletFire(true);
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=plane.js.map