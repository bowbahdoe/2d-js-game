import { GameState, AEntity, Bullet } from './model'


/**
 * Renders the given entity using the given rendering context
 */
function renderEntity(ctx: CanvasRenderingContext2D, entity: AEntity) {
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
  let old_stroke_style = ctx.strokeStyle
  let old_line_width = ctx.lineWidth

  ctx.lineWidth = 2;
  ctx.strokeStyle="#111111";
  ctx.clearRect(0, 0, width, height)
  ctx.strokeRect(0, 0, width, height);

  ctx.strokeStyle = old_stroke_style
  ctx.lineWidth = old_line_width
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
