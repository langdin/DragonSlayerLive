module objects {
  export class Game {
    public static stage: createjs.Stage;
    public static assetManager: createjs.LoadQueue;
    public static currentScene: number;
    public static keyboardManager: managers.Keyboard;
    public static scoreBoardManager: managers.ScoreBoard;
    public static plane: objects.Plane;
    public static planeBulletManger: managers.PlaneBullet;
  }
}
