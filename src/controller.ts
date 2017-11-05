import { GameState, Vector2D } from './model'
import { GameView } from './view'
import * as KeyJS from 'key-js'

export class GameController {
  state: GameState
  view: GameView
  interval
  last: Date
  constructor(state, view) {
    this.state = state
    this.view = view
    KeyJS.startCapture();
    this.start(1000/60)
    this.last = new Date()
  }

  private start(rate) {
    this.interval = setInterval(() => {this.tick(this.dt)}, rate)
  }

  private stop() {
    clearInterval(this.interval)
  }

  get dt() {
    let now = new Date()
    let last = this.last
    this.last = now
    return now.getTime() - last.getTime()
  }
  /**
   * Handles player input
   */
  handleKeyPress() {
    let move_by = 2
    let move = new Vector2D(0, 0)
    if(KeyJS.isDown(KeyJS.UP)) {
      move = move.add(new Vector2D(0, -1))
    }
    if(KeyJS.isDown(KeyJS.DOWN)) {
      move = move.add(new Vector2D(0, 1))
    }
    if(KeyJS.isDown(KeyJS.RIGHT)) {
      move = move.add(new Vector2D(1, 0))
    }
    if(KeyJS.isDown(KeyJS.LEFT)) {
      move = move.add(new Vector2D(-1, 0))
    }
    if(KeyJS.isDown(KeyJS.A)) {
      this.state.spawnBullet(new Vector2D(Math.random() * this.view.width, Math.random() * this.view.height), 1/10, 6, 6)
    }
    this.state.movePlayer(move.normalize().mult(move_by), this.view.width, this.view.height)
  }


  /**
   * Handles Collisions between entities
   * TODO: Replace with less naive and more general SpacialHash
   */
  handleCollisions() {
    let player = this.state.player
    for(let bullet of this.state.bullets) {
      if(bullet.isColliding(player)) {
        bullet.onCollide(player)
        player.onCollide(bullet)
      }
    }
  }

  tick(dt) {
    this.handleKeyPress()
    this.state.updateEntities(dt)
    this.state.removeOutOfBounds(this.view.width, this.view.height)
    this.handleCollisions()
    this.view.render(this.state)
    console.log(this.state.bullets.length)
  }
}
