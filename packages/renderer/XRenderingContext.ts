import defaultVert from './shader/default.vert'
import defaultFrag from './shader/default.frag'
import { CreateProgram } from './utils'
import { WebglConstant } from './WebglConst'

export class XRenderingContext {
  private defaultProgram: WebGLProgram
  constructor(private gl: WebGLRenderingContext) {
    this.defaultProgram = CreateProgram(gl, defaultVert, defaultFrag)
    gl.useProgram(this.defaultProgram)
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(WebglConstant.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(
      WebglConstant.ARRAY_BUFFER,
      Float32Array.from([
        -1, -1, 1, -1, -1, 1, 1, 1, -1, 1, 1, -1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0,
        1, 1,
      ]),
      WebglConstant.STATIC_DRAW,
    )
    const postionLocation = gl.getAttribLocation(
      this.defaultProgram,
      'position',
    )
    gl.enableVertexAttribArray(postionLocation)
    gl.vertexAttribPointer(postionLocation, 2, WebglConstant.FLOAT, false, 0, 0)
    const uvLocation = gl.getAttribLocation(this.defaultProgram, 'uv')
    gl.enableVertexAttribArray(uvLocation)
    gl.vertexAttribPointer(uvLocation, 2, WebglConstant.FLOAT, false, 0, 12 * 4)
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
  render(texture: WebGLTexture): void {
    this.gl.bindTexture(WebglConstant.TEXTURE_2D, texture)
    this.gl.drawArrays(WebglConstant.TRIANGLES, 0, 6)
  }
  dispose(): void {
    this.gl.deleteProgram(this.defaultProgram)
  }
}
