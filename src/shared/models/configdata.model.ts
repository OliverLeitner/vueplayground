// models to work on
import { VectorData } from "./vectordata.model"
import { PerspectiveCameraData } from "./perspectivecameradata.model"

// interface to implement
import { IConfig } from "../interfaces/iconfig.interface"

export class ConfigData implements IConfig {
  constructor(
    public camPerspective: PerspectiveCameraData = new PerspectiveCameraData(5, 0.1, 300),
    public camPosition: VectorData = new VectorData(),
    public mainLightPosition: VectorData = new VectorData(10, 10, 10)
  ) {}
}