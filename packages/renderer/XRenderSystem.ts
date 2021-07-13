import { XNode, XComponent } from '@xengine/scene'
import { XRenderingContext } from './XRenderingContext'
import { XBitmapComponent } from './XBitmapComponent'

export class XRenderSystem {
  context: XRenderingContext
  constructor(public canvas: HTMLCanvasElement | OffscreenCanvas) {
    this.context = new XRenderingContext(canvas.getContext('webgl')!)
  }

  createTexture(source: TexImageSource): WebGLTexture {
    return this.context.createTexture(source)
  }

  render(root: XComponent): void {
    if (root.active) {
      if (root instanceof XNode) {
        for (const node of root.children) {
          this.render(node)
        }
      } else if (root instanceof XBitmapComponent) {
        if (root.source) {
          if (!root.texture) {
            root.texture = this.context.createTexture(root.source)
          }
          this.context.render(root.texture)
        }
      }
    }
  }
}
