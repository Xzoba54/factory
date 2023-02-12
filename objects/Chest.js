const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export default class Chest {
  constructor(name, x, y, size, direction) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
    this.count = 0;
    this.capacity = 100;
    this.output = null;
    this.slots = [
      {
        type: null,
        count: 0,
      },
      {
        type: null,
        count: 0,
      },
      {
        type: null,
        count: 0,
      },
      {
        type: null,
        count: 0,
      },
      {
        type: null,
        count: 0,
      },
      {
        type: null,
        count: 0,
      },
      {
        type: null,
        count: 0,
      },
      {
        type: null,
        count: 0,
      },
      {
        type: null,
        count: 0,
      },
    ];
    this.image = new Image();
    this.setImage();
    this.start();
  }
  setImage() {
    this.image.src = "../textures/chest.png";
  }
  draw() {
    ctx.drawImage(this.image, this.x * this.size, this.y * this.size);

    ctx.fillStyle = "orange";
    ctx.font = "30px Arial";
    ctx.fillText(this.count, this.x * this.size, this.y * this.size + 22);
  }
  async start() {
    if (this.output) {
      const delay = (t) => new Promise((res) => setTimeout(res, t * 1000));
      await delay(0.05);

      if (this.output.count > 0) {
        for (let i = 0; i < this.slots.length; i++) {
          if (this.slots[i].count < this.capacity) {
            this.slots[i].count++;
            this.output.count--;
            break;
          }
        }
      }
    }

    requestAnimationFrame(this.start.bind(this));
  }
  isFull() {
    // if (this.count < this.capacity) return false;
    // else return true;
  }
  addOutput(output) {
    this.output = output;
  }
}
