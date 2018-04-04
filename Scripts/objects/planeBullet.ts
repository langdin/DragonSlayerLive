module objects {
    export class PlaneBullet extends objects.GameObject {
        // Private Instance Variables

        // Public Properties


        // Constructors
        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager, "planeBullet");
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

        public SetXY(x:number, y:number):void {
            this.x = x;
            this.y = y;
        }

        public Move(): void {
            this.y -= this._dy;
        }

        public Start(): void {
            this._dy = 10;
            this.Reset();
        }

        // Updates the Object every frame
        public Update(): void {
            this.Move();
        }

    }
}
