import { XBitmapComponent } from '../renderer/XBitmapComponent'
import { XGameObject } from '../scene/XGameObject'
import { XNode } from '../scene/XNode'

export class App extends XGameObject {
  constructor(private texture: WebGLTexture) {
    super()
  }
  build(): XNode {
    const bitmap = new XBitmapComponent()
    const node = new XNode()
    node.x = 10
    node.children = [bitmap]
    bitmap.texture = this.texture
    return node
  }
}
