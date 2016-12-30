import { Point } from './point'
import { Vector } from './vector'

export class Line {
  public point: Point
  public vector: Vector
  constructor(p: Point, v: Vector) {
    this.point = p;
    this.vector = v;
  }
  public toString() {
    return `point: ${this.point}, vector: ${this.vector}`
  }
}
