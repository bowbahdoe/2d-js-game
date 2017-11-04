import { Vector2D } from './vector2d'
import { maxBy } from 'lodash'
import DefaultMap from './default_map'

export interface IHitbox {
  width: number,
  height: number
  location: Vector2D
}

export interface ICollidable {
  hitbox: IHitbox
  onCollide(other: ICollidable)
}

export function isColliding(hitbox1: IHitbox, hitbox2: IHitbox): boolean {
  return hitbox1.location.x < hitbox2.location.x + hitbox2.width &&
    hitbox1.location.x + hitbox1.width > hitbox2.location.x &&
    hitbox1.location.y < hitbox2.location.y + hitbox2.height &&
    hitbox1.location.y + hitbox1.height > hitbox2.location.y
}

class SpacialHash {
  private maxX: number
  private maxY: number
  private granularityX: number
  private granularityY: number
  private internalMap: DefaultMap<string, Array<ICollidable>>

  constructor(objects: Array<ICollidable>) {
    this.maxX = maxBy(objects, o => o.hitbox.location.x + o.hitbox.width)
    this.maxY = maxBy(objects, o => o.hitbox.location.y + o.hitbox.height)
    this.granularityX = this.maxX / objects.length
    this.granularityY = this.maxY / objects.length
    this.internalMap = new DefaultMap(() => [])
    this.putCollidablesInBuckets(objects)
  }

  private putCollidablesInBuckets(objects: Array<ICollidable>) {
    for(let object of objects) {
      for(let bucket of this.bucketsForCollidable(object)) {
        this.addToInternalMap(bucket, object)
      }
    }
  }

  private *bucketsForCollidable(object: ICollidable) {
    // TODO return all the buckets that the colliible could be in
  }

  private addToInternalMap(hash: string, object: ICollidable) {
    let bucket = this.internalMap.get(hash)
    bucket.push(object)
  }

  private hashForCoordinates(x: number, y: number) {
    return `${x}|${y}`
  }

}
