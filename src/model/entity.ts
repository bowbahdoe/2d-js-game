import { Vector2D } from './vector2d'
import { IHitbox, ICollidable, isColliding } from './collisions'

export abstract class AEntity implements ICollidable {
  position: Vector2D
  width: number
  height: number
  color: string

  constructor(position: Vector2D, width: number, height: number, color='black') {
    this.position = position
    this.width = width
    this.height = height
    this.color = color
  }

  move(amount: Vector2D) {
    this.position = this.position.add(amount)
  }

  isColliding(other: AEntity) {
    return isColliding(this.hitbox, other.hitbox)
  }

  get hitbox(): IHitbox {
    return {
      location: this.position.sub(new Vector2D(this.width/2, this.height/2)),
      width: this.width,
      height: this.height
    }
  }

  abstract onCollide(other: ICollidable)

  abstract update(dt: number)
}

export class PlayerShip extends AEntity {
  health: number
  private maxHealth: number

  constructor(position: Vector2D, width, height, maxHealth) {
    super(position, width, height, '#0074D9')
    this.health = maxHealth
    this.maxHealth = maxHealth
  }


  /**
   * Reduces the players health by the given amount
   * amount must be positive
   */
  damage(amount: number) {
    this.health = (this.health - Math.abs(amount)) % this.maxHealth
    if (this.health < 0) {
      this.health = 0
    }
  }

  /**
   * Increases the players health by the given amount
   * amount must be positive
  */
  heal(amount: number) {
    this.health = (this.health + Math.abs(amount))
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth
    }
  }

  onCollide(other: ICollidable) {

  }

  update(dt: number) {

  }
}

export class Bullet extends AEntity {
  velocity: Vector2D
  constructor(position: Vector2D, width: number, height: number, velocity: Vector2D) {
    super(position, width, height, "#FF4136")
    this.velocity = velocity
  }

  onCollide(other: ICollidable) {
    this.velocity = this.velocity.mult(-3)
  }

  update(dt: number) {
    this.move(this.velocity.mult(dt))
  }
}
