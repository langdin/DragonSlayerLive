var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        // constructors
        function Bullet() {
            this.Start();
        }
        // private methods
        Bullet.prototype._buildBulletPool = function () {
            for (var count = 0; count < this._bulletCount; count++) {
                this.Bullets[count] = new objects.PlaneBullet();
            }
            for (var count = 0; count < this._dragonBulletCount; count++) {
                this.DragonBullets[count] = new objects.FireBullet();
            }
            for (var count = 0; count < this._bossBulletCount; count++) {
                this.BossBullets[count] = new objects.BossBullet();
            }
        };
        // public methods
        Bullet.prototype.Start = function () {
            // set the default bullet count
            this._bulletCount = 50;
            this._dragonBulletCount = 50;
            this._bossBulletCount = 30;
            // create the bullet container
            this.Bullets = new Array();
            this.DragonBullets = new Array();
            this.BossBullets = new Array();
            // build bullet array
            this._buildBulletPool();
            // set the Current Bullet to 0
            this.CurrentBullet = 0;
        };
        Bullet.prototype.Update = function () {
            this.Bullets.forEach(function (bullet) {
                bullet.Update();
            });
            this.DragonBullets.forEach(function (bullet) {
                bullet.Update();
            });
            this.BossBullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=bulletManager.js.map