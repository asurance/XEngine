import { XRenderingContext } from './XRenderingContext'
import { RecursionList } from '../scene'
import { XComponent } from '../scene/XComponent'
import { XBitmapComponent } from './XBitmapComponent'

export class XRenderSystem {
  width: number
  height: number
  context: XRenderingContext
  constructor(gl: WebGLRenderingContext) {
    this.context = new XRenderingContext(gl)
    this.width = gl.canvas.width
    this.height = gl.canvas.height
  }

  createTexture(source: TexImageSource): WebGLTexture {
    return this.context.createTexture(source)
  }

  render(root: RecursionList<XComponent>): void {
    if (!root) return
    if (root instanceof Array) {
      for (const node of root) {
        this.render(node)
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
