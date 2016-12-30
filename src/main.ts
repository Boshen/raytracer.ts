import * as canvas from './canvas'

type Vector = [number, number, number];
type Point = [number, number, number];

class Line {
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

class Sphere {
  radius: number
  center: Point
  constructor(r: number, center: Point) {
    this.radius = r;
    this.center = center;
  }
  public intersection(line: Line): boolean {
    const a = dotV(line.vector, line.vector);
    const b = dotV(line.vector, sub(line.point, this.center));
    const c = lengthV(sub(line.point, this.center))**2 - this.radius**2;
    const discriminant = b**2 - a * c;
    return discriminant >= 0
  }
}

function lengthV(v: Vector): number {
  return Math.sqrt(dotV(v, v))
}

function dotV(v1: Vector, v2: Vector) {
  return v1[0] * v2[0] +
         v1[1] * v2[1] +
         v1[2] * v2[2];
}

function add(a: Vector | Point, b: Vector | Point): Vector | Point {
  return [
    a[0] + b[0],
    a[1] + b[1],
    a[2] + b[2]
  ]
}

function sub(a: Vector | Point, b: Vector | Point): Vector | Point {
  return [
    a[0] - b[0],
    a[1] - b[1],
    a[2] - b[2]
  ]
}

function mul(p: number, v: Vector): Vector {
  return [
    p * v[0],
    p * v[1],
    p * v[2]
  ]
}

function cross(v1: Vector, v2: Vector): Vector {
  return [
    (v1[1] * v2[2]) - (v1[2] * v2[1]),
    (v1[2] * v2[0]) - (v1[0] * v2[2]),
    (v1[0] * v2[1]) - (v1[1] * v2[0])
  ]
}

function unitV(v: Vector) {
  return mul(1 / lengthV(v), v)
}

const width = 10;
const height = 10;
const pixsize = 0.1;

const focal: Point = [0, 0, -10];
const dir: Vector = [0, 0, 10];
const horz: Vector = [1, 0, 0];
const vert: Vector = [0, 1, 0];

const vpNormal = unitV(sub(dir, focal));
const vpRight = unitV(cross(vpNormal, vert));
const vpUp = unitV(cross(vpRight, vpNormal));

const radius = 3;
const center: Point = [0, 0, 5];
const sphere = new Sphere(radius, center);

const grid = [];

for (let i = 0; i < width; i++) {
  grid.push([]);
  for (let j = 0; j < height; j++) {
    const x = (i - width / 2) * pixsize;
    const y = (j - height / 2) * pixsize;
    const xv = mul(x, vpRight);
    const yv = mul(y, vpUp);
    const line = unitV(add(add(vpNormal, xv), yv));
    const ray = new Line(focal, line);
    const intersect = sphere.intersection(ray);
    grid[i].push(intersect);
  }
}

canvas.draw(grid);
