import { Point } from './point'
import { Line } from './line'
import { Sphere } from './sphere'
import { Canvas } from './canvas'

import { Vector } from  './vector'

const width = 500;
const height = 500;
const depth = 0;

// canvas box
const left = -width / 2;
const right = width / 2;
const bottom = -height / 2;
const top = height / 2;

// const light = new Point(1000, 1000, 0);
const eye = new Vector(0, 0, -100);

// u-v-w coordinate from the eye
const u = new Vector(1, 0, 0);
const v = new Vector(0, 1, 0);
const w = new Vector(0, 0, 1);

const spheres = [
  new Sphere(20, new Point(0, 10, -50), 'red'),
  new Sphere(20, new Point(20, 10, 5), 'green'),
  new Sphere(10, new Point(20, 0, 20), 'blue')
];

const canvas = new Canvas(width, height)

for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    // transformed pixel position
    const us = left + (right - left) * ((i + 0.5) / width);
    const vs = bottom + (top - bottom) * ((j + 0.5) / height);
    const ws = depth;
    // point s on the screen
    const s = eye.add(u.scale(us)).add(v.scale(vs)).add(w.scale(ws)).unit();
    const ray = new Line(eye, s);
    const color = trace(ray);
    canvas.draw(i, j, color);
  }
}

function trace(ray: Line): string {
  let minD = Infinity;
  let color = 'white';
  spheres.forEach((sphere) => {
    const d = sphere.intersection(ray);
    if (d < minD) {
      minD = d;
      color = sphere.color;
    }
  });
  return color
}
