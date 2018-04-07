module managers {
    export class Bullet {
        // private instance variables
        private _bulletCount: number;
        private _dragonBulletCount: number;
        private _bossBulletCount: number;

        // public properties
        public Bullets: objects.PlaneBullet[];
        public DragonBullets: objects.FireBullet[];
        public BossBullets: objects.BossBullet[];
        public CurrentBullet: number;

        // constructors
        constructor() {
            this.Start();
        }

        // private methods
        private _buildBulletPool(): void {
            for (let count = 0; count < this._bulletCount; count++) {
                this.Bullets[count] = new objects.PlaneBullet();
            }

            for (let count = 0; count < this._dragonBulletCount; count++) {
                this.DragonBullets[count] = new objects.FireBullet();
            }

            for (let count = 0; count < this._bossBulletCount; count++) {
                this.BossBullets[count] = new objects.BossBullet();
            }
        }

        // public methods
        public Start(): void {
            // set the default bullet count
            this._bulletCount = 50;
            this._dragonBulletCount = 30;
            this._bossBulletCount = 30;
            // create the bullet container
            this.Bullets = new Array<objects.PlaneBullet>();
            this.DragonBullets = new Array<objects.FireBullet>();
            this.BossBullets = new Array<objects.BossBullet>();

            // build bullet array
            this._buildBulletPool();

            // set the Current Bullet to 0
            this.CurrentBullet = 0;
        }

        public Update(): void {
            this.Bullets.forEach(bullet => {
                bullet.Update();
            });
            this.DragonBullets.forEach(bullet => {
                bullet.Update();
            });
            this.BossBullets.forEach(bullet => {
                bullet.Update();
            });
        }


    }
}
