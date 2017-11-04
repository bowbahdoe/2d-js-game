import { Vector2D } from './vector2d'

export class Entity {
  position: Vector2D
  visible: boolean
  width: number
  height: number
  color: string

  constructor(position: Vector2D, width: number, height: number, color='black') {
    this.position = position
    this.width = width
    this.height = height
    this.visible = true
    this.color = color
  }

  move(amount: Vector2D) {
    this.position = this.position.add(amount)
  }

  isColliding(other: Entity) {
    return this.position.x < other.position.x + other.width &&
      this.position.x + this.width > other.position.x &&
      this.position.y < other.position.y + other.height &&
      this.position.y + this.height > other.position.y
  }
}

export class PlayerShip extends Entity {
  health: number
  private maxHealth: number

  constructor(position: Vector2D, width: number = 15, height: number = 15, maxHealth: number = 100) {
    super(position, width, height, 'blue')
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
}

export class Bullet extends Entity {
  velocity: Vector2D
  constructor(position: Vector2D, width: number, height: number, velocity: Vector2D) {
    super(position, width, height, "#FF0000")
    this.velocity = velocity
  }
}
