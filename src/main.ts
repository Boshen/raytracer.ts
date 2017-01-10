import { Line } from './line'
import { Sphere } from './sphere'
import { Light } from './light'
import { Canvas } from './canvas'

import { Vector } from  './vector'

const width = 500
const height = 500

const eye = new Vector(0, 0, -150)

const lights = [
  new Light(new Vector(0, 1000, 0), 1000),
  new Light(new Vector(1000, 0, 0), 1000)
]
const background = new Vector(0, 0, 0)

// u-v-w coordinate from the eye
const u = new Vector(1, 0, 0)
const v = new Vector(0, 1, 0)
const w = new Vector(0, 0, 1)

const spheres = [
  new Sphere(30, new Vector(0, 0, 0), new Vector(255, 0, 0)),
  new Sphere(10, new Vector(0, 50, -10), new Vector(0, 255, 0)),
  new Sphere(5, new Vector(60, 0, -10), new Vector(0, 0, 255))
]

const canvas = new Canvas(width, height)

for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    // transformed pixel position
    const us = (i - width / 2.0) / width
    const vs = -(j - height / 2.0) / height
    // eye -> line direction vector
    const s = (u.scale(us)).add(v.scale(vs)).add(w).unit()
    const ray = new Line(eye, s)
    const color = trace(ray, 0) || background
    canvas.draw(i, j, color)
  }
}

function trace(ray: Line, depth: number, object?: Sphere): Vector | null {
  if (depth > 3) {
    return new Vector(0, 0, 0)
  }

  // trace ray from eye to objects
  let minD = Infinity
  spheres.forEach((sphere) => {
    const d = sphere.intersection(ray)
    if (d < minD) {
      minD = d
      object = sphere
    }
  })

  // no object has been found
  if (minD === Infinity) {
    return null
  }

  const point = ray.getPoint(minD)
  return hit(ray, point, object!, depth)
}

function hit(ray: Line, point: Vector, object: Sphere, depth: number): Vector {
  const normal = object.normal(point).unit()

  let lambert = 0
  for (let light of lights) {
    // compute shadow
    // trace ray from intersection point to light source
    // add an offset so shadow ray will not intersect with the origin object itself
    let minD = Infinity
    const shadowDirection = light.source.sub(point).unit()
    const shadowRay = new Line(point.add(shadowDirection.scale(0.001)), shadowDirection)
    for (let sphere of spheres) {
      const d = sphere.intersection(shadowRay)
      if (d < minD) {
        minD = d
        break
      }
    }
    if (minD !== Infinity) {
      continue
    }

    // compute lambertian shading
    const l = light.source.sub(point).unit()
    lambert += Math.max(0, normal.dot(l))
  }

  // compute specular shading
  const r = ray.line.sub(normal.scale(2).scale(normal.dot(ray.line)))
  const color = trace(new Line(point.add(r.scale(0.001)), r), depth + 1)
  const c = color ? color.scale(object.specular) : new Vector(0, 0, 0)

  return c
    .add(object.color.scale(Math.min(1, lambert) * object.lambert))
    .add(object.color.scale(object.ambient))
}
