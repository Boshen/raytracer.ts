import { Vector } from './vector'

export class Light {

  constructor(
    public source: Vector,
    public illumination: number
  ) { }

}
