import { XComponent } from './XComponent'
import { XGameObject } from './XGameObject'

export class XGroup extends XComponent {
  constructor(public children: (XGameObject | XComponent | null)[]) {
    super()
  }
}
