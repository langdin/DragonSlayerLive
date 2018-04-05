module objects {
    export class BossBullet extends objects.GameObject {
        // Private Instance Variables
        private _direction: number;
        // Public Properties


        // Constructors
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "bossBullet");
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
            if(this.y <= - this.height) {
                this.Reset();
            }
        }

        public Move(): void {
            this.y += this._dy;
            if(this.x != -1000) {
                this.x = this.x + this._direction;
            }
        }

        public Start(): void {
            this._dy = 6;
            this.Reset();
        }

        // Updates the Object every frame
        public Update(): void {
            this.Move();
        }

        public SetDirectoin(direction:number): void {
            this._direction = direction;
        }

    }
}
