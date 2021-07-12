import { XComponent } from '../scene/XComponent'

export class XBitmapComponent extends XComponent {
  visible = true
  texture: WebGLTexture | null = null
  width = 100
  height = 100
}
