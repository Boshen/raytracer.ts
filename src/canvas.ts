export class Canvas {

  private canvas: HTMLCanvasElement
  private ctx

  constructor(width: number, height: number) {
    this.canvas = <HTMLCanvasElement> document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width  = width;
    this.canvas.height = height;
    document.body.appendChild(this.canvas);
  }

  public draw(x: number, y: number, color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, 1, 1);
  }

}
