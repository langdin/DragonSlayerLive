module objects {
    export class PlaneBullet extends objects.GameObject {
        // Private Instance Variables
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
        }

        public Start(): void {
            this._dy = 8;
            this.Reset();
        }

        // Updates the Object every frame
        public Update(): void {
            this.Move();
        }

    }
}
