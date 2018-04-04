var managers;
(function (managers) {
    var PlaneBullet = /** @class */ (function () {
        // constructors
        function PlaneBullet(assetManager) {
            this._assetManager = assetManager;
            this.Start();
        }
        // private methods
        PlaneBullet.prototype._buildBulletPool = function () {
            for (var count = 0; count < this._bulletCount; count++) {
                this.Bullets[count] = new objects.PlaneBullet(this._assetManager);
            }
        };
        // public methods
        PlaneBullet.prototype.Start = function () {
            // set the default bullet count
            this._bulletCount = 50;
            // create the bullet container
            this.Bullets = new Array();
            // build bullet array
            this._buildBulletPool();
            // set the Current Bullet to 0
            this.CurrentBullet = 0;
        };
        PlaneBullet.prototype.Update = function () {
            this.Bullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        return PlaneBullet;
    }());
    managers.PlaneBullet = PlaneBullet;
})(managers || (managers = {}));
//# sourceMappingURL=planeBulletManager.js.map