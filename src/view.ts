import { GameState, AEntity, Bullet } from './model'

export interface IGameView {
  width: number
  height: number
  render(state: GameState): void
}

export class GameView implements IGameView {
  protected ctx: CanvasRenderingContext2D

  constructor(canvas, width = 600, height = 600) {
    canvas.width = width
    canvas.height = height
    this.ctx = canvas.getContext('2d')
  }

  /**
   * Renders the given game state
   */
  render(state: GameState) {
    this.renderBackgound(this.width, this.height)
    this.renderBullets(state.bullets)
    this.renderEntity(state.player)
  }
  /**
   * Renders the given entity using the given rendering context
   */
  private renderEntity(entity: AEntity) {
    this.ctx.fillStyle = entity.color
    let old_fill_color = this.ctx.fillStyle
    this.ctx.fillRect(
      entity.position.x - (entity.width / 2),
      entity.position.y - (entity.height / 2),
      entity.width,
      entity.height
    )
    this.ctx.fillStyle =  old_fill_color
  }

  /**
   * Renders the list of bullets
   */
  private renderBullets(bullets: Array<Bullet>) {
    for (let bullet of bullets) {
      this.renderEntity(bullet)
    }
  }


  /**
   * Given a context and the width and height of the canvas, draws the
   * background of the game
   */
  private renderBackgound(width, height) {
    let old_stroke_style = this.ctx.strokeStyle
    let old_fill_color = this.ctx.fillStyle
    let old_line_width = this.ctx.lineWidth

    this.ctx.clearRect(0, 0, width, height)

    this.ctx.fillStyle = '#001f3f'
    this.ctx.fillRect(0, 0, width, height)

    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle="#111111";
    this.ctx.strokeRect(0, 0, width, height);

    this.ctx.strokeStyle = old_stroke_style
    this.ctx.fillStyle =  old_fill_color
    this.ctx.lineWidth = old_line_width
  }

  get width() {
    return this.ctx.canvas.width
  }

  get height() {
    return this.ctx.canvas.height
  }
}
