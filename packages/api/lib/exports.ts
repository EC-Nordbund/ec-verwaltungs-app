import decache from 'decache';
export class Waiter {
  block: boolean = false;
  to!: NodeJS.Timer;

  constructor(
    private time: number,
    private cb: () => void,
    start: boolean = false
  ) {
    if (start) this.trigger();
  }

  trigger() {
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

export function reRequire(modulename: string) {
  decache(modulename);
  return require(modulename);
}
