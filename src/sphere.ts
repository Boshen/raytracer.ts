import { Point } from './point'
import { Line } from './line'

export class Sphere {

  radius: number
  center: Point

  constructor(r: number, center: Point) {
    this.radius = r;
    this.center = center;
  }

  public intersection(line: Line): boolean {
    const a = line.vector.dot(line.vector);
    const b = line.vector.dot(line.point.sub(this.center));
    const c = line.point.sub(this.center).length()**2 - this.radius**2;
    const discriminant = b**2 - a * c;
    return discriminant >= 0
  }

}
