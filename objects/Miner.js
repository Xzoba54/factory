const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

export default class Miner {
  constructor(name, x, y, size, direction, resource) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.size = size;
    this.direction = direction;
    this.count = 0;
    this.capacity = 100;
    this.output = null;
    this.resource = resource;
    this.image = new Image();
    this.setImage();
    this.mine();
  }
  setImage() {
    this.image.src = `../textures/${this.name}${this.direction.charAt(0).toUpperCase() + this.direction.slice(1, this.direction.length)}.png`;
  }
  draw() {
    ctx.drawImage(this.image, this.x * this.size, this.y * this.size);

    ctx.fillStyle = "orange";
    ctx.font = "30px Arial";
    ctx.fillText(this.count, this.x * this.size, this.y * this.size + 22);
  }
  isFull() {
    if (this.count < this.capacity) return false;
    else return true;
  }
  async mine() {
    const delay = (t) => new Promise((res) => setTimeout(res, t * 1000));

    if (!this.isFull()) {
      console.log(this);
      this.count++;
    }

    await delay(0.05);

    requestAnimationFrame(this.mine.bind(this));
  }
}
