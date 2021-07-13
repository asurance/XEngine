import { XComponent } from '@xengine/scene'

export class XBitmapComponent extends XComponent {
  active = true
  source: HTMLImageElement | null = null
  texture: WebGLTexture | null = null
  width: number | null = null
  height: number | null = null
}
