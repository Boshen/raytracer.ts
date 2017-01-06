import { Vector } from './vector'
import { Line } from './line'

export class Sphere {

  constructor(
    public radius: number,
    public center: Vector,
    public color: Vector,
    public diffuse: number = 0.9,
    public ambient: number = 0.1
  ) { }

  public normal(p: Vector): Vector {
    return p.sub(this.center)
  }

  public intersection(ray: Line): number {
    // (-b +- sqrt(b^2 - a*c)) / a
    const originToCenter = ray.origin.sub(this.center)
    // const a = ray.line.dot(ray.line) === 1
    const b = ray.line.dot(originToCenter)
    const c = originToCenter.dot(originToCenter)
    const d = Math.pow(b, 2) - c + Math.pow(this.radius, 2) // discriminant

    if (d <= 0) {
      return Infinity
    } else {
      const sqrtD = Math.sqrt(d)
      const root1 = -b + sqrtD
      const root2 = -b - sqrtD
      return Math.min.apply(null, [root1, root2].filter((x) => x >= 0))
    }
  }

}
