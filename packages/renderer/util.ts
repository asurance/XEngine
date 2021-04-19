export function createShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number,
): WebGLShader {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (MODE === 'debug') {
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(
        `COMPILE ERROR:\nsource: ${source}\nerror: ${gl.getShaderInfoLog(
          WebGLShader,
        )}`,
      )
    }
  }
  return shader
}

export function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string,
): WebGLProgram {
  const vertexShader = createShader(gl, vertexSource, gl.VERTEX_SHADER)
  const fragmentShader = createShader(gl, fragmentSource, gl.FRAGMENT_SHADER)
  const program = gl.createProgram()!
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (MODE === 'debug') {
    gl.validateProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(
        `LINK ERROR:\nvertex: ${vertexSource}\nfragment: ${fragmentSource}\nerror: ${gl.getProgramInfoLog(
          program,
        )}`,
      )
    }
  }
  return program
}
