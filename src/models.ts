export class Vector2D {
  readonly x: number
  readonly y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * adds the x and y values of this vector by the given vector, returns a new one
   */
  add(other: number | Vector2D): Vector2D {
    if(other instanceof Vector2D) {
      return new Vector2D(this.x + other.x, this.y + other.y)
    }
    else {
      return new Vector2D(this.x + other, this.y + other)
    }
  }

  /**
   * subtracts the x and y of this vector by the given vector, returns a new one
   */
  sub(other: number | Vector2D): Vector2D {
    if(other instanceof Vector2D) {
      return new Vector2D(this.x - other.x, this.y - other.y)
    }
    else {
      return this.add(-other)
    }
  }


  /**
   * multiplies the x and y values of this vector by the given multiple
   */
  mult(other: number | Vector2D): Vector2D {
    if(other instanceof Vector2D) {
      return new Vector2D(this.x * other.x, this.y * other.y)
    }
    else {
      return new Vector2D(this.x * other, this.y * other)
    }
  }

  /**
   * normalizes the vector
   */
  normalize(): Vector2D {
    let size = this.size
    if(size == 0) {
      return this
    }
    return new Vector2D(this.x / size, this.y / size)
  }

  /**
   *   gets the size of the vector
   */
  get size(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }
}

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
