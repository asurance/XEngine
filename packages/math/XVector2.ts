import { IOArrayLike } from './type'

export class XVector2 {
  static get origin(): XVector2 {
    return new XVector2()
  }

  constructor(public x = 0, public y = 0) {}

  reset(): this {
    this.x = this.y = 0
    return this
  }

  set(x = this.x, y = this.y): this {
    this.x = x
    this.y = y
    return this
  }

  clone(out = new XVector2()): XVector2 {
    out.x = this.x
    out.y = this.y
    return out
  }

  toString(bit?: number): string {
    return `(x:${this.x.toFixed(bit)},y:${this.y.toFixed(bit)})`
  }

  equal(other: XVector2): boolean {
    return this.x === other.x && this.y === other.y
  }

  copyToArray(array: IOArrayLike<number>, index = 0): this {
    array[index] = this.x
    array[index + 1] = this.y
    return this
  }

  copyFromArray(array: IOArrayLike<number>, index = 0): this {
    this.x = array[index]
    this.y = array[index + 1]
    return this
  }

  add(other: XVector2, out = new XVector2()): XVector2 {
    out.x = this.x + other.x
    out.y = this.y + other.y
    return out
  }

  addToSelf(other: XVector2): this {
    this.add(other, this)
    return this
  }

  substract(other: XVector2, out = new XVector2()): XVector2 {
    out.x = this.x - other.x
    out.y = this.y - other.y
    return out
  }

  substractToSelf(other: XVector2): this {
    this.substract(other, this)
    return this
  }

  multiply(other: XVector2, out = new XVector2()): XVector2 {
    out.x = this.x * other.x
    out.y = this.y * other.y
    return out
  }

  multiplyToSelf(other: XVector2): this {
    this.multiply(other, this)
    return this
  }

  scale(scale: number, out = new XVector2()): XVector2 {
    out.x = this.x * scale
    out.y = this.y * scale
    return out
  }

  scaleToSelf(scale: number): this {
    this.scale(scale, this)
    return this
  }

  divide(other: XVector2, out = new XVector2()): XVector2 {
    out.x = this.x / other.x
    out.y = this.y / other.y
    return out
  }

  divideToSelf(other: XVector2): this {
    this.divide(other, this)
    return this
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  squaredLength(): number {
    return this.x * this.x + this.y * this.y
  }

  normalize(out = new XVector2()): XVector2 {
    const square = this.squaredLength()
    if (square > 0) {
      out.scaleToSelf(1 / Math.sqrt(square))
    } else {
      out.set(0, 0)
    }
    return out
  }

  normalizeToSelf(): this {
    this.normalize(this)
    return this
  }

  dot(other: XVector2): number {
    return this.x * other.x + this.y * other.y
  }

  cross(other: XVector2): number {
    return this.x * other.y - this.y * other.x
  }
}
