module objects {
    export class BossBullet extends objects.GameObject {
        // Private Instance Variables
        private _direction: number;
        // Public Properties
        public simpleShot: boolean;

        // Constructors
        constructor() {
            super("bossBullet");
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
            if(this.x != -1000) {
                if(this.simpleShot) {
                    this._dy = 7;
                    this.x = this.x + this._direction;
                } else {
                    this._dy = 3;
                    let ticker: number = createjs.Ticker.getTicks();
                    if(ticker % 2 == 0) {
                        this.x = this.x + 15*Math.sin(ticker / 10) + this._direction;
                    }
                }
            }
            this.y += this._dy;
        }

        public Start(): void {
            this._dy = 3;
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
