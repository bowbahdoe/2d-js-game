import { Vector2D } from './model'
import { maxBy } from 'lodash'

export interface IHitbox {
  width: number,
  height: number
  location: Vector2D
}

export interface ICollidable {
  hitbox: IHitbox
  onCollide(other: ICollidable)
}

class SpacialHash {
  private maxX: number
  private maxY: number
  private granularityX: number
  private granularityY: number
  private internalMap: Map<string, Array<ICollidable>>

  constructor(objects: Array<ICollidable>) {
    this.maxX = maxBy(objects, o => o.hitbox.location.x + o.hitbox.width)
    this.maxY = maxBy(objects, o => o.hitbox.location.y + o.hitbox.height)
    this.granularityX = this.maxX / objects.length
    this.granularityY = this.maxY / objects.length
    this.internalMap = new Map()
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
    if(bucket === undefined) {
      bucket = []
      this.internalMap.set(hash, bucket)
    }

    bucket.push(object)
  }

  private hashForCoordinates(x: number, y: number) {
    return `${x}|${y}`
  }

}
