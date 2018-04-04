module managers {
    export class PlaneBullet {
        // private instance variables
        private _bulletCount: number;
        private _assetManager: createjs.LoadQueue;

        // public properties
        public Bullets: objects.PlaneBullet[];
        public CurrentBullet: number;

        // constructors
        constructor(assetManager: createjs.LoadQueue) {
            this._assetManager = assetManager;
            this.Start();
        }

        // private methods
        private _buildBulletPool(): void {
            for (let count = 0; count < this._bulletCount; count++) {
                this.Bullets[count] = new objects.PlaneBullet(this._assetManager);
            }
        }

        // public methods
        public Start(): void {
            // set the default bullet count
            this._bulletCount = 50;

            // create the bullet container
            this.Bullets = new Array<objects.PlaneBullet>();

            // build bullet array
            this._buildBulletPool();

            // set the Current Bullet to 0
            this.CurrentBullet = 0;
        }

        public Update(): void {
            this.Bullets.forEach(bullet => {
                bullet.Update();
            });
        }


    }
}
