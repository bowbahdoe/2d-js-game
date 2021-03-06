/**
 * starting point for execution of the game
 */
import { GameView } from './view'
import { GameState, PlayerShip, Vector2D } from './model'
import { GameController } from './controller'

function startGame(canvas) {
  let state = new GameState(new PlayerShip(new Vector2D(canvas.width / 3, canvas.height / 3), 15, 15, 100))
  let view = new GameView(canvas)
  let controller = new GameController(state, view)
}

export function run(mount_id: string) {
  let mount = document.getElementById(mount_id)
  if (mount === null) {
    throw new Error('cannot find mount')
  }
  else {
    mount.innerHTML = '<canvas id=render></canvas>'
    let canvas = document.getElementById('render') as any
    startGame(canvas)
  }
}

run('mount')
