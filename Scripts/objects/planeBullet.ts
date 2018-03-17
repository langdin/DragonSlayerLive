module objects {
    export class PlaneBullets extends objects.GameObject {
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
        }

        public CheckBounds(): void {
            if(this.y == 0 - this.height) {
                this.x == 900;
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
        }

        // Updates the Object every frame
        public Update(): void {
            this.Move();
        }

    }
}
