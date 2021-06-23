import { XBitmapComponent } from '../renderer/XBitmapComponent'
import { XGameObject } from '../scene/XGameObject'
import { XGroup } from '../scene/XGroup'

export class App extends XGameObject {
  constructor(private texture: WebGLTexture) {
    super()
  }
  build(): XGroup {
    const bitmap = new XBitmapComponent()
    bitmap.texture = this.texture
    return new XGroup([bitmap, null])
  }
}
