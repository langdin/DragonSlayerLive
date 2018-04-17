module objects {
    export class PlaneBullet extends objects.GameObject {
        // Private Instance Variables
        private _direction: number;
        // Public Properties


        // Constructors
        constructor() {
            super("planeBullet");
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
            this.y -= this._dy;
            this.x += this._direction;
        }

        public Start(): void {
            this._dy = 8;
            this._direction = 0;
            this.Reset();
        }

        // Updates the Object every frame
        public Update(): void {
            this.Move();
        }

        public SetDirection(dir: number = 0):void {
            this._direction = dir;
        }

    }
}
