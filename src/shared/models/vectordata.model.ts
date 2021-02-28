import {IVector} from "../interfaces/ivector.interface"

export class VectorData implements IVector {
  constructor(
    public x: number = 5,
    public y: number = 5,
    public z: number = 5
  ) {}
}