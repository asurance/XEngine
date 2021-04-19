import { createProgram } from './util'

export class XShader {
  private program: WebGLProgram | null = null
  constructor(readonly vertexSource: string, readonly fragmentSource: string) {}
  get Program(): WebGLProgram {
    return this.program!
  }
  compile(gl: WebGLRenderingContext): void {
    this.program = createProgram(gl, this.vertexSource, this.fragmentSource)
  }
  dispose(gl: WebGLRenderingContext): void {
    gl.deleteProgram(this.program)
  }
}
