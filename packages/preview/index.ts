import { XRenderingContext } from '@xengine/renderer'
import sword from './sword.png'

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth / 2
canvas.height = window.innerHeight / 2
document.body.appendChild(canvas)

const gl = canvas.getContext('webgl')!
const ctx = new XRenderingContext(gl)
const source = new Image()
source.src = sword
source.onload = () => {
  const texture = ctx.createTexture(source)
  ctx.render(texture)
}
