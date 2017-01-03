import { Point } from './point'
import { Line } from './line'

export class Sphere {

  constructor(
    public radius: number,
    public center: Point,
    public color: string
  ) { }

  public intersection(line: Line): number {
    // (-b +- sqrt(b^2 - a*c)) / a
    const a = line.vector.dot(line.vector);
    const b = line.vector.dot(line.point.sub(this.center));
    const c = line.point.sub(this.center).length()**2 - this.radius**2;
    const d = b**2 - a * c; // discriminant

    if (d < 0) {
      return Infinity
    } else {
      const sqrtD = Math.sqrt(d);
      const root1 = -b + sqrtD;
      const root2 = -b - sqrtD;
      return Math.min(root1, root2)
    }
  }

}
