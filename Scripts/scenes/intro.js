var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Intro = /** @class */ (function (_super) {
        __extends(Intro, _super);
        // Public Properties
        // Constructor
        function Intro(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        // Private Mathods
        Intro.prototype._StartButtonClick = function () {
            managers.Game.fade = true;
            //this._load.graphics.beginFill("red").drawRect(0, 0, 30, 200);
        };
        // Public Methods
        // Initialize Game Variables and objects
        Intro.prototype.Start = function () {
            this._load = new createjs.Shape();
            this._load.x = 20;
            this._load.y = 400;
            this._startButton = new objects.Button("nextButton", 400, 510);
            this._startBackground = new createjs.Bitmap(this.assetManager.getResult("introduction"));
            managers.Game.fade = false;
            this.Main();
        };
        Intro.prototype.Update = function () {
            if (managers.Game.fade) {
                this.alpha -= 0.025;
            }
            if (this.alpha <= 0) {
                managers.Game.currentScene = config.Scene.INSTRUCTION;
            }
            var ticker = createjs.Ticker.getTicks();
            var i = ticker * 5;
            //this._load.graphics.beginFill("#C33").setStrokeStyle(3).beginStroke("rgba(232,230,231, 1)")
            //.drawRect(0, 0, 30, -200+(i*5));
        };
        // This is where the fun happens
        Intro.prototype.Main = function () {
            // add background of this page
            this.addChild(this._startBackground);
            // add title image
            // add the startButton to the scene
            this.addChild(this._startButton);
            this.addChild(this._load);
            this._startButton.on("click", this._StartButtonClick);
        };
        return Intro;
    }(objects.Scene));
    scenes.Intro = Intro;
})(scenes || (scenes = {}));
//# sourceMappingURL=intro.js.map