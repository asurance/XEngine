import { XRenderSystem } from '@xengine/renderer'
import { Build } from '@xengine/scene'
import { App } from './App'
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
  const root = Build(new App(texture))
  renderSys.render(root)
}
