import { IPerspectiveCamera } from "../interfaces/iperspectivecamera.interface"

export class PerspectiveCameraData implements IPerspectiveCamera {
  constructor(
    public fov: number = 5,
    public aspect?: number,
    public near: number = 0.1,
    public far: number = 300
  ) {}
}