import { GameState, Entity, Bullet } from './model'


/**
 * Renders the given entity using the given rendering context
 */
function renderEntity(ctx: CanvasRenderingContext2D, entity: Entity) {
  let old_fill_color = ctx.fillStyle
  ctx.fillStyle = entity.color
  ctx.fillRect(
    entity.position.x - (entity.width / 2),
    entity.position.y - (entity.height / 2),
    entity.width,
    entity.height
  )
  ctx.fillStyle =  old_fill_color
}

/**
 * Renders the list of bullets
 */
function renderBullets(ctx, bullets: Array<Bullet>) {
  for (let bullet of bullets) {
    renderEntity(ctx, bullet)
  }
}


/**
 * Given a context and the width and height of the canvas, draws the
 * background of the game
 */
function renderBackgound(ctx: CanvasRenderingContext2D, width, height) {
  ctx.clearRect(0, 0, width, height)
}

export class GameView {
  ctx: CanvasRenderingContext2D
  width: number
  height: number

  constructor(canvas, width = 600, height = 600) {
    canvas.width = width
    canvas.height = height
    this.width = width
    this.height = height
    this.ctx = canvas.getContext('2d')
  }

  /**
   * Renders the given game state
   */
  render(state: GameState) {
    renderBackgound(this.ctx, this.width, this.height)
    renderBullets(this.ctx, state.bullets)
    renderEntity(this.ctx, state.player)
  }
}
