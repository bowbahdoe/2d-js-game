import { PlayerShip, Bullet } from './entity'
import { Vector2D } from './vector2d'

export class GameState {
  player: PlayerShip
  bullets: Array<Bullet>

  constructor(player?: PlayerShip, bullets?: Array<Bullet>) {
    this.player = player || new PlayerShip(new Vector2D(0, 0))
    this.bullets = bullets || []
  }

  spawnBullet(location: Vector2D, speed: number, width: number = 1, height: number = 1) {
    let direction = location.sub(this.player.position).normalize()
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
}
