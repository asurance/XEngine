declare module '*.vert' {
  const context: string
  export default context
}

declare module '*.frag' {
  const context: string
  export default context
}

declare module '*.glsl' {
  const context: string
  export default context
}

declare module '*.png' {
  const context: string
  export default context
}

declare module '*.jpg' {
  const context: string
  export default context
}

declare const MODE: 'debug' | 'release'
