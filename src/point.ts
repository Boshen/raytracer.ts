import { Vector } from './vector'

export class Point {

  public x: number
  public y: number
  public z: number

  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public sub(p: Point): Vector {
    return new Vector(
      this.x - p.x,
      this.y - p.y,
      this.z - p.z
    )
  }

}
