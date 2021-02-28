// basic three.js config interface
import { IPerspectiveCamera } from "./iperspectivecamera.interface"
import { IVector } from "./ivector.interface"

export interface IConfig {
  camPerspective: IPerspectiveCamera
  camPosition: IVector,
  mainLightPosition: IVector
}