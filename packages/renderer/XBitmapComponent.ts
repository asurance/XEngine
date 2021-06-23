import { XComponent } from '../scene/XComponent'

export class XBitmapComponent extends XComponent {
  visible = true
  texture: WebGLTexture | null = null
}
