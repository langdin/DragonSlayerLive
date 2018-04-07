module managers {
  export class Collision {


    public static Check(object1: objects.GameObject, object2: objects.GameObject): boolean {
      // define points for both object1 and object2
      let P1 = new math.Vec2(object1.x, object1.y);
      let P2 = new math.Vec2(object2.x, object2.y);
      // check if there is a collision
      if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
        if (!object2.isColliding) {
          object2.isColliding = true;
          let explosion: objects.smallExplosion;
          switch (object2.name) {
            case "player":
              managers.Game.scoreBoardManager.Lives -= 1;
              explosion = new objects.smallExplosion("smallexplosion");
              explosion.x = object1.x;
              explosion.y = object1.y;
              managers.Game.currentSceneObject.addChild(explosion);
              break;
            case "dragon":
              managers.Game.scoreBoardManager.Score += 100;
              explosion = new objects.smallExplosion("smallexplosion");
              explosion.x = object2.x;
              explosion.y = object2.y;
              managers.Game.currentSceneObject.addChild(explosion);
              break;
            case "boss1":
            case "boss2":
              managers.Game.scoreBoardManager.Score += 200;
              explosion = new objects.smallExplosion("smallexplosion");
              explosion.x = object1.x;
              explosion.y = object1.y;
              managers.Game.currentSceneObject.addChild(explosion);
              break;
          }
          return true;
        }
      }
      else {
        object2.isColliding = false;
        return false;
      }
    }
  }
}
