import { XVector2 } from './XVector2'
import { IOArrayLike } from './type'

export class XMatrix2x3 {

  static Identity(): XMatrix2x3 {
    return new XMatrix2x3()
  }

  constructor(public a = 1, public b = 0, public c = 0,
    public d = 1, public e = 0, public f = 0) { }

  reset(): this {
    this.a = this.d = 1
    this.b = this.c = this.e = this.f = 0
    return this
  }

  set(a: number, b: number, c: number,
    d: number, e: number, f: number): this {
    this.a = a
    this.b = b
    this.c = c
    this.d = d
    this.e = e
    this.f = f
    return this
  }

  clone(out = new XMatrix2x3()): XMatrix2x3 {
    out.a = this.a
    out.b = this.b
    out.c = this.c
    out.d = this.d
    out.e = this.e
    out.f = this.f
    return out
  }

  toString(bit?: number): string {
    return `\
|${this.a.toFixed(bit)},${this.b.toFixed(bit)},${this.c.toFixed(bit)}|\
|${this.d.toFixed(bit)},${this.e.toFixed(bit)},${this.f.toFixed(bit)}|\
|${0..toFixed(bit)},${0..toFixed(bit)},${1..toFixed(bit)}|\
`  }

  equal(other: XMatrix2x3): boolean {
    return this.a === other.a && this.b === other.b
      && this.c === other.c && this.d === other.d
      && this.e === other.e && this.f === other.f
  }

  copyToArray(array: IOArrayLike<number>, index = 0): this {
    array[index] = this.a
    array[index + 1] = this.b
    array[index + 2] = this.c
    array[index + 3] = this.d
    array[index + 4] = this.e
    array[index + 5] = this.f
    return this
  }

  copyFromArray(array: IOArrayLike<number>, index = 0): this {
    this.a = array[index]
    this.b = array[index + 1]
    this.c = array[index + 2]
    this.d = array[index + 3]
    this.e = array[index + 4]
    this.f = array[index + 5]
    return this
  }

  copyToArrayAs3x3(array: IOArrayLike<number>, index = 0): this {
    array[index] = this.a
    array[index + 1] = this.b
    array[index + 2] = 0
    array[index + 3] = this.c
    array[index + 4] = this.d
    array[index + 5] = 0
    array[index + 6] = this.e
    array[index + 7] = this.f
    array[index + 8] = 1
    return this
  }

  copyFromArrayAs3x3(array: IOArrayLike<number>, index = 0): this {
    this.a = array[index]
    this.b = array[index + 1]
    this.c = array[index + 3]
    this.d = array[index + 4]
    this.e = array[index + 6]
    this.f = array[index + 7]
    return this
  }

  multiplyWithMatrix2x3(other: XMatrix2x3, out = new XMatrix2x3()): XMatrix2x3 {
    const a = this.a * other.a + this.c * other.b
    const b = this.b * other.a + this.d * other.b
    const c = this.a * other.c + this.c * other.d
    const d = this.b * other.c + this.d * other.d
    const e = this.a * other.e + this.c * other.f + this.e
    const f = this.b * other.e + this.d * other.f + this.f
    out.a = a
    out.b = b
    out.c = c
    out.d = d
    out.e = e
    out.f = f
    return out
  }

  multiplyToSelf(other: XMatrix2x3): this {
    this.multiplyWithMatrix2x3(other, this)
    return this
  }

  multiplyWithVector2(other: XVector2, z = 1, out = new XVector2()): XVector2 {
    const x = this.a * other.x + this.c * other.y + this.e * z
    const y = this.b * other.x + this.d * other.y + this.f * z
    out.x = x
    out.y = y
    return out
  }

  multiplyToVector2(other: XVector2, z = 1): XVector2 {
    return this.multiplyWithVector2(other, z, other)
  }

  multiplyWithVector2Array(other: Float32List, out: Float32List, z = 1, start = 0, length = other.length - start, outstart = 0): this {
    for (let i = 0; i < length; i += 2) {
      const x = this.a * other[start + i] + this.c * other[start + i + 1] + this.e * z
      const y = this.b * other[start + i] + this.d * other[start + i + 1] + this.f * z
      out[outstart + i] = x
      out[outstart + i + 1] = y
    }
    return this
  }

  transpose(out = new XMatrix2x3()): XMatrix2x3 {
    out.a = this.a
    out.d = this.d
    out.e = out.f = 0
    const b = out.d
    out.d = this.b
    out.b = b
    return out
  }

  transposeToSelf(): this {
    this.transpose(this)
    return this
  }

  determinant(): number {
    return this.a * this.d - this.b * this.c
  }

  invert(out: XMatrix2x3): boolean {
    const determinant = this.determinant()
    if (determinant === 0) {
      return false
    } else {
      const a = this.d / determinant
      const b = - this.b / determinant
      const c = -this.c / determinant
      const d = this.a / determinant
      const e = (this.c * this.f - this.d * this.e) / determinant
      const f = (this.b * this.e - this.a * this.f) / determinant
      out.a = a
      out.b = b
      out.c = c
      out.d = d
      out.e = e
      out.f = f
      return true
    }
  }

  invertToSelf(): boolean {
    return this.invert(this)
  }
}