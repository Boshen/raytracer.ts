import { Point } from './point'
import { Line } from './line'
import { Sphere } from './sphere'
import { Canvas } from './canvas'

import { Vector } from  './vector'

const width = 500;
const height = 500;
const pixsize = 0.1;

const focal = new Vector(0, 0, -10);
const dir = new Vector(0, 0, 10);
const horz = new Vector(1, 0, 0);
const vert = new Vector(0, 1, 0);

const vpNormal = dir.sub(focal).unit();
const vpRight = vpNormal.cross(vert).unit();
const vpUp = vpRight.cross(vpNormal).unit();

const radius = 100;
const center = new Point(0, 0, 100);
const sphere = new Sphere(radius, center);

const canvas = new Canvas(width, height)

for (let i = 0; i < width; i++) {
  for (let j = 0; j < height; j++) {
    const x = (i - width / 2) * pixsize;
    const y = (j - height / 2) * pixsize;
    const xv = vpRight.scale(x);
    const yv = vpUp.scale(y);
    const line = vpNormal.add(xv).add(yv).unit();
    const ray = new Line(focal, line);
    const intersect = sphere.intersection(ray);
    canvas.draw(i, j, intersect ? 'black' : 'white');
  }
}
