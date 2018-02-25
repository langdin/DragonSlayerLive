module managers {
  export class ScoreBoard {
    // private instance variables
    private _score: number;
    private _lives: number;
    private _highScore: number;

    // public instance variables
    public LivesLabel: objects.Label;
    public ScoreLabel: objects.Label;
    public HighScoreLabel: objects.Label;

    // public properties
    get Score():number {
      return this._score;
    }

    set Score(newScore: number) {
      this._score = newScore;
      this.ScoreLabel.text = "Score: " + this._score;
    }

    get Lives():number {
      return this._lives;
    }

    set Lives(newLives: number) {
      this._lives = newLives;
      this.LivesLabel.text = "Lives: " + this._lives;
    }

    get HighScore():number {
      return this._highScore;
    }

    set HighScore(newHighScore: number) {
      this._highScore = newHighScore;
      this.HighScoreLabel.text = "High Score: " + this._highScore;
    }

    // constructors
    constructor() {
      this._initialize();
    }

    // private methods
    private _initialize():void {
      this.LivesLabel = new objects.Label("Lives: 0", "20px", "Consolas", "#FFFF00", 10, 10, false);
      this.ScoreLabel = new objects.Label("Score: 99999", "20px", "Consolas", "#FFFF00", 680, 10, false);
      this.HighScoreLabel = new objects.Label("High Score: 99999", "40px", "Consolas", "#FFFF00", 320, 140, true);

      this.Score = 0;
      this.Lives = 5;
      this.HighScore = 0;
    }

    // public methods
  }
}
