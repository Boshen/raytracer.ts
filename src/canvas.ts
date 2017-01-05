import { Vector } from './vector'

let isNode = false
try {
 isNode = Object.prototype.toString.call(global.process) === '[object process]'
} catch(e) {}

export class Canvas {

  private canvas: HTMLCanvasElement
  private ctx

  public draw: Function

  constructor(public width: number, public height: number) {
    if (isNode) {
      this.draw = this.drawConsole.bind(this)
    } else {
      this.canvas = <HTMLCanvasElement> document.createElement('canvas')
      this.ctx = this.canvas.getContext('2d')
      this.canvas.width  = width
      this.canvas.height = height
      document.body.appendChild(this.canvas)
      this.draw = this.drawCanvas.bind(this)
    }
  }

  public drawCanvas(x: number, y: number, color: Vector) {
    this.ctx.fillStyle = `rgb(${color.x}, ${color.y}, ${color.z})`
    this.ctx.fillRect(x, y, 1, 1)
  }

  public drawConsole(_: number, y: number, color: Vector) {
    const s = color.x + color.y + color.z === 255 * 3 ?  ' ' : '*'
    process.stdout.write(s)
    if (y  === this.width - 1) {
      process.stdout.write('\n')
    }
  }

}
