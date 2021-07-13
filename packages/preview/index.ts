import { XRenderSystem } from '@xengine/renderer'
import sword from './sword.png'
import { XNode } from '@xengine/scene'
import { XBitmapComponent } from '@xengine/renderer'

const canvas = document.createElement('canvas')
canvas.width = window.innerWidth / 2
canvas.height = window.innerHeight / 2
document.body.appendChild(canvas)

const renderSys = new XRenderSystem(canvas)
const source = new Image()
source.src = sword
source.onload = () => {
  const root = new XNode()
  const bitmap = new XBitmapComponent()
  bitmap.source = source
  root.children = [bitmap]
  renderSys.render(root)
}
