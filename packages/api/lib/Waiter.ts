export class Waiter {
  block: boolean = false;
  to!: NodeJS.Timer;

  constructor(
    private time: number,
    private cb: () => void,
    start: boolean = false
  ) {
    if (start) this.delay();
  }

  delay() {
    if (!this.block) {
      clearTimeout(this.to);

      this.to = setTimeout(() => {
        this.block = true;
        this.cb();
      }, this.time);
    }

    return this.block;
  }
}
