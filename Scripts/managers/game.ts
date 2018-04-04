module managers {
    export class Game {
        public static stage: createjs.Stage;
        public static assetManager: createjs.LoadQueue;
        public static currentScene: number;
        public static currentSceneObject: objects.Scene;
        public static keyboardManager: managers.Keyboard;
        public static scoreBoardManager: managers.ScoreBoard;
        public static HighScore: number = 0;
        public static plane: objects.Plane;
        public static bulletManger: managers.Bullet;
    }
}
