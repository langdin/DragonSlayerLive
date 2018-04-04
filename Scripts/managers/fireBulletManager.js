var managers;
(function (managers) {
    var FireBullet = /** @class */ (function () {
        // constructors
        function FireBullet(assetManager) {
            this._assetManager = assetManager;
            this.Start();
        }
        // private methods
        FireBullet.prototype._buildBulletPool = function () {
            for (var count = 0; count < this._bulletCount; count++) {
                this.Bullets[count] = new objects.FireBullet(this._assetManager);
            }
        };
        // public methods
        FireBullet.prototype.Start = function () {
            // set the default bullet count
            this._bulletCount = 20;
            // create the bullet container
            this.Bullets = new Array();
            // build bullet array
            this._buildBulletPool();
            // set the Current Bullet to 0
            this.CurrentBullet = 0;
        };
        FireBullet.prototype.Update = function () {
            this.Bullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        return FireBullet;
    }());
    managers.FireBullet = FireBullet;
})(managers || (managers = {}));
//# sourceMappingURL=fireBulletManager.js.map