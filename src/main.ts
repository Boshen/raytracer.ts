import { Line } from './line'
import { Sphere } from './sphere'
import { Canvas } from './canvas'

import { Vector } from  './vector'

const width = 500;
const height = 500;

const light = new Vector(0, 1000, 0);
const eye = new Vector(0, 0, -200);

// u-v-w coordinate from the eye
const u = new Vector(1, 0, 0);
const v = new Vector(0, 1, 0);
const w = new Vector(0, 0, 1);

const spheres = [
  new Sphere(30, new Vector(0, 0, 0), 'black'),
  new Sphere(10, new Vector(0, 50, -10), 'black'),
  new Sphere(5, new Vector(60, 0, 20), 'black')
];

const canvas = new Canvas(width, height)

for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    // transformed pixel position
    const us = (i - width / 2.0) / width;
    const vs = -(j - height / 2.0) / height;
    // eye -> line direction vector
    const s = (u.scale(us)).add(v.scale(vs)).add(w).unit();
    const ray = new Line(eye, s);
    const color = trace(ray);
    canvas.draw(i, j, color);
  }
}

function trace(ray: Line): string {
  let minD = Infinity;
  let color = 'white';
  let intersectionObject;
  // trace ray from eye to objects
  spheres.forEach((sphere) => {
    const d = sphere.intersection(ray);
    if (d < minD) {
      minD = d;
      color = sphere.color;
      intersectionObject = sphere;
    }
  });

  const point = ray.getPoint(minD);

  if (intersectionObject) {
    // trace ray from intersection point to light source
    // add a offset so shadow ray will not intersect with the origin object itself
    const shadowDirection = light.sub(point).unit();
    const shadowRay = new Line(point.add(shadowDirection.scale(0.001)), shadowDirection);
    minD = Infinity;
    spheres.forEach((sphere) => {
      const d = sphere.intersection(shadowRay);
      if (d < minD) {
        minD = d;
        color = 'black';
      }
    });
  }

  // the object is not in the shadow
  // compute facing ratio for the shadow
  if (intersectionObject && minD === Infinity) {
    const normal = intersectionObject.normal(point);
    const inverseRay = ray.line.scale(-1);
    const ratio = Math.round(normal.dot(inverseRay) * 10);
    color = `rgb(${ratio},${ratio},${ratio})`;
  }

  return color
}
