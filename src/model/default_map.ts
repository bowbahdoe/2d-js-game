/**
 * With the same interface as a Map, but with a default value provided
 */

export default class DefaultMap<K,V> extends Map<K,V> {
  private default_ : (key: K) => V
  constructor(default_ : (key: K) => V, iterable = []) {
    super(iterable)
    if(default_) {
      this.default_ = default_
    }
  }

  get(key: K): V {
    let ret = super.get(key)
    if(ret === undefined) {
      ret = this.default_(key)
      this.set(key, ret)
    }
    return ret
  }
}
