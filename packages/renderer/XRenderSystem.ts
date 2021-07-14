import { XNode, XComponent } from '@xengine/scene'
import { XMatrix2x3 } from '@xengine/math'
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

  render(
    root: XComponent,
    matrix = new XMatrix2x3(
      1 / this.canvas.width,
      0,
      0,
      1 / this.canvas.height,
      0,
      0,
    ),
  ): void {
    if (root.active) {
      if (root instanceof XNode) {
        for (const node of root.children) {
          this.render(node, matrix)
        }
      } else if (root instanceof XBitmapComponent) {
        if (root.source) {
          if (!root.texture) {
            root.texture = this.context.createTexture(root.source)
          }
          this.context.render(
            root.texture,
            matrix.multiplyWithMatrix2x3(
              new XMatrix2x3(root.source.width, 0, 0, root.source.height, 0, 0),
            ),
          )
        }
      }
    }
  }
}
