import { Vector } from './vector'

export class Line {

  constructor(
    public origin: Vector,
    public line: Vector
  ) { }

  public getPoint(distance: number): Vector {
    return this.origin.add(this.line.scale(distance))
  }

  public toString() {
    return `origin: ${this.origin}, line: ${this.line}`
  }

}
