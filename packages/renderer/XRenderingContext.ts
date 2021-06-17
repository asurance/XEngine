import { XTexture } from './XTexture'

export class XRenderingContext {
  constructor(private gl: WebGLRenderingContext) {}
  createTexture(source: TexImageSource): XTexture {
    return new XTexture()
  }
  disposeTexture(texture: XTexture): void {}
  preRender(): void {}
  render(texture: XTexture): void {}
  postRender(): void {}
}
