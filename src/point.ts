import { Vector } from './vector'

export class Point {

  constructor(
    public x: number,
    public y: number,
    public z: number
  ) { }

  public sub(p: Point): Vector {
    return new Vector(
      this.x - p.x,
      this.y - p.y,
      this.z - p.z
    )
  }

}
