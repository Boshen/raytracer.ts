import { Line } from './line'
import { Sphere } from './sphere'
import { Light } from './light'
import { Canvas } from './canvas'

import { Vector } from  './vector'

const width = 500
const height = 500

const light = new Light(new Vector(0, 1000, 0), 1000)
const eye = new Vector(0, 0, -200)

// u-v-w coordinate from the eye
const u = new Vector(1, 0, 0)
const v = new Vector(0, 1, 0)
const w = new Vector(0, 0, 1)

const spheres = [
  new Sphere(30, new Vector(0, 0, 0), new Vector(255, 0, 0)),
  new Sphere(10, new Vector(0, 50, -10), new Vector(0, 255, 0)),
  new Sphere(5, new Vector(60, 0, 20), new Vector(0, 0, 255))
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
    const color = trace(ray)
    canvas.draw(i, j, color)
  }
}

function trace(ray: Line): Vector {
  let minD = Infinity
  let color = new Vector(255, 255, 255)
  let intersectionObject
  // trace ray from eye to objects
  spheres.forEach((sphere) => {
    const d = sphere.intersection(ray)
    if (d < minD) {
      minD = d
      color = sphere.color
      intersectionObject = sphere
    }
  })

  const point = ray.getPoint(minD)

  // compute shadow
  if (intersectionObject) {
    // trace ray from intersection point to light source
    // add a offset so shadow ray will not intersect with the origin object itself
    const shadowDirection = light.source.sub(point).unit()
    const shadowRay = new Line(point.add(shadowDirection.scale(0.001)), shadowDirection)
    minD = Infinity
    spheres.forEach((sphere) => {
      const d = sphere.intersection(shadowRay)
      if (d < minD) {
        minD = d
        color = new Vector(0, 0, 0)
      }
    })
  }

  // the object is not in the shadow
  // compute diffuse shading
  if (intersectionObject && minD === Infinity) {
    const normal = intersectionObject.normal(point).unit()
    const l = light.source.sub(point).unit()
    const factor = Math.max(0, normal.dot(l))
    color = intersectionObject.color
      .scale(factor * intersectionObject.diffuse)
      .add(intersectionObject.color.scale(intersectionObject.ambient))
  }

  return color
}
