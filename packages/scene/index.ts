import { XComponent } from './XComponent'
import { XGameObject } from './XGameObject'
import { XGroup } from './XGroup'

export type DepArr<T> = T | Array<DepArr<T>>

export function Render(
  root: XGameObject | XComponent | null,
): DepArr<XComponent> | null {
  if (root instanceof XGameObject) {
    return Render(root.build())
  } else if (root instanceof XGroup) {
    return root.children.map((child) => Render(child)).filter(Boolean)
  } else {
    return root
  }
}
