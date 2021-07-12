import { XComponent } from "./XComponent"

export class XNode extends XComponent {
  x = 0
  y = 0
  rotation = 0
  scaleX = 1
  scaleY = 1
  children: (XComponent | null)[] = []
}