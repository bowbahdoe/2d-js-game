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
