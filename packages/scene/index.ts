import { XComponent } from './XComponent'
import { XGameObject } from './XGameObject'
import { XNode } from './XNode'

export type RecursionList<T> = null | T | Array<RecursionList<T>>

export function Build(
  root: XGameObject | XComponent | null,
): RecursionList<XComponent> {
  if (root instanceof XGameObject) {
    return Build(root.build())
  } else if (root instanceof XNode) {
    return root.children.map((child) => Build(child)).filter(Boolean)
  } else {
    return root
  }
}
