const canvas = <HTMLCanvasElement> document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

export function draw(grid: boolean[][]) {
  grid.forEach((row, i) => {
    row.forEach((draw, j) => {
      const fillStyle = draw ? 'black' : 'white';
      ctx.fillStyle = fillStyle;
      ctx.fillRect(i, j, 1, 1);
    });
  });

}
