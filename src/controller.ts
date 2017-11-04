import { GameState, Vector2D } from './models'
import { GameView } from './view'
import * as KeyJS from 'key-js'

export class GameController {
  state: GameState
  view: GameView
  interval

  constructor(state, view) {
    this.state = state
    this.view = view
    KeyJS.startCapture();
    this.start(1000/60)
  }

  private start(rate) {
    this.interval = setInterval(this.tick.bind(this), rate)
  }

  private stop() {
    clearInterval(this.interval)
  }

  handleKeyPress() {
    let move_by = 5
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

    this.state.movePlayer(move.normalize().mult(move_by), this.view.width, this.view.height)
  }

  tick() {
    this.handleKeyPress()
    this.view.render(this.state)
  }
}
