module objects {
    export class FireBullet extends objects.GameObject {
        // Private Instance Variables

        // Public Properties


        // Constructors
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "fireBullet");
            this.Start();
        }

        // Private Methods

        // Public Methods

        // Initialization
        public Reset(): void {
            this.x = - 1000;
            this.y = - 1000;
        }

        public CheckBounds(): void {
            if(this.y >= this.height + 600) {
                this.Reset();
            }
        }

        public Move(): void {
            this.y += this._dy;
        }

        public Start(): void {
            this._dy = 6;
            this.Reset();
        }

        // Updates the Object every frame
        public Update(): void {
            this.Move();

        }

    }
}
