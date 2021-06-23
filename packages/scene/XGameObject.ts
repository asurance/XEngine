import { XComponent } from './XComponent'

export abstract class XGameObject {
  abstract build(): XGameObject | XComponent | null
}
