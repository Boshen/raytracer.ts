export class Vector {

  constructor(
    public x: number,
    public y: number,
    public z: number
  ) { }

  public length(): number {
    return Math.sqrt(this.dot(this))
  }

  public dot(v: Vector) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  public add(v: Vector): Vector {
    return new Vector(
      this.x + v.x,
      this.y + v.y,
      this.z + v.z
    )
  }

  public translate(n: number): Vector {
    return new Vector(
      this.x + n,
      this.y + n,
      this.z + n
    )
  }

  public sub(v: Vector): Vector {
    return new Vector(
      this.x - v.x,
      this.y - v.y,
      this.z - v.z
    )
  }

  public scale(p: number): Vector {
    return new Vector(
      p * this.x,
      p * this.y,
      p * this.z
    )
  }

  public cross(v: Vector): Vector {
    return new Vector(
      (this.y * v.z) - (this.z * v.y),
      (this.z * v.x) - (this.x * v.z),
      (this.x * v.y) - (this.y * v.x)
    )
  }

  public unit() {
    return this.scale(1 / this.length())
  }

  public toString() {
    return `[${this.x}, ${this.y}, ${this.z}]`
  }

}

