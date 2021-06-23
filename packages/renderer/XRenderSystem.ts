import { XRenderingContext } from '.'
import { DepArr } from '../scene'
import { XComponent } from '../scene/XComponent'
import { XBitmapComponent } from './XBitmapComponent'

export class XRenderSystem {
  context: XRenderingContext
  constructor(gl: WebGLRenderingContext) {
    this.context = new XRenderingContext(gl)
  }

  createTexture(source: TexImageSource): WebGLTexture {
    return this.context.createTexture(source)
  }

  active(root: DepArr<XComponent> | null): void {
    if (!root) return
    if (root instanceof Array) {
      for (const node of root) {
        this.active(node)
      }
    } else {
      if (root instanceof XBitmapComponent) {
        if (root.visible && root.texture) {
          this.context.render(root.texture)
        }
      }
    }
  }
}
