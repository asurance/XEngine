import { XRenderSystem } from '../renderer/XRenderSystem'
import { Render } from '../scene'
import { App } from './app'
import sword from './sword.png'

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth / 2
canvas.height = window.innerHeight / 2
document.body.appendChild(canvas)

const gl = canvas.getContext('webgl')!
const renderSys = new XRenderSystem(gl)
const source = new Image()
source.src = sword
source.onload = () => {
  const texture = renderSys.createTexture(source)
  const result = Render(new App(texture))
  renderSys.active(result)
}
