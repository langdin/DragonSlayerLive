var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        Collision.Check = function (object1, object2) {
            // define points for both object1 and object2
            var P1 = new math.Vec2(object1.x, object1.y);
            var P2 = new math.Vec2(object2.x, object2.y);
            // check if there is a collision
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                    switch (object2.name) {
                        case "player":
                            managers.Game.scoreBoardManager.Lives -= 1;
                            break;
                        case "dragon":
                            managers.Game.scoreBoardManager.Score += 100;
                            break;
                        case "boss1":
                            managers.Game.scoreBoardManager.Score += 200;
                            break;
                        case "boss2":
                            managers.Game.scoreBoardManager.Score += 200;
                            break;
                    }
                    return true;
                }
            }
            else {
                object2.isColliding = false;
                return false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map