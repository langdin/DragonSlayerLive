var managers;
(function (managers) {
    var Collision = /** @class */ (function () {
        function Collision() {
        }
        //TODO collision with 3rd boss // add object2 type
        Collision.Check = function (object1, object2) {
            // define points for both object1 and object2
            var P1 = new math.Vec2(object1.x, object1.y);
            var P2 = new math.Vec2(object2.x, object2.y);
            if (object2.name == "boss1" || object2.name == "boss2") {
                P2 = new math.Vec2(object2.x, object2.y - 99);
            }
            // check if there is a collision
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                    var explosion = void 0;
                    switch (object2.name) {
                        case "player":
                            if (managers.Game.scoreBoardManager.Lives > 0) {
                                managers.Game.scoreBoardManager.Lives -= 1;
                                explosion = new objects.smallExplosion();
                                explosion.x = object1.x;
                                explosion.y = object1.y;
                                managers.Game.currentSceneObject.addChild(explosion);
                                createjs.Sound.play("explosion");
                                managers.Game.upgrade = false;
                            }
                            break;
                        case "dragon":
                            managers.Game.scoreBoardManager.Score += 100;
                            explosion = new objects.smallExplosion();
                            explosion.x = object2.x;
                            explosion.y = object2.y;
                            managers.Game.currentSceneObject.addChild(explosion);
                            createjs.Sound.play("explosion");
                            break;
                        case "gem":
                            managers.Game.scoreBoardManager.Score += 300;
                            managers.Game.upgrade = true;
                            break;
                        case "heart":
                            if (managers.Game.scoreBoardManager.Lives > 0 && managers.Game.scoreBoardManager.Lives < 5) {
                                managers.Game.scoreBoardManager.Score += 300;
                                managers.Game.scoreBoardManager.Lives += 1;
                            }
                            break;
                        case "boss1":
                        case "boss2":
                            managers.Game.scoreBoardManager.Score += 200;
                            explosion = new objects.smallExplosion();
                            explosion.x = object1.x;
                            explosion.y = object1.y;
                            managers.Game.currentSceneObject.addChild(explosion);
                            createjs.Sound.play("explosion");
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