import defaultVert from './shader/default.vert'
import defaultFrag from './shader/default.frag'
import { CreateProgram } from './utils'
import { WebglConstant } from './WebglConst'

export class XRenderingContext {
  private defaultProgram: WebGLProgram
  private postionLocation: number
  private uvLocation: number
  constructor(private gl: WebGLRenderingContext) {
    this.defaultProgram = CreateProgram(gl, defaultVert, defaultFrag)
    gl.useProgram(this.defaultProgram)
    this.postionLocation = gl.getAttribLocation(this.defaultProgram, 'position')
    this.uvLocation = gl.getAttribLocation(this.defaultProgram, 'uv')
    const texLocation = gl.getUniformLocation(this.defaultProgram, 'tex')!
    gl.uniform1i(texLocation, 0)
  }
  createTexture(source: TexImageSource): WebGLTexture {
    const texture = this.gl.createTexture()!
    this.gl.bindTexture(WebglConstant.TEXTURE_2D, texture)
    this.gl.texImage2D(
      WebglConstant.TEXTURE_2D,
      0,
      WebglConstant.RGBA,
      WebglConstant.RGBA,
      WebglConstant.UNSIGNED_BYTE,
      source,
    )
    this.gl.texParameteri(
      WebglConstant.TEXTURE_2D,
      WebglConstant.TEXTURE_MIN_FILTER,
      WebglConstant.NEAREST,
    )
    this.gl.texParameteri(
      WebglConstant.TEXTURE_2D,
      WebglConstant.TEXTURE_MAG_FILTER,
      WebglConstant.LINEAR,
    )
    this.gl.texParameteri(
      WebglConstant.TEXTURE_2D,
      WebglConstant.TEXTURE_WRAP_S,
      WebglConstant.CLAMP_TO_EDGE,
    )
    this.gl.texParameteri(
      WebglConstant.TEXTURE_2D,
      WebglConstant.TEXTURE_WRAP_T,
      WebglConstant.CLAMP_TO_EDGE,
    )
    return texture
  }
  disposeTexture(texture: WebGLTexture): void {
    this.gl.deleteTexture(texture)
  }
  render(texture: WebGLTexture, position: Float32List, uv: Float32List): void {
    this.gl.bindTexture(WebglConstant.TEXTURE_2D, texture)
    this.gl.vertexAttrib2fv(this.postionLocation, position)
    this.gl.vertexAttrib2fv(this.uvLocation, uv)
    this.gl.drawArrays(WebglConstant.TRIANGLES, 0, 6)
  }
  dispose(): void {
    this.gl.deleteProgram(this.defaultProgram)
  }
}
