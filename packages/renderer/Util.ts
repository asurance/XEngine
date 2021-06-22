import { WebglConstant } from './WebglConst'

function CreateShader(
  gl: WebGLRenderingContext,
  source: string,
  type: WebglConstant.VERTEX_SHADER | WebglConstant.FRAGMENT_SHADER,
): WebGLShader {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export function CreateProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram {
  const vertexShader = CreateShader(
    gl,
    vertexSource,
    WebglConstant.VERTEX_SHADER,
  )
  const fragmentShader = CreateShader(
    gl,
    fragmentSource,
    WebglConstant.FRAGMENT_SHADER,
  )
  const program = gl.createProgram()!
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  return program
}
