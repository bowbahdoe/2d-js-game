import { remove, partial, negate } from 'lodash'

import { AEntity, PlayerShip, Bullet } from './entity'
import { Vector2D } from './vector2d'

export class GameState {
  player: PlayerShip
  bullets: Array<Bullet>

  constructor(player?: PlayerShip, bullets?: Array<Bullet>) {
    this.player = player || new PlayerShip(new Vector2D(0, 0), 1, 1, 100)
    this.bullets = bullets || []
  }


  /**
   * Spawns a bullet at the given location with the given speed. The bullet
   * will spawn with a velocity of magnitude speed towards the player
   */
  spawnBullet(location: Vector2D, speed: number = 0, width: number = 1, height: number = 1) {
    let direction = this.player.position.sub(location).normalize()
    let velocity = direction.mult(speed)
    this.bullets.push(new Bullet(location, width, height, velocity))
  }


  /**
   * Moves the player by the given vector. Will stop the player from going into
   * negative coordinates and will stop the player from going beyond maxX and
   * maxY
   */
  movePlayer(amount: Vector2D, maxX = Infinity, maxY = Infinity) {
    let temp = amount.add(this.player.position)
    if (temp.x > maxX || temp.x < 0) {
      amount = new Vector2D(0, amount.y)
    }
    if (temp.y > maxY || temp.y < 0) {
      amount = new Vector2D(amount.x, 0)
    }
    this.player.move(amount)
  }

  updateEntities(dt: number) {
    for(let bullet of this.bullets) {
      bullet.update(dt)
    }
    this.player.update(dt)
  }


  /**
   * Removes any bullets that are off screen from the lsit of bullets
   */
  removeOutOfBounds(width: number, height: number) {
    remove(this.bullets,
           negate(partial(isOutOfBounds, partial.placeholder, width, height)))
  }
}



/**
 * Given the width and height of the screen, returns if the given entity is
 * off screen
 */
function isOutOfBounds(entity: AEntity, width: number, height: number) {
  let { width: w, height: h } = entity
  let { x, y } = entity.position
  return x + w > 0 && y + h > 0 && x - w < width && y - h < height
}
